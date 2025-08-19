import { Outlet, useNavigate } from "react-router-dom";
import ChatPanel from "../chatpanel/ChatList";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import DashboardHeader from "../../components/DashboardHeader";
import { addConnections } from "../../utils/connectionsSlice";
import { toast } from "react-toastify";
import { addRequests } from "../../utils/requestsSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useDispatch();

  // it is here because we need to update count of requests
  async function getRequests() {
    try {
      const res = await axios.get(`${base_url}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.requests));
    } catch (error) {
      console.error(error);
    }
  }

  async function getConnections() {
    try {
      const res = await axios.get(`${base_url}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConnections(res.data?.data));
    } catch (error) {
      toast.error(error.data?.message);
      consol.error(error);
    }
  }

  useEffect(() => {
    getConnections();
    getRequests();
  }, []);

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
