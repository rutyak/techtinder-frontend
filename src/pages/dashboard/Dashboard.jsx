import { Outlet, useNavigate } from "react-router-dom";
import ChatPanel from "../chatpanel/ChatPanel";
import FeedCard from "../../components/FeedCard";
import { useEffect, useState } from "react";
import Profile from "../profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeeds } from "../../utils/feedSlice";
import { jwtDecode } from "jwt-decode";
import boyImage from "../../assets/dhanya.jpg";
import DashboardHeader from "../../components/DashboardHeader";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Dashboard() {
  const feeds = useSelector((state) => state.feeds);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  if (!document.cookie) {
    return null;
  }

  async function getFeedData() {
    try {
      const res = await axios.get(base_url + "/feeds", {
        withCredentials: true,
      });
      dispatch(addFeeds(res?.data?.feeds));
    } catch (error) {
      console.error("error: ", error);
    }
  }

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row items-center">
      <div className="w-full h-[8%] md:h-screen md:max-w-[250px] lg:max-w-[340px] flex flex-col border-r border-gray-200">
        {/* header */}
        <DashboardHeader />
        <ChatPanel setIsProfileOpen={setIsProfileOpen} />
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
