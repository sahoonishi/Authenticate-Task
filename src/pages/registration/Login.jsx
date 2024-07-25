import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";

const Login = () => {
  const { login } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const watchList = [];
  const handlelogin = () => {
    if (!userEmail) {
      toast.error("Please enter email");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("alwaysData")) ?? [];
    if (userData.length > 0) {
      const user = userData.some((u) => u.userEmail === userEmail);

      if (user) {
        toast.success("Login Successful");
        login(userEmail);
        navigate("/");
      } else {
        userData.push({ userEmail, watchList });
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("alwaysData", JSON.stringify(userData));
        toast.success("Login Successful");
        login(userEmail);
        navigate("/");
        return;
      }
    } else {
      userData.push({ userEmail, watchList });
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("alwaysData", JSON.stringify(userData));
      toast.success("Login Successful");
      login(userEmail);
      navigate("/");
    }
  };

  return (
    <div className="w-full m-4 p-9 min-h-screen flex justify-center items-center">
      <div className="login_Form border-black rounded-xl shadow-2xl w-full max-w-md px-4 lg:px-8 py-6">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-blue-500 ">
            Login
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3 flex justify-center">
          <input
            type="email"
            name="email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            placeholder="Email Address"
            className="bg-gray-50 border w-full max-w-sm px-2 py-2 rounded-md outline-none placeholder-gray-600"
          />
        </div>

        <div className="mb-5 flex justify-center">
          <button
            onClick={handlelogin}
            type="button"
            className="bg-gradient-to-r from-blue-900 to-blue-300 w-full max-w-sm px-2 text-white text-center py-2 font-bold rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
