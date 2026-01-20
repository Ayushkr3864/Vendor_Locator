// StatusBadge.jsx
function StatusBadge({ status }) {
  const isCompleted = status === true;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isCompleted
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-orange-100 text-orange-800 border border-orange-300"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          isCompleted ? "bg-green-500" : "bg-orange-500"
        }`}
      ></span>
      {isCompleted ? "Completed" : "Pending"}
    </span>
  );
}
export default StatusBadge;
