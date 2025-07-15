import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="relative z-10 flex justify-between items-center h-24 px-8 sm:px-16">
      <div className="flex items-center gap-2 text-xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-transparent bg-clip-text tracking-tight drop-shadow-lg hover:drop-shadow-xl transition-all duration-300">
        <span className="pb-1">🔥</span>
        <span>TechTinder</span>
      </div>

      <div className="flex gap-8 items-center">
        <nav className="hidden md:flex gap-14">
          <Link
            to="/"
            className="font-semibold text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-semibold text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="font-semibold text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="font-semibold text-lg text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </nav>

        <button className="rounded-full py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;
