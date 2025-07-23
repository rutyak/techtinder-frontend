import { IoIosSearch } from "react-icons/io";
import boyImage from "../../assets/boy.jpg";
import { MdPeopleAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/userSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function ChatPanel({ setIsProfileOpen }) {
  const user = useSelector((state) => state.users);
  console.log("user: ", user);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  useEffect(() => {
    function handleDropdownClose(e) {
      if (dropdownRef && !dropdownRef.current.contains(e.target)) {
        setIsOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleDropdownClose);

    return () => {
      document.removeEventListener("mousedown", handleDropdownClose);
    };
  }, []);

  async function logout() {
    try {
      const res = await axios.post(
        base_url + "/logout",
        {},
        { withCredentials: true }
      );
      console.log("res: ", res);
      dispatch(removeUser());
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  }

  return (
    <div className="h-screen w-full max-w-[340px] flex flex-col border-r border-gray-200">
      <div className="relative bg-gradient-to-r from-blue-400 to-blue-500 p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1
            className="flex items-center gap-2 text-white text-2xl font-bold cursor-pointer"
            onClick={() => setIsOpenDropdown((prev) => !prev)}
          >
            <CgProfile />{" "}
            <div className="text-[16px] font-medium">
              <span className="font-light">Welcome</span>, {user?.firstname}
            </div>
          </h1>
          <div className="flex items-center justify-center gap-4 cursor-pointer">
            <MdPeopleAlt className="text-xl text-white" />
            <BsThreeDotsVertical className="text-xl text-white" />
          </div>
        </div>
        {isOpenDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-12 left-6 z-10 w-30 flex flex-col rounded-xl border bg-white text-black cursor-pointer p-2"
          >
            <div
              className="hover:bg-blue-100 px-6 py-1 rounded-lg"
              onClick={() => setIsProfileOpen(false)}
            >
              Feeds
            </div>
            <div
              className="hover:bg-blue-100 px-6 py-1 rounded-lg"
              onClick={() => setIsProfileOpen(true)}
            >
              Profile
            </div>
            <div
              className="hover:bg-blue-100 px-6 py-1 rounded-lg"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        )}
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
        <h3 className="px-4 pt-4 pb-2 text-gray-500 font-medium">Chats</h3>
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
