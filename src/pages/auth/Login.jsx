import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

function Login() {
  const [loginSignupToggle, setLoginSignupToggle] = useState(false);

  function handleSubmit() {
    console.log("handle submit clicked...");
  }

  return (
    <div className="flex flex-col gap-7 items-center border bg-white p-6 rounded-lg max-w-[370px] m-auto">
      <div className="text-xl md:text-2xl font-bold">Welcome Back 👋</div>
      <div className="w-full flex items-center justify-center gap-2">
        <button
          className={`border border-gray-400 text-sm w-full py-1 px-4 sm:text-lg rounded-lg  ${
            loginSignupToggle === "login"
              ? "bg-blue-700 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setLoginSignupToggle("login")}
        >
          Login
        </button>
        <button
          text="Signup"
          className={`border border-gray-400 text-sm w-full py-1 px-4 sm:text-lg rounded-lg  bg-blue-700 ${
            loginSignupToggle === "signup"
              ? "bg-blue-700 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setLoginSignupToggle("signup")}
        >
          Signup
        </button>
      </div>
      {true && (
        <div className="w-full flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {loginSignupToggle === "login" && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-2 rounded-lg border border-gray-4 00"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full p-2 rounded-lg border border-gray-4 00"
                  required
                />
                <div className="text-sm text-left text-blue-500 mt-1 ml-[3px]">
                  Forget Password?
                </div>
              </>
            )}
            
            <button className="text-sm py-1.5 w-full sm:text-lg rounded-lg text-white bg-blue-700">
              Login
            </button>
          </form>
          <div className="text-sx md:text-sm text-center mt-1">
            Not a member? <span className="text-blue-500">Signup now</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
