import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Login() {
  const [loginSignupToggle, setLoginSignupToggle] = useState("login");
  const [loginToggle, setLoginToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const modelRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let userExists = document.cookie;
    if (userExists) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (!loginToggle) return;

    const handleClickOutside = (e) => {
      e.stopPropagation();
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setLoginToggle(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setLoginToggle(false);
      }
    };

    const handleScroll = () => {
      setLoginToggle(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [loginToggle]);

  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const endpoint = loginSignupToggle === "login" ? "login" : "signup";
      const res = await axios.post(`${base_url}/${endpoint}`, formData, {
        withCredentials: true,
      });

      toast.success(res.data?.message);

      if (res.data?.user) {
        dispatch(addUser(res.data?.user));
      }

      setLoginToggle(false);
      navigate(loginSignupToggle === "login" ? "/dashboard" : "/");
      setFormData({});
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="rounded-full py-1 px-3 md:py-2 md:px-6 text-md md:text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
        onClick={(e) => setLoginToggle(!loginToggle)}
      >
        Login
      </button>

      {loginToggle && (
        <div className="fixed inset-0 z-30 flex items-center justify-center min-h-screen p-4 bg-gray-900/70">
          <div
            ref={modelRef}
            className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
              {loginSignupToggle === "login"
                ? "Welcome Back 👋"
                : "Connect with us 🤝"}
            </h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded-md text-center">
                {error}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                className={`w-1/2 py-2 rounded-lg font-medium transition-all duration-200 ${
                  loginSignupToggle === "login"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setLoginSignupToggle("login");
                  setError("");
                }}
              >
                Login
              </button>
              <button
                className={`w-1/2 py-2 rounded-lg font-medium transition-all duration-200 ${
                  loginSignupToggle === "signup"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setLoginSignupToggle("signup");
                  setError("");
                }}
              >
                Signup
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {loginSignupToggle === "login" ? (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <div className="text-sm text-blue-500 text-right mt-1">
                    Forget Password?
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Enter first name"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Enter last name"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChanges}
                    required
                  />
                </>
              )}
              <button
                type="submit"
                className="w-full py-2 text-white rounded-lg font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-400"
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : loginSignupToggle.charAt(0).toUpperCase() +
                    loginSignupToggle.slice(1)}
              </button>
            </form>

            <div className="text-sm text-center mt-3 cursor-default">
              {loginSignupToggle === "login" ? (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => {
                      setLoginSignupToggle("signup");
                      setError("");
                    }}
                  >
                    Signup
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={() => {
                      setLoginSignupToggle("login");
                      setError("");
                    }}
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