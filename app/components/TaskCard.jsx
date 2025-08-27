export default function TaskCard({ task }) {
  return (
    <div
      className={`p-4 mb-3 rounded-xl shadow-md bg-white border-l-4 ${
        task.priority === "High"
          ? "border-red-500"
          : task.priority === "Low"
          ? "border-green-500"
          : "border-blue-500"
      }`}
    >
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>

      {task.assigneeId && (
        <div className="flex items-center mt-2">
          <img
            src="/avatars/demo-avatar.png"
            alt="User"
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-gray-700">Assigned</span>
        </div>
      )}

      {task.dueDate && (
        <p className="text-xs text-gray-400 mt-1">Due: {task.dueDate}</p>
      )}

      <button
        className={`mt-2 px-3 py-1 rounded text-sm ${
          task.completed ? "bg-green-200" : "bg-gray-200"
        }`}
      >
        {task.completed ? "✅ Completed" : "Mark Complete"}
      </button>
    </div>
  )
}
