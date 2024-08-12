import React, { useEffect, useRef, useState } from "react";
import { MenuLinks, BottomMenus } from "../Data/Menu_data";
import Logo from "../assets/Logo.png";
import IndiaLogo from "../assets/India-Logo.png";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

const Menu = ({ activeMenu, changeActiveLink, toggleMenu, isMenuOpen }) => {
  const videoRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const menuTopLeftSection = document.querySelector(".menu-top-left-section");

  useEffect(() => {
    if (isMenuOpen && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }

    if (
      menuTopLeftSection &&
      window.getComputedStyle(menuTopLeftSection).display === "none"
    ) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isMenuOpen, activeMenu]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted, activeMenu]);

  const toggleVideoSound = () => {
    setIsVideoMuted((prevMuted) => !prevMuted);
  };

  return (
    <div className="container w-full h-full">
      <div className="menu-container fixed top-1/2 right-[-100%] z-10 translate-y-[-50%] w-[100%] h-full flex items-center justify-center opacity-50 menu-transition">
        <div className="menu w-full h-full bg-black menu-border-radius flex overflow-hidden">
          <div className="menu-main flex-[5] flex flex-col justify-between menu-border-r">
            <div className="menu-top flex">
              <div className="menu-top-left-section flex-[1.1] lg:flex flex-col gap-8 hidden p-8 menu-border-r">
                <p>Discover</p>
                <div className="video-section w-full h-fit flex flex-col gap-[14px]">
                  {MenuLinks.map(
                    (link, index) =>
                      link.id === activeMenu && (
                        <video
                          key={index}
                          className="rounded-md"
                          ref={videoRef}
                          src={link.menuVideo}
                          autoPlay
                          loop
                          preload="auto"
                        ></video>
                      )
                  )}
                  <div className="bottom flex items-center justify-between px-1">
                    <p className="text-[14px] !text-gray-400">Credit @ ICC</p>
                    <div
                      className="sound bg-gray-400 rounded-full px-3 mb-[2px]"
                      onClick={toggleVideoSound}
                    >
                      {isVideoMuted ? (
                        <VolumeOffRoundedIcon className="!text-[20px]" />
                      ) : (
                        <VolumeUpRoundedIcon className="!text-[20px]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="menu-top-content sm:py-7 py-4 flex-[4] flex flex-col">
                {MenuLinks.map((link, i) => (
                  <div
                    className={`menu-item relative left-[-100px] flex items-center justify-between py-2 sm:mx-7 mx-4 menu-item-transition ${
                      link.id === activeMenu ? "bg-hover bg-white" : ""
                    }`}
                    id={`${link.id === activeMenu ? "active" : ""}`}
                    onClick={() => changeActiveLink(link.id)}
                    key={i}
                  >
                    <div className="menu-item-link relative py-3">
                      <a
                        href="#"
                        className="relative lg:text-[85px] md:text-7xl sm:text-6xl text-5xl font-medium pl-3 lg:cursor-none cursor-pointer"
                      >
                        {link.menuName}
                      </a>
                    </div>

                    <div
                      className={`india-logo mr-8 ${
                        link.id === activeMenu ? "block active" : "hidden"
                      }`}
                    >
                      <img
                        src={IndiaLogo}
                        alt="Indian Cricket Team Logo"
                        className="lg:w-[75px] w-[60px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="menu-bottom flex flex-col text-white">
              {BottomMenus.map((menu, i) => (
                <div
                  className="menu-sub-item w-full flex gap-4 items-center menu-border-t sm:py-4 py-3 sm:px-8 px-3"
                  key={i}
                >
                  <div className="menu-title flex-1">
                    <p>{menu.menuTitle}</p>
                  </div>
                  <div className="menu-content flex-[4] sm:pl-8 pl-2">
                    <p className="relative w-max p-[0.125rem]">
                      {menu.menuContent}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-sidebar flex-[0.2] flex flex-col justify-between items-center text-white">
            <div
              className="close-button text-2xl sm:p-6 p-4 lg:cursor-none cursor-pointer"
              onClick={toggleMenu}
            >
              <CloseSharpIcon />
            </div>
            <div className="logo sm:p-4 p-2">
              <img src={Logo} alt="logo" className="w-[50px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
