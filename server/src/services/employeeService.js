const mongoose = require("mongoose");

const userRepository = require("../repositories/userRepository");
const departmentRepository = require("../repositories/departmentRepository");
const ApiError = require("../utils/ApiError");
const { USER_ROLES, USER_ROLE_RANK } = require("../utils/constants");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const ADMIN_ROLE = "Admin";
const DEPARTMENT_HEAD_ROLE = "Department Head";

const parsePagination = ({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT }) => {
  const parsedPage = Math.max(Number.parseInt(page, 10) || DEFAULT_PAGE, 1);
  const parsedLimit = Math.min(Math.max(Number.parseInt(limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit
  };
};

const normalizeDepartmentName = (value) => value.trim().toLowerCase();
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const sanitizeEmployee = (user, headedDepartment = null) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department,
  isActive: user.isActive,
  headedDepartment: headedDepartment
    ? {
        id: headedDepartment._id,
        name: headedDepartment.name,
        isActive: headedDepartment.isActive
      }
    : null,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const buildEmployeeFilters = ({ search, role, department, isActive }) => {
  const filters = {};

  if (typeof isActive !== "undefined") {
    filters.isActive = isActive === true || isActive === "true";
  }

  if (role) {
    filters.role = role;
  }

  if (department && department.trim()) {
    filters.department = new RegExp(`^${escapeRegExp(department.trim())}$`, "i");
  }

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    filters.$or = [
      { name: searchRegex },
      { email: searchRegex }
    ];
  }

  return filters;
};

const getUserByIdOrThrow = async (userId, session) => {
  const user = await userRepository.findById({ userId, session });

  if (!user) {
    throw new ApiError(404, "Employee not found");
  }

  return user;
};

const getDepartmentByNameOrThrow = async (departmentName, session) => {
  const department = await departmentRepository.findOne({
    filter: { normalizedName: normalizeDepartmentName(departmentName) },
    session
  });

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  return department;
};

const ensureDepartmentActive = (department) => {
  if (!department.isActive) {
    throw new ApiError(400, "Inactive department cannot receive new employees");
  }
};

const ensureRoleExists = (role) => {
  if (!USER_ROLES.includes(role)) {
    throw new ApiError(400, "Invalid role provided");
  }
};

const ensurePromotionDirection = (currentRole, nextRole) => {
  if (USER_ROLE_RANK[nextRole] <= USER_ROLE_RANK[currentRole]) {
    throw new ApiError(400, `Cannot promote ${currentRole} to ${nextRole}`);
  }
};

const ensureDemotionDirection = (currentRole, nextRole) => {
  if (USER_ROLE_RANK[nextRole] >= USER_ROLE_RANK[currentRole]) {
    throw new ApiError(400, `Cannot demote ${currentRole} to ${nextRole}`);
  }
};

const ensureDepartmentHeadCanMove = (headedDepartment, nextDepartmentName) => {
  if (!headedDepartment) {
    return;
  }

  if (normalizeDepartmentName(headedDepartment.name) !== normalizeDepartmentName(nextDepartmentName)) {
    throw new ApiError(400, "Department Head must belong to the same department they lead");
  }
};

const getEmployeeById = async (userId) => {
  const user = await getUserByIdOrThrow(userId);
  const headedDepartment = await departmentRepository.findByHeadId({ userId });

  return sanitizeEmployee(user, headedDepartment);
};

const listEmployees = async (query) => {
  const { page, limit, skip } = parsePagination(query);
  const filters = buildEmployeeFilters(query);

  const [users, totalItems] = await Promise.all([
    userRepository.findDirectory({
      filter: filters,
      skip,
      limit,
      sort: { createdAt: -1 }
    }),
    userRepository.countDocuments(filters)
  ]);

  const headedDepartments = await Promise.all(
    users.map((user) => departmentRepository.findByHeadId({ userId: user._id }))
  );

  return {
    items: users.map((user, index) => sanitizeEmployee(user, headedDepartments[index])),
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit) || 1
    }
  };
};

const assignDepartment = async (userId, departmentName) => {
  const session = await mongoose.startSession();

  try {
    let updatedUserId;

    await session.withTransaction(async () => {
      const user = await getUserByIdOrThrow(userId, session);
      const targetDepartment = await getDepartmentByNameOrThrow(departmentName, session);
      const headedDepartment = await departmentRepository.findByHeadId({ userId, session });

      ensureDepartmentActive(targetDepartment);

      if (user.role === DEPARTMENT_HEAD_ROLE) {
        ensureDepartmentHeadCanMove(headedDepartment, targetDepartment.name);
      }

      user.department = targetDepartment.name;
      await userRepository.save(user, session);
      updatedUserId = user._id;
    });

    return getEmployeeById(updatedUserId);
  } finally {
    await session.endSession();
  }
};

const promoteEmployee = async (actor, userId, nextRole) => {
  if (actor.role !== ADMIN_ROLE) {
    throw new ApiError(403, "Only Admin can promote users");
  }

  ensureRoleExists(nextRole);

  const session = await mongoose.startSession();

  try {
    let updatedUserId;

    await session.withTransaction(async () => {
      const user = await getUserByIdOrThrow(userId, session);
      const headedDepartment = await departmentRepository.findByHeadId({ userId, session });

      ensurePromotionDirection(user.role, nextRole);

      if (nextRole === DEPARTMENT_HEAD_ROLE) {
        if (!user.department || !user.department.trim()) {
          throw new ApiError(400, "Assign a department before promoting a user to Department Head");
        }

        const department = await getDepartmentByNameOrThrow(user.department, session);
        ensureDepartmentActive(department);
        ensureDepartmentHeadCanMove(headedDepartment, department.name);
      }

      if (user.role === DEPARTMENT_HEAD_ROLE && nextRole !== DEPARTMENT_HEAD_ROLE && headedDepartment) {
        headedDepartment.head = null;
        await departmentRepository.save(headedDepartment, session);
      }

      user.role = nextRole;
      await userRepository.save(user, session);
      updatedUserId = user._id;
    });

    return getEmployeeById(updatedUserId);
  } finally {
    await session.endSession();
  }
};

const demoteEmployee = async (actor, userId, nextRole) => {
  if (actor.role !== ADMIN_ROLE) {
    throw new ApiError(403, "Only Admin can demote users");
  }

  ensureRoleExists(nextRole);

  const session = await mongoose.startSession();

  try {
    let updatedUserId;

    await session.withTransaction(async () => {
      const user = await getUserByIdOrThrow(userId, session);
      const headedDepartment = await departmentRepository.findByHeadId({ userId, session });

      ensureDemotionDirection(user.role, nextRole);

      if (nextRole === DEPARTMENT_HEAD_ROLE) {
        if (!user.department || !user.department.trim()) {
          throw new ApiError(400, "Assign a department before setting a user as Department Head");
        }

        const department = await getDepartmentByNameOrThrow(user.department, session);
        ensureDepartmentActive(department);
        ensureDepartmentHeadCanMove(headedDepartment, department.name);
      }

      if (user.role === DEPARTMENT_HEAD_ROLE && nextRole !== DEPARTMENT_HEAD_ROLE && headedDepartment) {
        headedDepartment.head = null;
        await departmentRepository.save(headedDepartment, session);
      }

      user.role = nextRole;
      await userRepository.save(user, session);
      updatedUserId = user._id;
    });

    return getEmployeeById(updatedUserId);
  } finally {
    await session.endSession();
  }
};

const activateEmployee = async (userId) => {
  const session = await mongoose.startSession();

  try {
    let updatedUserId;

    await session.withTransaction(async () => {
      const user = await getUserByIdOrThrow(userId, session);

      if (user.role === DEPARTMENT_HEAD_ROLE && user.department && user.department.trim()) {
        const department = await getDepartmentByNameOrThrow(user.department, session);
        ensureDepartmentActive(department);
      }

      user.isActive = true;
      await userRepository.save(user, session);
      updatedUserId = user._id;
    });

    return getEmployeeById(updatedUserId);
  } finally {
    await session.endSession();
  }
};

const deactivateEmployee = async (userId) => {
  const session = await mongoose.startSession();

  try {
    let updatedUserId;

    await session.withTransaction(async () => {
      const user = await getUserByIdOrThrow(userId, session);
      const headedDepartment = await departmentRepository.findByHeadId({ userId, session });

      user.isActive = false;

      if (headedDepartment) {
        headedDepartment.head = null;
        await departmentRepository.save(headedDepartment, session);
      }

      await userRepository.save(user, session);
      updatedUserId = user._id;
    });

    return getEmployeeById(updatedUserId);
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getEmployeeById,
  listEmployees,
  assignDepartment,
  promoteEmployee,
  demoteEmployee,
  activateEmployee,
  deactivateEmployee
};

