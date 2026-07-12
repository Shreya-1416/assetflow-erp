const mongoose = require("mongoose");

const Department = require("../models/Department");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const DEPARTMENT_HEAD_ROLE = "Department Head";
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const normalizeName = (value) => value.trim().toLowerCase();

const parsePagination = ({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT }) => {
  const parsedPage = Math.max(Number.parseInt(page, 10) || DEFAULT_PAGE, 1);
  const parsedLimit = Math.min(Math.max(Number.parseInt(limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: (parsedPage - 1) * parsedLimit
  };
};

const buildDepartmentFilters = ({ search, isActive }) => {
  const filters = {};

  if (typeof isActive !== "undefined") {
    filters.isActive = isActive === true || isActive === "true";
  }

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    filters.$or = [
      { name: searchRegex },
      { description: searchRegex }
    ];
  }

  return filters;
};

const mapHead = (head) => {
  if (!head || typeof head !== "object" || !head._id) {
    return null;
  }

  return {
    id: head._id,
    name: head.name,
    email: head.email,
    role: head.role,
    department: head.department,
    isActive: head.isActive
  };
};

const sanitizeDepartment = (department) => {
  if (!department) {
    return null;
  }

  return {
    id: department._id,
    name: department.name,
    description: department.description,
    head: mapHead(department.head),
    isActive: department.isActive,
    deactivatedAt: department.deactivatedAt,
    createdAt: department.createdAt,
    updatedAt: department.updatedAt
  };
};

const getDepartmentQuery = (departmentId) => {
  return Department.findById(departmentId).populate("head", "name email role department isActive");
};

const getDepartmentByIdOrThrow = async (departmentId, session) => {
  const query = getDepartmentQuery(departmentId);

  if (session) {
    query.session(session);
  }

  const department = await query;

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  return department;
};

const ensureDepartmentNameAvailable = async (name, excludeDepartmentId, session) => {
  const query = {
    normalizedName: normalizeName(name)
  };

  if (excludeDepartmentId) {
    query._id = { $ne: excludeDepartmentId };
  }

  const departmentQuery = Department.findOne(query);

  if (session) {
    departmentQuery.session(session);
  }

  const existingDepartment = await departmentQuery;

  if (existingDepartment) {
    throw new ApiError(409, "Department name already exists");
  }
};

const validateDepartmentHead = async (headId, departmentId, session) => {
  if (!headId) {
    return null;
  }

  const userQuery = User.findById(headId);
  if (session) {
    userQuery.session(session);
  }

  const user = await userQuery;

  if (!user) {
    throw new ApiError(404, "Department head user not found");
  }

  if (!user.isActive) {
    throw new ApiError(400, "Inactive users cannot be assigned as department heads");
  }

  if (user.role !== DEPARTMENT_HEAD_ROLE) {
    throw new ApiError(400, "Assigned user must have the Department Head role");
  }

  const conflictQuery = Department.findOne({
    head: headId,
    ...(departmentId ? { _id: { $ne: departmentId } } : {})
  });

  if (session) {
    conflictQuery.session(session);
  }

  const conflictingDepartment = await conflictQuery;

  if (conflictingDepartment) {
    throw new ApiError(409, "This user is already assigned as head of another department");
  }

  return user;
};

const syncHeadDepartment = async (userId, departmentName, session) => {
  if (!userId) {
    return;
  }

  await User.updateOne(
    { _id: userId },
    { $set: { department: departmentName } },
    { session }
  );
};

const renameDepartmentMembers = async (previousName, nextName, session) => {
  if (previousName === nextName) {
    return;
  }

  await User.updateMany(
    { department: previousName },
    { $set: { department: nextName } },
    { session }
  );
};

const createDepartment = async ({ name, description, headId }) => {
  const session = await mongoose.startSession();

  try {
    let departmentId;

    await session.withTransaction(async () => {
      await ensureDepartmentNameAvailable(name, null, session);

      const headUser = await validateDepartmentHead(headId, null, session);

      const createdDepartments = await Department.create(
        [
          {
            name,
            description,
            head: headUser ? headUser._id : null
          }
        ],
        { session }
      );

      departmentId = createdDepartments[0]._id;

      if (headUser) {
        await syncHeadDepartment(headUser._id, createdDepartments[0].name, session);
      }
    });

    const department = await getDepartmentByIdOrThrow(departmentId);
    return sanitizeDepartment(department);
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "Department name already exists");
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

const updateDepartment = async (departmentId, { name, description, headId, isActive }) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const departmentQuery = Department.findById(departmentId);
      departmentQuery.session(session);

      const department = await departmentQuery;

      if (!department) {
        throw new ApiError(404, "Department not found");
      }

      const hasNameChange = typeof name !== "undefined" && name.trim() && name.trim() !== department.name;

      if (hasNameChange) {
        await ensureDepartmentNameAvailable(name, departmentId, session);
      }

      const nextIsActive = typeof isActive === "boolean" ? isActive : department.isActive;

      if (
        nextIsActive === false &&
        typeof headId !== "undefined" &&
        headId !== null &&
        String(headId) !== String(department.head || "")
      ) {
        throw new ApiError(400, "Inactive department cannot receive new employees");
      }

      if (typeof description !== "undefined") {
        department.description = description;
      }

      if (hasNameChange) {
        const previousName = department.name;
        department.name = name.trim();
        await renameDepartmentMembers(previousName, department.name, session);
      }

      if (typeof isActive === "boolean") {
        department.isActive = isActive;
        department.deactivatedAt = isActive ? null : new Date();
      }

      let headUser = null;
      if (typeof headId !== "undefined") {
        headUser = await validateDepartmentHead(headId, departmentId, session);
        department.head = headUser ? headUser._id : null;
      }

      await department.save({ session });

      if (headUser) {
        await syncHeadDepartment(headUser._id, department.name, session);
      }
    });

    const department = await getDepartmentByIdOrThrow(departmentId);
    return sanitizeDepartment(department);
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "Department name already exists");
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

const assignDepartmentHead = async (departmentId, headId) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const departmentQuery = Department.findById(departmentId);
      departmentQuery.session(session);

      const department = await departmentQuery;

      if (!department) {
        throw new ApiError(404, "Department not found");
      }

      if (!department.isActive) {
        throw new ApiError(400, "Inactive department cannot receive new employees");
      }

      const headUser = await validateDepartmentHead(headId, departmentId, session);

      department.head = headUser._id;
      await department.save({ session });
      await syncHeadDepartment(headUser._id, department.name, session);
    });

    const department = await getDepartmentByIdOrThrow(departmentId);
    return sanitizeDepartment(department);
  } finally {
    await session.endSession();
  }
};

const deactivateDepartment = async (departmentId) => {
  const departmentQuery = getDepartmentQuery(departmentId);
  const department = await departmentQuery;

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  if (!department.isActive) {
    return sanitizeDepartment(department);
  }

  department.isActive = false;
  department.deactivatedAt = new Date();

  await department.save();

  const updatedDepartment = await getDepartmentByIdOrThrow(departmentId);
  return sanitizeDepartment(updatedDepartment);
};

const getDepartmentById = async (departmentId) => {
  const department = await getDepartmentByIdOrThrow(departmentId);
  return sanitizeDepartment(department);
};

const listDepartments = async (query) => {
  const { page, limit, skip } = parsePagination(query);
  const filters = buildDepartmentFilters(query);

  const [departments, totalItems] = await Promise.all([
    Department.find(filters)
      .populate("head", "name email role department isActive")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Department.countDocuments(filters)
  ]);

  return {
    items: departments.map(sanitizeDepartment),
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit) || 1
    }
  };
};

const assertDepartmentCanAcceptMembers = async (departmentName) => {
  const department = await Department.findOne({
    normalizedName: normalizeName(departmentName)
  });

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  if (!department.isActive) {
    throw new ApiError(400, "Inactive department cannot receive new employees");
  }

  return department;
};

module.exports = {
  createDepartment,
  updateDepartment,
  assignDepartmentHead,
  deactivateDepartment,
  getDepartmentById,
  listDepartments,
  assertDepartmentCanAcceptMembers
};

