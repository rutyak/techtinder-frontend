import bgImage from "../../assets/TechTinder_bg.jpg";
import CustomSwiper from "./Swiper";
import Footer from "./Footer";
import Header from "./Header";

function Welcome() {
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
      <Header />

      {/* title */}
      <div className="h-[75vh] flex flex-col items-center px-4 pt-45">
        <h1 className="text-4xl md:text-7xl font-extrabold mb-4">
          <span className="text-white">
            Match. Connect. Hired.
          </span>
        </h1>

        <h2 className="text-xl md:text-2xl font-medium text-white max-w-2xl mx-auto">
          Where Tech Talent Meets Perfect Opportunities
        </h2>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-10">
        <CustomSwiper />
        <Footer />
      </div>
    </div>
  );
}

export default Welcome;
