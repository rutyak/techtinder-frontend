import {
  FacebookIcon,
  InstaIcon,
  TwitterIcon,
  YouTubeIcon,
} from "../../assets/Icons";
import { Link } from "react-router-dom";

function Footer() {
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
          <Link
            to="/"
            className="text-gray-400 hover:text-white font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-400 hover:text-white font-medium"
          >
            About
          </Link>
          <Link
            to="/support"
            className="text-gray-400 hover:text-white font-medium"
          >
            Support
          </Link>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-white font-medium"
          >
            Contact Us
          </Link>
          <Link
            to="/privacy"
            className="text-gray-400 hover:text-white  font-medium"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-gray-400 hover:text-white  font-medium"
          >
            Terms of Service
          </Link>
        </nav>

        {/* Divider */}
        <div className="w-full border-t border-gray-800 mb-8"></div>

        {/* Copyright */}
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
