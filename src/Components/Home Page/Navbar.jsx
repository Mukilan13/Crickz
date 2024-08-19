import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import gsap from "gsap";
import Menu from "./Menu";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [activeMenu, setActiveMenu] = useState(0);

  const changeActiveLink = (activeMenuId) => {
    setActiveMenu(activeMenuId);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      gsap.to(".menu-container", {
        right: "-100%",
        duration: 0.2,
        opacity: 0.5,
      });

      gsap.to(".menu-item", {
        left: -100,
        duration: 0.1,
        delay: 0.1,
        stagger: 0.1,
      });
    } else {
      gsap.to(".menu-container", {
        right: "0%",
        duration: 0.2,
        opacity: 1,
      });

      gsap.to(".menu-item", {
        left: 0,
        duration: 0.1,
        delay: 0.2,
        stagger: 0.1,
      });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="absolute top-0 z-10 w-full flex items-center justify-between py-5 sm:px-10 px-4">
        <div className="logo flex items-center justify-center gap-4">
          <img src={Logo} alt="logo" className="w-[50px]" />
          <h1 className="text-2xl flex items-center gap-1">
            Crickz <span className="mt-[10px]">&bull;</span>
          </h1>
        </div>
        <div className="menu-toggle lg:cursor-none cursor-pointer" onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </header>

      <Menu
        activeMenu={activeMenu}
        changeActiveLink={changeActiveLink}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
    </>
  );
};

export default Navbar;
