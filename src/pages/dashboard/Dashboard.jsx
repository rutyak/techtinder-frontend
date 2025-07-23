import { useNavigate } from "react-router-dom";
import ChatPanel from "../chatpanel/ChatPanel";
import FeedCard from "../feedcard/FeedCard";
import { useEffect, useState } from "react";
import Profile from "../profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeeds } from "../../utils/feedSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Dashboard() {
  const feeds = useSelector((state) => state.feeds);
  console.log("feeds from store: ", feeds);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let cookies = document.cookie;
    if (!cookies) {
      navigate("/", { replace: true });
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
      console.log("feeds :: ", res?.data?.feeds);
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

      <div className="flex-1">{isProfileOpen ? <Profile /> : <FeedCard />}</div>
    </div>
  );
}

export default Dashboard;
