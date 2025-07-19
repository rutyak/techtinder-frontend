import { IoIosSearch } from "react-icons/io";
import boyImage from "../../assets/boy.png";

function ChatPanel() {
  return (
    <div className="h-screen w-[300px] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-xl md:text-2xl font-semibold ">Chats</div>
        <IoIosSearch />
      </div>

      <div className="bg-white">
        <h3>Messages</h3>
        <div className="flex flex-col justify-center gap-2">
          {[...Array(5)].map(() => (
            <div className="flex items-center gap-5">
              <img
                src={boyImage}
                alt="image"
                className="w-14 h-14 rounded-[50%]"
              />
              <div className="flex flex-col gap-1 justify-center">
                <div>Kevin</div>
                <div>New Match! Say Hello</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;
