import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin=()=>{
    if(userLogin.email === "" || userLogin.password ===""){
      toast.error('Please fill all fields');
      return;
    }
    localStorage.setItem("user" , JSON.stringify(userLogin));
    setuserLogin({
      email: "",
      password: "",
    })
    toast.success('Logged In Successfully');
    navigate("/");


  }

  return (
    <div className="w-full m-4 p-9 h-screen flex justify-center items-center">
      {/* <div className='w-full flex justify-center gap-5'>
        <div>
            <img className='' src="/svg-image-32.jpg" alt="" />
        </div>
        <div className='login w-96 border h-72 flex flex-col items-center rounded-lg'>
                         <h1 className='text-blue-500 font-bold  mt-9 mb-5 px-2 py-1 text-2xl rounded-lg'>Login</h1>
            <div className='w-full flex justify-center'><input className='outline-none border mt-2 px-6 py-2 rounded-md' type="text" placeholder='Enter Email' /></div>
            <div className='w-full flex justify-center'><input className='outline-none border mt-2 px-6 py-2 rounded-md' type="text" placeholder='Enter password'/></div>
            <div className='mt-3 w-full flex justify-center'>
              <button className='w-full  outline-none border mt-2 px-6 py-2 rounded-md'>LOGIN</button>
            </div>
        </div>
      </div> */}
      <div className="login_Form border-black rounded-xl shadow-2xl w-72 lg:w-fit px-1 lg:px-8 py-6">
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
            value={userLogin.email}
            onChange={(e) => {
              setuserLogin({
                ...userLogin,
                email: e.target.value,
              });
            }}
            placeholder="Email Address"
            className="bg-gray-50 border   w-60 px-2 py-2 lg:w-96 rounded-md outline-none placeholder-gray-600"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-5 m-5  flex justify-center">
          <input
            type="password"
            name="password"
            value={userLogin.password}
            onChange={(e)=>{
              setuserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            placeholder="Password"
            className="bg-gray-50 border   w-60  px-2 py-2 lg:w-96 rounded-md outline-none placeholder-gray-600"
          />
        </div>

        
        <div className="mb-5 flex justify-center m-5">
          <button
          onClick={handleLogin}
            type="button"
            className="bg-gradient-to-r from-blue-900 to-blue-300   w-60  px-2 lg:w-96 text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
