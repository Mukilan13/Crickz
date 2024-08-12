import React, { useEffect, useState } from "react";
import gsap from "gsap";

const Cursor = ({ direction, setDirection, isMenuOpen }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [insideStoryImg, setInsideStoryImg] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Check if the cursor is inside the story-img div
      const storyImg = document.querySelector(".story-img");
      if (storyImg) {
        const rect = storyImg.getBoundingClientRect();
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          setInsideStoryImg(true);
        } else {
          setInsideStoryImg(false);
        }
      } else {
        setInsideStoryImg(false);
      }

      // Update cursor position
      gsap.to(".cursor", {
        x: clientX - 6,
        y: clientY - 6,
        duration: 0.3,
        ease: "power2.out",
      });

      setPosition({ x: clientX, y: clientY });

      // Update direction
      setDirection(clientX < window.innerWidth / 2 ? "prev" : "next");

      const tooltip = document.querySelector(".tooltip");
      if (tooltip) {
        gsap.to(".tooltip", {
          y: direction === "next" ? -24 : 24,
          duration: 0.3,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setDirection, direction]);

  return (
    <div className="cursor w-[15px] h-[15px] rounded-full bg-cursor fixed top-0 left-0 z-30 pointer-events-none lg:block hidden">
      {insideStoryImg && !isMenuOpen && (
        <p className="tooltip absolute left-[20px] bottom-[-4px] px-2 rounded-xl bg-[rgba(255,255,255,0.5)] !text-black overflow-hidden">
          {direction === "next" ? "Next" : "Prev"}
        </p>
      )}
    </div>
  );
};

export default Cursor;
