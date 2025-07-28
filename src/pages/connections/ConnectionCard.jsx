import { FiMessageCircle } from "react-icons/fi";

function ConnectionCard({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-all">
      <div className="relative">
        <img
          src={user.image}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
        />
        <div
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
            user.online ? "bg-green-500" : "bg-gray-400"
          }`}
        ></div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.status}</p>
      </div>
      <button className="text-blue-600 hover:text-blue-800">
        <FiMessageCircle className="text-xl" />
      </button>
    </div>
  );
}

export default ConnectionCard;
