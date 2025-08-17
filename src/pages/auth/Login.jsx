import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Login() {
  const [authView, setAuthView] = useState("login"); // login | signup | forgotEmail | resetPassword
  const [loginToggle, setLoginToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const modelRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let token = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("token="))
      ?.split("=")[1];
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (!loginToggle) return;

    const handleClickOutside = (e) => {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setLoginToggle(false);
      }
    };
    const handleEscapeKey = (e) => e.key === "Escape" && setLoginToggle(false);
    const handleScroll = () => setLoginToggle(false);

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
      if (authView === "login" || authView === "signup") {
        const endpoint = authView === "login" ? "login" : "signup";
        const res = await axios.post(`${base_url}/${endpoint}`, formData, {
          withCredentials: true,
        });

        if (!toast.isActive("authToast")) {
          toast.success(res.data?.message, { toastId: "authToast" });
        }


        if (res.data?.user) {
          dispatch(addUser(res.data?.user));
        }

        setLoginToggle(false);
        if (res.status === 200) {
          navigate(authView === "login" ? "/dashboard" : "/");
        }
        setFormData({});
      } else if (authView === "forgotEmail") {
        // Step 1: Verify email
        const res = await axios.post(`${base_url}/forgot-password`, {
          email: formData.email,
        });
        toast.success(res.data?.message);
        setAuthView("resetPassword");
      } else if (authView === "resetPassword") {
        // Step 2: Reset password
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        const res = await axios.patch(`${base_url}/reset-password`, {
          email: formData.email,
          password: formData.password,
        });
        toast.success(res.data?.message);
        setAuthView("login");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      console.error(error);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="rounded-full py-1 px-3 md:py-2 md:px-6 text-md md:text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
        onClick={() => setLoginToggle(!loginToggle)}
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
              {authView === "login" && "Welcome Back 👋"}
              {authView === "signup" && "Connect with us 🤝"}
              {authView === "forgotEmail" && "Forgot Password 🔑"}
              {authView === "resetPassword" && "Set New Password 🔒"}
            </h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded-md text-center">
                {error}
              </div>
            )}

            {(authView === "login" ||
              authView === "signup" ||
              authView === "forgotEmail" ||
              authView === "resetPassword") && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {authView === "login" && (
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
                    <div
                      className="text-sm text-blue-500 text-right mt-1 cursor-pointer"
                      onClick={() => {
                        setAuthView("forgotEmail");
                        setError("");
                      }}
                    >
                      Forget Password?
                    </div>
                  </>
                )}

                {authView === "signup" && (
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

                {authView === "forgotEmail" && (
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-2 rounded-lg border border-gray-400"
                    onChange={handleChanges}
                    required
                  />
                )}

                {authView === "resetPassword" && (
                  <>
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      className="w-full p-2 rounded-lg border border-gray-400"
                      onChange={handleChanges}
                      required
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
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
                    : authView === "login"
                    ? "Login"
                    : authView === "signup"
                    ? "Signup"
                    : authView === "forgotEmail"
                    ? "Verify Email"
                    : "Update Password"}
                </button>
              </form>
            )}

            {(authView === "login" || authView === "signup") && (
              <div className="text-sm text-center mt-3 cursor-default">
                {authView === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <span
                      className="text-blue-600 cursor-pointer hover:underline"
                      onClick={() => setAuthView("signup")}
                    >
                      Signup
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      className="text-blue-500 cursor-pointer hover:underline"
                      onClick={() => setAuthView("login")}
                    >
                      Login
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
