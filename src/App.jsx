import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import WatchList from "./components/WatchList/WatchList";
import Login from "./pages/registration/Login";

const App = () => {
  return (
    
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlistpage" element={<WatchList />} />
          <Route path="/loginpage" element={<Login />} />

        </Routes>
      </BrowserRouter>
    
  );
};

export default App;
