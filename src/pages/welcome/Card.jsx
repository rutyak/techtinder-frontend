import { StartIcon } from "../../assets/Icons";

function Card({ name, position, rating, text }) {
  return (
    <div className="border border-gray-200 p-6 flex flex-col gap-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div>
        <h1 className="text-xl font-bold text-gray-800">{name}</h1>
        <h3 className="text-sm text-gray-500 mt-1">{position}</h3>
      </div>

      <hr className="border-gray-100" />

      <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-5">
        {text}
      </p>

      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <StartIcon key={i} filled={i < rating} />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-2">({rating}/5)</span>
      </div>
    </div>
  );
}

export default Card;
