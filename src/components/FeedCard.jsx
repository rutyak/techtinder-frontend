// src/components/FeedCard.jsx
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { GoStarFill } from "react-icons/go";
import { BiSolidLike } from "react-icons/bi";
import { IoMdStarOutline } from "react-icons/io";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUp,
  LuArrowDown,
} from "react-icons/lu";
import { PiFireFill } from "react-icons/pi";

const FeedCard = ({
  profile = {},
  showActions = true,
  showLabels = true,
}) => {
  const {
    name = "Unknown User",
    age = "--",
    job = "No job info",
    distance = "--",
    image = "",
  } = profile;

  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <PiFireFill className="absolute top-3 text-3xl text-gray-300" />

      <div className="flex flex-col items-center gap-3">
        {/* Profile Card Image */}
        <div className="relative transition-transform duration-300 hover:-translate-y-1">
          <div className="flex flex-col">
            <img
              src={image}
              alt={name}
              className="relative h-[360px] w-[300px] object-cover rounded-xl shadow-lg border-2 border-white/10"
            />
            <div className="absolute left-3 bottom-3 text-white">
              <h3 className="font-bold text-xl">{name}</h3>
              <div className="font-semibold text-xs">{distance}km Away, {age}</div>
              <div className="font-semibold text-xs">{job}</div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Like / Favorite / Close Buttons */}
        {showActions && (
          <div className="flex gap-6 p-3 rounded-full backdrop-blur-sm">
            <button className="p-2 rounded-full bg-red-500 text-white transition-all duration-200 hover:scale-125 active:scale-100">
              <RiCloseLargeFill className="text-xl" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full bg-yellow-500 text-white transition-all duration-200 hover:scale-125 active:scale-100 ${
                isFavorite ? "text-yellow-200 scale-110" : ""
              }`}
            >
              <GoStarFill className="text-xl" />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full bg-blue-500 text-white transition-all duration-200 hover:scale-125 active:scale-100 ${
                isLiked ? "text-blue-400 scale-110" : ""
              }`}
            >
              <BiSolidLike className="text-xl" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Labels */}
      {showLabels && (
        <div className="absolute bottom-6 flex flex-wrap justify-center gap-6 items-center text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <LuArrowLeft />
            <span>NOPE</span>
          </div>
          <div className="flex items-center gap-2">
            <LuArrowRight />
            <span>LIKE</span>
          </div>
          <div className="flex items-center gap-2">
            <LuArrowUp />
            <span>SEE PROFILE</span>
          </div>
          <div className="flex items-center gap-2">
            <LuArrowDown />
            <span>CLOSE PROFILE</span>
          </div>
          <div className="flex items-center gap-2">
            <IoMdStarOutline />
            <span>Super Like</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
