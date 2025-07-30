import { useState, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import { RiCloseLargeFill } from "react-icons/ri";
import { GoStarFill } from "react-icons/go";
import { BiSolidLike } from "react-icons/bi";

const FeedCard = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const [lastDirection, setLastDirection] = useState(null);

  // Initialize refs once
  const childRefs = useMemo(
    () => Array(profiles.length).fill(0).map(() => React.createRef()),
    [profiles.length]
  );

  const swiped = (direction, profile, index) => {
    setLastDirection(direction);
    setCurrentIndex(index - 1);

    if (direction === "right") {
      console.log(`Interested in ${profile.name} ✅`);
    } else if (direction === "left") {
      console.log(`Not interested in ${profile.name} ❌`);
    }
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen`);
  };

  // Trigger swipe programmatically
  const swipe = async (dir) => {
    if (currentIndex >= 0 && currentIndex < profiles.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[85vh] px-3">
      {/* Card container */}
      <div className="relative w-full max-w-sm h-[500px]">
        {profiles.map((profile, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={profile.name}
            onSwipe={(dir) => swiped(dir, profile, index)}
            onCardLeftScreen={() => outOfFrame(profile.name)}
            preventSwipe={["up", "down"]}
            className="absolute w-full h-full"
          >
            <div
              className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl 
                         transform transition-transform duration-300 cursor-grab active:cursor-grabbing`}
              style={{
                zIndex: index === currentIndex ? profiles.length : index,
              }}
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute bottom-6 left-5 text-white">
                <h3 className="text-3xl font-bold drop-shadow">
                  {profile.name}, {profile.age}
                </h3>
                <p className="text-md opacity-90">{profile.job}</p>
                <p className="text-sm opacity-70">{profile.distance} km away</p>
              </div>

              {lastDirection === "right" && index === currentIndex && (
                <span className="absolute top-8 left-5 px-4 py-2 border-4 border-green-400 text-green-400 text-lg font-bold rotate-[-15deg]">
                  INTERESTED
                </span>
              )}
              {lastDirection === "left" && index === currentIndex && (
                <span className="absolute top-8 right-5 px-4 py-2 border-4 border-red-500 text-red-500 text-lg font-bold rotate-[15deg]">
                  NOT INTERESTED
                </span>
              )}
            </div>
          </TinderCard>
        ))}
      </div>

      <div className="flex gap-6 mt-6">
        <button
          onClick={() => swipe("left")}
          className="p-4 rounded-full bg-red-600 text-white shadow-lg hover:scale-110 transition"
        >
          <RiCloseLargeFill className="text-2xl" />
        </button>
        <button
          onClick={() => swipe("right")}
          className="p-4 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 transition"
        >
          <BiSolidLike className="text-2xl" />
        </button>
        <button
          onClick={() => console.log("Super Like ⭐")}
          className="p-4 rounded-full bg-yellow-500 text-white shadow-lg hover:scale-110 transition"
        >
          <GoStarFill className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
