import boyImage from "../../assets/boy.jpg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function ChatList({ setIsProfileOpen }) {
  const user = useSelector((state) => state.user);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

  const navigate = useNavigate();
  // const { setIsChatWindowOpen } = useGlobalVariable();

  function handleClick() {
    if (window.innerWidth < 1024) {
      navigate("/chatwindow");
    } else {
      navigate("/dashboard/chatwindow");
    }
  }

  return (
    <div className="h-full flex-1 overflow-y-auto md:bg-gray-50">
      <h3 className="px-4 pt-2 pb-2 text-gray-500 font-medium">Chats</h3>
      <div className="space-y-2 px-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
            onClick={handleClick}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={boyImage}
                  alt="profile"
                  className="z-10 w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                />
                <div className="absolute bg-green-600 border-white border-2 right-1 bottom-0 w-3 h-3 rounded-full"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Kevin</div>
                <div className="text-sm text-gray-500 truncate max-w-[180px]">
                  New Match! Say Hello 👋
                </div>
              </div>
            </div>
            <div className="text-xs pt-1 text-gray-400">2m</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
