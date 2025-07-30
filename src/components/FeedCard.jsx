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

const FeedCard = ({ profile, showActions = true, showLabels = true }) => {
  const {
    name = "Dhanya Takalkar",
    age = 24,
    job = "Designer",
    distance = 33,
    image = "https://via.placeholder.com/400x600", 
  } = profile;

  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <>
      {showLabels && (
        <PiFireFill className="absolute top-8 lg:top-4 text-4xl text-gray-300 opacity-70 hidden md:block" />
      )}

      <div className="max-w-4xl h-full w-full my-3 mx-3 md:m-0 md:max-w-[370px] md:max-h-[570px] lg:max-w-[350px] lg:max-h-[550px]  xl:max-w-[310px] xl:max-h-[510px]  relative flex flex-col items-center justify-center gap-6 md:px-4">
        <div className="h-full w-full flex flex-col items-center gap-4">
          <div className="h-full w-full relative group transition-transform duration-300 hover:-translate-y-1">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover rounded-2xl shadow-2xl md:border md:border-gray-700"
            />

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            {/* Profile info */}
            <div className="absolute bottom-4 left-4 z-10 text-white drop-shadow">
              <h3 className="font-bold text-3xl md:text-2xl">{name}</h3>
              <div className="font-medium text-md md:text-sm opacity-90">
                {distance} km away · {age} yrs
              </div>
              <div className="font-semibold text-md md:text-sm opacity-90">
                {job}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          {showActions && (
            <div className="flex gap-8 p-3 rounded-full">
              <button
                title="Nope"
                className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 hover:scale-110 transition-all shadow-md"
              >
                <RiCloseLargeFill className="text-2xl" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                title="Favorite"
                className={`p-3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-all shadow-md ${
                  isFavorite
                    ? "scale-110 ring ring-yellow-200"
                    : "hover:scale-110"
                }`}
              >
                <GoStarFill className="text-2xl" />
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                title="Like"
                className={`p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md ${
                  isLiked ? "scale-110 ring ring-blue-300" : "hover:scale-110"
                }`}
              >
                <BiSolidLike className="text-2xl" />
              </button>
            </div>
          )}
        </div>
      </div>

      {showLabels && (
        <div className="text-center absolute bottom-8 lg:bottom-4 md:flex md:flex-wrap justify-center gap-20 px-2 text-gray-300 text-sm hidden">
          <div className="flex items-center gap-1">
            <LuArrowLeft />
            <span>NOPE</span>
          </div>
          <div className="flex items-center gap-1">
            <LuArrowRight />
            <span>LIKE</span>
          </div>
          <div className="flex items-center gap-1">
            <LuArrowUp />
            <span>SEE PROFILE</span>
          </div>
          <div className="flex items-center gap-1">
            <LuArrowDown />
            <span>CLOSE PROFILE</span>
          </div>
          <div className="flex items-center gap-1">
            <IoMdStarOutline />
            <span>SUPER LIKE</span>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedCard;
