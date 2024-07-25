import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import WatchList from "./components/WatchList/WatchList";
import Login from "./pages/registration/Login";
import  Context  from "./Context/Context";
import ProductInfo from "./pages/ProductInfo/ProductInfo";

const App = () => {

  
  return (
    <Context>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlistpage" element={<WatchList />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
};

export default App;
