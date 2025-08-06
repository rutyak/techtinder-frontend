import bgImage from "../../assets/TechTinder_bg.jpg";
import Reviews from "./Reviews";
import Footer from "./Footer";
import WelcomHeader from "./WelcomHeader";
import Herosection from "./Herosection";
import { useState } from "react";
import { useSelector } from "react-redux";

function Welcome() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  
  const userData = useSelector((state) => state.users?.users);

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <WelcomHeader
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />

      {/* title */}
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
