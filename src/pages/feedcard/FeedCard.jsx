import { RiCloseLargeFill } from "react-icons/ri";
import { GoStarFill } from "react-icons/go";
import { BiSolidLike } from "react-icons/bi";
import boysImage from "../../assets/boy.jpg";
import { BsArrowLeftCircle } from "react-icons/bs";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import { LuCircleArrowRight } from "react-icons/lu";
import { useState } from "react";

function FeedCard() {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      {/* Image Card */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative transition-transform duration-300 hover:-translate-y-1">
          <div className="flex flex-col">
            <img
              src={boysImage}
              alt="feed-image"
              className="relative h-[360px] w-[300px] object-cover rounded-xl shadow-lg border-2 border-white/10"
            />
            <div className="absolute left-3 bottom-3">
              <h3 className="text-white font-bold text-xl">Rutik Khandekar</h3>
              <div className="text-white font-semibold text-xs">
                33km Away, 24
              </div>
              <div className="text-white font-semibold text-xs">
                Full stack Developer
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
        </div>

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
      </div>

      <div className="instructions flex flex-wrap items-center justify-center gap-5">
        <div className="flex items-center gap-2">
          <BsArrowLeftCircle className="text-sm"/>
          <div className="text-sm">NOPE</div>
        </div>
        <div className="flex items-center gap-2">
          <LuCircleArrowRight />
          <div>LIKE</div>
        </div>
        <div className="flex items-center gap-2">
          <FiArrowUpCircle />
          <div>SEE PROFILE</div>
        </div>
        <div className="flex items-center gap-2">
          <FiArrowDownCircle />
          <div>CLOSE PROFILE</div>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
