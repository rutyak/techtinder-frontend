import { useEffect, useState } from "react";

function Herosection({ isScrollingUp, setIsScrollingUp }) {
  const [isScrollForMenu, setIsScrollForMenu] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const currScrollPos = window.pageYOffset;

      if (currScrollPos > 80) {
        setIsScrollingUp(true);
        setIsScrollForMenu(true);
      } else {
        setIsScrollingUp(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`h-[40vh] md:h-[60vh] lg:h-[90vh] flex flex-col items-center px-4 pt-32 md:pt-45 lg:pt-72 ${
        isScrollingUp ? "disappear-animation" : ""
      }`}
    >
      <h1 className="text-2xl sm:text-4xl md:text-6xl  lg:text-[80px] font-extrabold mb-4">
        <span className="text-white">Match. Connect. Hired.</span>
      </h1>

      <h2 className="text-sm sm:text-md md:text-2xl font-medium text-white max-w-2xl mx-auto">
        Where Tech Talent Meets Perfect Opportunities
      </h2>
    </div>
  );
}

export default Herosection;
