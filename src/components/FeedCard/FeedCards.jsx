import { useState, useRef, createRef } from "react";
import TinderCard from "react-tinder-card";
import { RiCloseLargeFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { SiTinder } from "react-icons/si";
import Instruction from "./Instructions";

function FeedCards({ profile, showActions = true, showLabels = true }) {
  const [people, setPeople] = useState(
    profile
      ? [profile] // if Profile passes preview card
      : [
          {
            name: "Ritika Sharma",
            age: 23,
            job: "Frontend Dev",
            distance: 5,
            image: "https://i.pravatar.cc/400?img=1",
          },
          {
            name: "Aman Verma",
            age: 25,
            job: "Backend Dev",
            distance: 12,
            image: "https://i.pravatar.cc/400?img=2",
          },
          {
            name: "Sanya Kapoor",
            age: 22,
            job: "UI Designer",
            distance: 8,
            image: "https://i.pravatar.cc/400?img=3",
          },
        ]
  );

  const cardRefs = useRef(people.map(() => createRef()));

  function handleCardLeft(name) {
    setPeople((prev) => prev.filter((p) => p.name !== name));
  }

  async function swipe(dir) {
    const cardsLeft = cardRefs.current.filter((ref) => ref.current);
    if (cardsLeft.length) {
      let CardToSwipe = cardsLeft[cardsLeft.length - 1].current;
      await CardToSwipe.swipe(dir);
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tinder Logo */}
      {showLabels && (
        <SiTinder size={28} className="text-red-500 my-3 hidden lg:block" />
      )}

      {/* Card Stack */}
      <div className="relative w-[95%] sm:w-[310px] h-[70vh] sm:h-[420px] flex justify-center">
        {people.map((person, index) => (
          <TinderCard
            ref={cardRefs.current[index]}
            key={person.name}
            preventSwipe={["down"]}
            onCardLeftScreen={() => handleCardLeft(person.name)}
            swipeRequirementType="position"
            className="absolute w-full h-full"
          >
            <div
              style={{
                backgroundImage: `url(${person.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-full h-full rounded-2xl flex items-end p-4 text-white shadow-lg"
            >
              <div className="bg-black/40 p-3 rounded-lg">
                <h2 className="text-xl font-bold">
                  {person.name}, {person.age}
                </h2>
                {showLabels && (
                  <>
                    <p className="text-sm">{person.job}</p>
                    <p className="text-xs">{person.distance} km away</p>
                  </>
                )}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {/* Action Buttons */}
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

      {/* Instruction Bar */}
      {showLabels && <Instruction />}
    </div>
  );
}

export default FeedCards;
