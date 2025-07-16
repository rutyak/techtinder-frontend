import {
  FacebookIcon,
  InstaIcon,
  TwitterIcon,
  YouTubeIcon,
} from "../../assets/Icons";
import { Link } from "react-router-dom";

function Footer() {
  const linkStyle = "text-gray-400 hover:text-white font-sm text-sm sm:font-medium";

  return (
    <footer className="text-gray-300 py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="#"
            aria-label="Facebook"
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <FacebookIcon className="w-6 h-6 hover:text-white" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <TwitterIcon className="w-6 h-6 hover:text-white" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <InstaIcon className="w-6 h-6 hover:text-white" />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <YouTubeIcon className="w-6 h-6 hover:text-white" />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          <Link to="/" className={linkStyle}>
            Home
          </Link>
          <Link to="/about" className={linkStyle}>
            About
          </Link>
          <Link to="/support" className={linkStyle}>
            Support
          </Link>
          <Link to="/contact" className={linkStyle}>
            Contact Us
          </Link>
          <Link to="/privacy" className={linkStyle}>
            Privacy Policy
          </Link>
          <Link to="/terms" className={linkStyle}>
            Terms of Service
          </Link>
        </nav>

        <div className="w-full border-t border-gray-800 mb-8"></div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TechTinder. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Designed with ❤️ by Rutik Khandekar
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
