import { Link } from "react-router-dom";
import bgImage from "./assets/TechTinder_bg.png";

function Welcome() {
  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >      
      <div className="relative z-10 flex justify-between items-center h-24 px-8 sm:px-16">
        <div className="text-4xl font-bold text-blue-800 hover:text-blue-600 transition-colors duration-300">
          TechTinder
        </div>

        <div className="flex gap-8 items-center">
          <nav className="hidden md:flex gap-8">
            <Link
              to="/"
              className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </nav>

          {/* Changed button to darker gradient for contrast */}
          <button className="rounded-full py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;