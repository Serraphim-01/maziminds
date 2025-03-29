import React from "react";
import "../styles/SplashScreen.css";
import logo from "../assets/png/logo.png";

const SplashScreen = () => {
  return (
    <div className="splash-container fixed w-screen h-screen flex flex-col items-center justify-center text-[var(--white)] text-center p-5 z-[9999]">
      <div className="splash-logo">
        <img className="w-[150px] h-[150px] lg:w-[120px] lg:h-[120px] sm:w-[100px] sm:h-[100px]" src={logo} alt="Logo" />
      </div>
      <h1 className=" text-4xl lg:text-3xl mt-2.5 sm:text-2xl font-bold">Maziminds</h1>
      <p className="text-xl lg:text-base sm:text-sm opacity-80 mt-1">Loading your adventure...</p>
    </div>
  );
};

export default SplashScreen;