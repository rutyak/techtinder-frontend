import { Outlet, useNavigate } from "react-router-dom";
import ChatPanel from "../chatpanel/ChatPanel";
import FeedCard from "../../components/FeedCard/FeedCards";
import { useEffect, useState } from "react";
import Profile from "../profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeeds } from "../../utils/feedSlice";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "../../components/DashboardHeader";
import { useGlobalVariable } from "../../context/GlobalContext";
import { addRequests } from "../../utils/requestsSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function Logout() {
    const res = await axios.post(
      base_url + "/logout",
      {},
      { withCredentials: true }
    );
  }

  useEffect(() => {
    let cookies = document.cookie;
    let token = cookies
      .split(";")
      .find((row) => row.startsWith("jwtToken="))
      ?.split("=")[1];

    if (!token) {
      navigate("/", { replace: true });
    }

    try {
      let decoded = jwtDecode(token);
      let currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        navigate("/", { replace: true });
        Logout();
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  if (!document.cookie) {
    return null;
  }

  async function getRequests() {
    const res = await axios.get(`${base_url}/user/requests`, {
      withCredentials: true,
    });
    dispatch(addRequests(res?.data?.requests));
  }

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="h-screen flex flex-col lg:flex-row items-center">
      <div className="relative lg:fixed z-50 w-full h-[65px] lg:h-screen lg:max-w-[340px] flex flex-col border-r border-gray-200">
        <DashboardHeader />
        <ChatPanel setIsProfileOpen={setIsProfileOpen} />
      </div>

      <div className="lg:min-h-screen relative flex-1 w-full sm:bg-gray-100 overflow-auto lg:ml-[340px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
