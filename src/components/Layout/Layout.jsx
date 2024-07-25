import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="main content h-screen w-4/5 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
