import { IoIosSearch } from "react-icons/io";
import boyImage from "../../assets/boy.jpg";
import { MdPeopleAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

function ChatPanel() {
  return (
    <div className="h-screen max-w-[350px] flex flex-col border-r border-gray-200">
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-2xl font-bold">Messages</h1>
          <div className="flex items-center justify-center gap-4">
            <MdPeopleAlt className="text-xl text-white" />
            <BsThreeDotsVertical className="text-xl text-white" />
          </div>
        </div>
        <div className="relative">
          <IoIosSearch className="absolute text-gray-500 left-3 text-xl top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search a person"
            className="w-full bg-white/20 text-gray-500 placeholder:text-gray-500  bg-opacity-20 rounded-full pl-10 pr-4 py-2 focus:ring-2  focus:outline-none focus:ring-white  focus:bg-white/30"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        <h3 className="px-4 pt-4 pb-2 text-gray-500 font-medium">Recent</h3>
        <div className="space-y-2 px-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={boyImage}
                    alt="profile"
                    className="z-10 w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div className="absolute bg-green-600 border-blue-500 border-2 right-1 bottom-0 z-20 bg-green p-1 rounded-full "></div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Kevin</div>
                  <div className="text-sm text-gray-500 truncate max-w-[180px]">
                    New Match! Say Hello
                  </div>
                </div>
              </div>
              <div className="text-xs pt-1">2m</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;
