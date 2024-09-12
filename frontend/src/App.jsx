import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Cart from "./Pages/Cart/Cart";
import Placeorder from "./Pages/Placeorder/Placeorder";
import Home from "./Pages/Home/Home";
import Logout from "./Component/Logout/logout";
import Login from "./Component/Login/Login";

const App = () => {
  const location = useLocation();
  let value = false;
  if (document.cookie){
    value = true;
  }
  // console.log(isAuthenticated);
  
  const shouldShowNavbar = location.pathname !== "/" && location.pathname !== "/logout";

  return (
    <>
      <div className="app">
        {shouldShowNavbar && <Navbar />} 
        <Routes>
          <Route path="*" element={ value ?  <Home /> : <Login />} />
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={ value ?  <Home /> : <Login />} />
          <Route path="/cart" element={ value ?  <Cart /> : <Login />} />
          <Route path="/order" element={ value ?  <Placeorder /> : <Login />} />
          <Route path="/logout" element={ value ?  <Logout /> : <Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
