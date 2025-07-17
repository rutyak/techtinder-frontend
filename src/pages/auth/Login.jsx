import axios from "axios";
import { useState } from "react";
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

console.log("base url: ", base_url);
function Login() {
  const [loginSignupToggle, setLoginSignupToggle] = useState("login");
  const [loginToggle, setLoginToggle] = useState(false);
  const [formData, setFormData] = useState();

  function handleChages(e) {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formData: ", formData);
    console.log("handle submit clicked...");

    try {
      if (loginSignupToggle === "login") {
        const res = await axios.post(`${base_url}/login`, formData);
        console.log("res: ", res.message);
      } else {
        const res = await axios.post(`${base_url}/signup`, formData);
        console.log("res: ", res.message);
      }
      setLoginSignupToggle(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button
        className="rounded-full z-40 py-1 px-3 md:py-2 md:px-6 text-md md:text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
        onClick={() => setLoginToggle((prev) => !prev)}
      >
        Login
      </button>
      {loginToggle && (
        <div className="fixed z-30 inset-0 min-h-screen flex items-center justify-center bg-grssy-100 p-4">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
              {loginSignupToggle === "login"
                ? "Welcome Back 👋"
                : "Connect with us 🤝"}
            </h2>

            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                className={`w-1/2 py-2 rounded-lg font-medium transition-all duration-200  ${
                  loginSignupToggle === "login"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => setLoginSignupToggle("login")}
              >
                Login
              </button>
              <button
                text="Signup"
                className={`w-1/2 py-2 rounded-lg font-medium transition-all duration-200 ${
                  loginSignupToggle === "signup"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => setLoginSignupToggle("signup")}
              >
                Signup
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {loginSignupToggle === "login" && (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-2 rounded-lg border border-gray-4 00"
                    onChange={handleChages}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full p-2 rounded-lg border border-gray-4 00"
                    onChange={handleChages}
                    required
                  />
                  <div className="text-sm text-blue-500 text-right mt-1 ml-[3px]">
                    Forget Password?
                  </div>
                </>
              )}

              {loginSignupToggle === "signup" && (
                <>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Enter first name"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChages}
                    required
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Enter last name"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChages}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChages}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChages}
                    required
                  />
                </>
              )}

              <button className="w-full py-2 text-white rounded-lg font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                {loginSignupToggle.charAt(0).toUpperCase() +
                  loginSignupToggle.slice(1)}
              </button>
            </form>
            <div className="text-sm text-center mt-3 cursor-default">
              {loginSignupToggle === "login" ? (
                <>
                  {" "}
                  Already have account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setLoginSignupToggle("signup")}
                  >
                    Signup
                  </span>
                </>
              ) : (
                <>
                  Don't have account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={() => setLoginSignupToggle("login")}
                  >
                    Login
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
