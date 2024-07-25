import React from "react";
import { IoHome } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {


  // GETTING DATA FROM LOCAL STORAGE 


  const currentUser = localStorage.getItem("currentUser");


  // CLEARING DATA FROM LOCAL STORAGE WHEN USER LOGOUTS



  const handleLogout = () => {
    localStorage.removeItem("searchItems");
    localStorage.removeItem("userData");
    localStorage.removeItem("currentUserData");
    localStorage.removeItem("currentUser");
    navigate("/loginpage");
  };
  const navigate = useNavigate();

  return (
    <div className="w-2/6 sm:w-1/5   border border-gray-400 max-h-screen sticky top-0 left-0">
      <h2 className="text-center text-xl sm:text-2xl text-blue-500 font-bold mt-5">
        WatchLists
      </h2>
      <div className="mt-2 flex flex-wrap justify-start sm:justify-between flex-col h-[500px]    items-center  ">
        <ul className=" w-full flex flex-col mx-auto gap-5 p-2">
          <li
            onClick={() => navigate("/")}
            className="flex justify-start gap-1 sm:justify-start items-center sm:gap-4 text-xs md:text-lg 
            
              bg-blue-500 text-white
              w-full rounded-md sm:p-2 p-3 mb-2 cursor-pointer hover:scale-95 transition-all"
          >
            <IoHome className="" />
            <span>Home</span>
          </li>
          <li className=" under" />
          <li
            onClick={() => navigate("/watchlistpage")}
            className="flex justify-center sm:justify-start items-center gap-4 text-xs md:text-lg 
               bg-blue-500 text-white
              w-full rounded-md sm:p-2 px-6 py-2 mb-2 cursor-pointer hover:scale-95 transition-all"
          >
            MyList
          </li>
        </ul>
        <div className="w-full flex flex-col mx-auto gap-5 p-2">
          {currentUser ? (
            <Link
              to="/loginpage"
              onClick={handleLogout}
              className="flex justify-center sm:justify-center items-center gap-4 text-xs md:text-lg  bg-gray-700 text-white   w-full rounded-md sm:p-2 p-3 hover:scale-95 transition-all"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/loginpage"
              className="flex justify-center sm:justify-center items-center gap-4 text-xs md:text-lg  bg-blue-500 text-white   w-full rounded-md sm:p-2 p-3 hover:scale-95 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
