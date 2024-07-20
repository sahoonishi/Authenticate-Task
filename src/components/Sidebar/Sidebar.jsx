import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import MyList from "../MyList/MyList";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "../Popup/PopUp";

const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className=" w-1/5   border border-gray-400 max-h-screen sticky top-0 left-0">
      <h2 className="text-center text-2xl text-blue-500  font-bold mt-5">
        WatchLists
      </h2>
      <div className="mt-2 flex flex-wrap justify-between flex-col h-[500px]    items-center  ">
        <ul className="text-xl w-full flex flex-col  gap-5 p-5">
          <li
            onClick={() => navigate("/")}
            className=" flex  items-center gap-2 bg-blue-500 text-white w-full rounded-full p-2  mb-2"
          >
            <IoHome />
            Home
          </li>
          <li className=" under" />
          {/* <li className=' text-black w-full rounded-full mt-2 px-5 mb-2 font-semibold'>MyLists</li> */}
          <MyList />
        </ul>
        <div className="flex w-full justify-evenly">
          {user ? (
            <Link to="/loginpage" className="font-serif bg-gray-700 text-white rounded-lg shadow-2xl outline-none p-2">
              Logout
            </Link>
          ) : (
            <Link
              to="/loginpage"
              className="font-serif bg-blue-500 text-white rounded-lg outline-none p-2"
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
