import {
  FacebookIcon,
  InstaIcon,
  TwitterIcon,
  YouTubeIcon,
} from "../../assets/Icons";
import { Link } from "react-router-dom";

function Footer() {
  const linkStyle =
    "text-gray-400 hover:text-white font-sm text-sm sm:font-medium";

  return (
    <footer className="text-gray-300 py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Social Icons */}
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
          <Link to="/" className={linkStyle}>
            About
          </Link>
          <Link to="/" className={linkStyle}>
            Support
          </Link>
          <Link to="/" className={linkStyle}>
            Contact Us
          </Link>
          <Link to="/" className={linkStyle}>
            Privacy Policy
          </Link>
          <Link to="/" className={linkStyle}>
            Terms of Service
          </Link>
        </nav>

        {/* Payment & Subscription Policies for Razorpay */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link to="/subscription-terms" className={linkStyle}>
            Subscription Terms
          </Link>
          <Link to="/refund-policy" className={linkStyle}>
            Refund Policy
          </Link>
          <Link to="/cancellation-policy" className={linkStyle}>
            Cancellation Policy
          </Link>
        </div>

        <div className="w-full border-t border-gray-800 mb-8"></div>

        {/* Razorpay Payment Disclaimer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Payments are securely processed via{" "}
            <a
              href="https://razorpay.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Razorpay
            </a>
            .
          </p>
          <img
            src="https://razorpay.com/assets/razorpay-logo.svg"
            alt="Razorpay Logo"
            className="h-6 mx-auto mt-2"
          />
        </div>

        {/* Copyright */}
        <div className="text-center mt-6">
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
