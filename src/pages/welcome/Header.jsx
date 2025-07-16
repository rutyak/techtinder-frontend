import { Link } from "react-router-dom";

function Header({ isScrollingUp }) {
  return (
    <div className="fixed top-0 inset-0">
      <div
        className={`relative z-10 flex justify-between items-center h-16 md:h-20 px-5 md:px-8 lg:px-16 ${
          isScrollingUp
            ? "bg-white/5 backdrop-blur-md backdrop-saturate-150"
            : ""
        }`}
        style={{ zIndex: 30 }}
      >
        <div className="flex items-center gap-1 text-lg sm:text-xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-transparent bg-clip-text tracking-tight drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 mb-1 sm:mb-2 cursor-pointer">
          <span>🔥</span>
          <span>TechTinder</span>
        </div>

        <div className="flex gap-8 items-center">
          <nav className="hidden md:flex items-end md:gap-8 lg:gap-14">
            <Link
              to="/"
              className="font-semibold text-base lg:text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-semibold text-base lg:text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="font-semibold text-base lg:text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="font-semibold text-base lg:text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </nav>

          <button className="rounded-full py-1 px-3 md:py-2 md:px-6 text-md md:text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
