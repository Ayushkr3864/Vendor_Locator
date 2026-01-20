// ActiveBadge.jsx
function ActiveBadge({ isActive }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isActive
          ? "bg-green-300 text-green-800 border border-blue-300"
          : "bg-red-100 text-gray-800 border border-gray-300"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          isActive ? "bg-blue-500" : "bg-gray-500"
        }`}
      ></span>
      {isActive ? "Active" : "Not Active"}
    </span>
  );
}
export default ActiveBadge
