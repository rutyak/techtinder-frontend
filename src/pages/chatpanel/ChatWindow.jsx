import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import boyImage from "../../assets/boy.jpg";
import chatbg from "../../assets/chatbg.png";
import { useNavigate } from "react-router-dom";
import { HiArrowSmallLeft } from "react-icons/hi2";

function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey Kevin!", sender: "me" },
    { id: 2, text: "Hi! How are you?", sender: "other" },
    { id: 3, text: "I'm good, just working on a project.", sender: "me" },
    { id: 4, text: "Nice! Keep it up 💪", sender: "other" },
  ]);

  const navigate = useNavigate();

  function handleSend() {
    if (input.trim() === "") return;

    setMessages([...messages, { id: Date.now(), text: input, sender: "me" }]);
    setInput("");
  }

  return (
    <div className="h-screen flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between px-[20px] bg-white shadow-xl h-16">
        <div className="flex items-center gap-4">
          <HiArrowSmallLeft
            className="block lg:hidden text-2xl cursor-pointer text-gray-700 hover:text-blue-500"
            onClick={() => navigate("/dashboard")}
          />
          <img
            src={boyImage}
            alt="user-image"
            className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="flex flex-col">
            <div className="font-sm font-semibold text-gray-800">Kevin</div>
            <div className="text-xs text-green-700">Online</div>
          </div>
        </div>
        <CiSearch className="text-xl text-gray-600 cursor-pointer hover:text-blue-500" />
      </div>

      {/* chat messages */}
      <div
        className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-100"
        style={{
          backgroundImage: `url(${chatbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-md text-sm ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-white px-4 py-3 shadow-xl">
        <div className="w-full max-w-6xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            className="p-3 rounded-full text-blue-500 hover:text-blue-600 transition"
          >
            <AiOutlineSend size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
