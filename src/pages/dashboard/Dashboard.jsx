import { Outlet, useNavigate } from "react-router-dom";
import ChatPanel from "../chatpanel/ChatList";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "../../components/DashboardHeader";
import { removeUser } from "../../utils/userSlice";

function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col lg:flex-row items-center">
      <div className="relative lg:fixed z-50 w-full h-[65px] lg:h-screen lg:max-w-[340px] flex flex-col border-r border-gray-200">
        <DashboardHeader />
        <div className="hidden lg:block">
          <ChatPanel setIsProfileOpen={setIsProfileOpen} />
        </div>
      </div>

      <div className="lg:min-h-screen relative flex-1 w-full sm:bg-gray-100 overflow-auto lg:ml-[340px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
