import React, { useEffect } from "react";
import logo from "../assets/Logo.png";
import gsap from "gsap";

const Loader = ({ isLoaderAnimated, setIsLoaderAnimated }) => {
  useEffect(() => {
    gsap.to(".loader .logo img", {
      x: 0,
      duration: 0.5,
      delay: 0.3,
    });

    gsap.to(".loader .logo h1", {
      x: 0,
      duration: 0.5,
      delay: 0.8,
      opacity: 1,
    });

    gsap.to(".loader .logo", {
      opacity: 0,
      duration: 0.5,
      delay: 2,
    });

    gsap.to(".loader", {
      height: 0,
      duration: 0.3,
      delay: 2.5,
      onComplete: () => {
        setIsLoaderAnimated(true);
      },
    });
  }, []);
  return (
    <div
      className={`loader absolute top-0 left-0 z-40 bg-black w-screen h-screen ${
        isLoaderAnimated ? "hidden" : "flex"
      } items-center justify-center`}
    >
      <div className="logo relative px-14 py-4 flex items-center justify-center gap-4">
        <img
          src={logo}
          alt=""
          className="absolute -left-4 z-40 w-[60px] translate-x-[180px]"
        />
        <h1 className="text-4xl opacity-0 -translate-x-[80px]">Crickz.</h1>
      </div>
    </div>
  );
};

export default Loader;
