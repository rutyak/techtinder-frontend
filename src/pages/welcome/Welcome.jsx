import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/TechTinder_bg.jpg";
import Reviews from "./Reviews";
import Footer from "./Footer";
import WelcomHeader from "./WelcomHeader";
import Herosection from "./Herosection";

function Welcome() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log("document cookie: ", document.cookie);

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {});

      console.log("cookies object:", cookies);

      const token = cookies["jwtToken"];
      console.log("token in welcome:", token);

      if (token) {
        navigate("/dashboard");
      }
    };

    checkAuth();
  }, [navigate]);

  const backgroundStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
  };

  return (
    <div className="relative" style={backgroundStyles}>
      <WelcomHeader
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />

      <Herosection
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />

      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 py-10">
        <Reviews />
        <Footer />
      </div>
    </div>
  );
}

export default Welcome;
