import { useNavigate } from "react-router-dom";
import ChatPanel from "../chatpanel/ChatPanel";
import FeedCard from "../../components/FeedCard";
import { useEffect, useState } from "react";
import Profile from "../profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeeds } from "../../utils/feedSlice";
import { jwtDecode } from "jwt-decode";
import boyImage from "../../assets/dhanya.jpg";

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
    <div className="flex items-center">
      <ChatPanel setIsProfileOpen={setIsProfileOpen} />

      <div className="flex-1 h-screen flex items-center justify-center bg-gray-100">
        {isProfileOpen ? (
          <Profile />
        ) : (
          <FeedCard
            profile={{
              name: "Dhanya Takalkar",
              age: 24,
              job: "Designer",
              distance: 33,
              image: boyImage,
            }}
            showActions={true}
            showLabels={true}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
