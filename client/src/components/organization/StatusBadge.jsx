function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;