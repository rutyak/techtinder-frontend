import { useState, useRef, createRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { RiCloseLargeFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { SiTinder } from "react-icons/si";
import Instruction from "./Instructions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { addFeeds, removeFeeds } from "../../utils/feedSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function FeedCards({
  profile,
  showActions = true,
  showLabels = true,
  isPreview = false,
}) {
  const feeds = useSelector((state) => state.feeds);

  const [people, setPeople] = useState(profile ? [profile] : []);
  const cardRefs = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile && Array.isArray(feeds)) {
      setPeople(feeds);
    }
  }, [feeds]);

  async function getFeedData() {
    try {
      const res = await axios.get(base_url + "/feeds", {
        withCredentials: true,
      });
      setPeople(res?.data?.feeds);
      dispatch(addFeeds(res?.data?.feeds));
    } catch (error) {
      console.error("error: ", error);
    }
  }

  useEffect(() => {
    getFeedData();
  }, []);

  // Keep refs in sync with people array
  useEffect(() => {
    cardRefs.current = people.map(() => createRef());
  }, [people]);

  // Update when profile prop changes
  useEffect(() => {
    if (profile) {
      setPeople([profile]);
    }
  }, [profile]);

  async function handleCardLeft(dir, id) {
    try {
      let endpoint = "";
      if (dir === "right") {
        endpoint = `${base_url}/request/send/interested/${id}`;
      } else if (dir === "left") {
        endpoint = `${base_url}/request/send/ignored/${id}`;
      } else {
        endpoint = `${base_url}/request/send/superinterested/${id}`;
      }

      const res = await axios.post(endpoint, {}, { withCredentials: true });
      toast.success(res.data?.message || "Request sent successfully");

      // Remove from Redux store
      dispatch(removeFeeds(id));

      // Remove from local state
      if (!isPreview) {
        setPeople((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  async function swipe(dir) {
    if (isPreview) return;
    const cardsLeft = cardRefs.current.filter((ref) => ref.current);
    if (cardsLeft?.length) {
      const CardToSwipe = cardsLeft[cardsLeft?.length - 1].current;
      await CardToSwipe.swipe(dir);
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-between sm:gap-6">
      {showLabels && !isPreview && (
        <SiTinder size={28} className="text-gray-300 my-3 hidden sm:block" />
      )}

      <div className="relative w-[95%] sm:w-[310px] h-[70vh] sm:h-[420px] flex justify-center">
        {people?.map((person, index) => {
          const CardContent = (
            <div
              style={{
                backgroundImage: `url(${person?.imageurl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-full h-full rounded-2xl flex items-end p-4 text-white shadow-lg"
            >
              <div className="bg-black/40 p-3 rounded-lg">
                <h2 className="text-xl font-bold">
                  {person?.firstname} {person?.lastname}, {person?.age}
                </h2>
                {showLabels && <p className="text-sm">{person.job}</p>}
              </div>
            </div>
          );

          return isPreview ? (
            <div key={person?._id} className="absolute w-full h-full">
              {CardContent}
            </div>
          ) : (
            <TinderCard
              ref={cardRefs.current[index]}
              key={person?._id}
              preventSwipe={["down"]}
              onSwipe={(dir) => handleCardLeft(dir, person?._id)}
              swipeRequirementType="position"
              className="absolute w-full h-full"
            >
              {CardContent}
            </TinderCard>
          );
        })}
      </div>

      {showActions && (
        <div className="flex gap-8 mt-6 mb-4">
          <button
            onClick={() => swipe("left")}
            className="p-4 rounded-full bg-red-100 text-red-500 shadow-lg hover:scale-110 transition"
          >
            <RiCloseLargeFill size={28} />
          </button>
          <button
            onClick={() => swipe("up")}
            className="p-4 rounded-full bg-blue-100 text-blue-500 shadow-lg hover:scale-110 transition"
          >
            <GoStarFill size={28} />
          </button>
          <button
            onClick={() => swipe("right")}
            className="p-4 rounded-full bg-green-100 text-green-500 shadow-lg hover:scale-110 transition"
          >
            <BiSolidLike size={28} />
          </button>
        </div>
      )}

      {!isPreview && showLabels && <Instruction />}
    </div>
  );
}

export default FeedCards;
