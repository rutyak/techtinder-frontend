import { IoIosSearch } from "react-icons/io";
import boyImage from "../../assets/boy.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/userSlice";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { HiOutlineInbox } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import Menu from "../menu/Menu";
import Header from "../welcome/WelcomHeader";
import DashboardHeader from "../../components/DashboardHeader";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function ChatPanel({ setIsProfileOpen }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex-1 overflow-y-auto md:bg-gray-50 hidden lg:block">
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
                <div className="absolute bg-green-600 border-white border-2 right-1 bottom-0 w-3 h-3 rounded-full"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Kevin</div>
                <div className="text-sm text-gray-500 truncate max-w-[180px]">
                  New Match! Say Hello
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

export default ChatPanel;
