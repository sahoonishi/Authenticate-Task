import React, { useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const PopUp = ({ onClose }) => {
  const user = JSON.parse(localStorage.getItem("users"));
  return (
    <div className="popup-overlay">
      <div className="popup-content flex gap-2">
        {!user ? (
          <button
            onClick={() => {
              alert("Login clicked");
              onClose();
            }}
            className="popup-button text-xl"
          >
            <FaSignInAlt /> login
          </button>
        ) : (
          <button
            onClick={() => {
              alert("Logout clicked");
              onClose();
            }}
            className="popup-button text-xs"
          >
            <FaSignOutAlt /> logout
          </button>
        )}
      </div>
    </div>
  );
};

export default PopUp;
