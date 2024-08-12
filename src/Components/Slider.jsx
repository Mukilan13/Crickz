import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { stories } from "../Data/Slider_data";

const Slider = ({ direction }) => {
  const [activeStory, setActiveStory] = useState(0);
  const progressRef = useRef(null);

  const contentUpdateDelay = 0.4;
  const storyDuration = 5000;

  useEffect(() => {
    const storyInterval = setInterval(() => {
      changeStory();
    }, storyDuration);

    return () => clearInterval(storyInterval);
  }, [activeStory]);

  useEffect(() => {
    if (progressRef.current) {
      animateIndexHighlight(progressRef.current);
    }
  }, [activeStory]);

  useEffect(() => {
    const animateContent = () => {
      gsap.to(".profile-name p", {
        y: 0,
        duration: 0.5,
        delay: contentUpdateDelay,
      });

      gsap.to(".title-row h1", {
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: contentUpdateDelay,
      });
    };

    animateContent();

    return () => gsap.killTweensOf(".profile-name p, .title-row h1");
  }, [activeStory]);

  /* The functions changeStory and changeStoryOnClick share a lot of similar logic. 
  Consider refactoring the common logic into a separate function to adhere to the DRY (Don't Repeat Yourself) principle */
  const handleStoryChange = (newStory) => {
    setActiveStory(newStory);
    resetIndexHightlight(progressRef.current);
  };

  const changeStory = () => {
    handleStoryChange((prevStory) => (prevStory + 1) % stories.length);
  };

  const changeStoryOnClick = () => {
    direction === "next"
      ? handleStoryChange((prevStory) => (prevStory + 1) % stories.length)
      : handleStoryChange(
          (prevStory) => (prevStory - 1 + stories.length) % stories.length
        );
  };

  const animateIndexHighlight = (index) => {
    gsap.set(index, {
      width: "0%",
      scaleX: 1,
      transformOrigin: "right center",
    });

    gsap.to(index, {
      width: "100%",
      duration: storyDuration / 1000,
      ease: "none",
    });
  };

  const resetIndexHightlight = (index) => {
    gsap.killTweensOf(index);
    gsap.to(index, {
      width: direction === "next" ? "100%" : "0%",
      duration: 0.3,
      onStart: () => {
        gsap.to(index, {
          transformOrigin: "right center",
          scaleX: 0,
          duration: 0.3,
        });
      },
    });
  };

  return (
    <>
      <div
        className="story-img absolute top-0 left-0 w-full h-full opacity-50"
        onClick={changeStoryOnClick}
      >
        {stories.map((story, index) => (
          <div
            key={index}
            className={`img absolute top-0 left-0 w-full h-full overflow-hidden ${
              story.id === activeStory ? "block" : "hidden"
            }`}
          >
            <img
              src={story.storyImg}
              alt={story.profileName}
              className="object-cover h-full w-full"
            />
          </div>
        ))}
      </div>

      <div
        onClick={changeStoryOnClick}
        className="story-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-20 lg:px-0 px-8 lg:w-[30%] w-full h-full flex flex-col justify-between"
      >
        <div className="row">
          <div className="indices w-full h-[10px] flex items-center justify-between gap-1">
            {stories.map((story, index) => (
              <div
                key={index}
                className="index relative w-full h-[1px] bg-[rgba(255,255,255,0.25)]"
              >
                <div
                  ref={index === activeStory ? progressRef : null}
                  className="index-highlight absolute top-0 left-0 w-0 h-full scale-[100%] bg-white"
                ></div>
              </div>
            ))}
          </div>

          {stories.map(
            (story, index) =>
              index === activeStory && (
                <div
                  key={index}
                  className="profile w-full h-[60px] flex items-center gap-4"
                >
                  <div className="profile-icon relative w-10 rounded-full overflow-hidden">
                    <img src={story.profileImg} alt={story.profileName} />
                  </div>
                  <div className="profile-name relative w-[200px] h-[20px] clip-path">
                    <p
                      className={`${
                        direction === "next"
                          ? "translate-y-6"
                          : "-translate-y-6"
                      }`}
                    >
                      {story.profileName}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>

        {stories.map(
          (story, index) =>
            index === activeStory && (
              <div key={index} className="row">
                <div className="title">
                  {story.titles.map((title, i) => (
                    <div
                      key={i}
                      className="title-row relative w-full h-10 text-3xl clip-path"
                    >
                      <h1
                        className={`${
                          direction === "next"
                            ? "translate-y-10"
                            : "-translate-y-10"
                        }`}
                      >
                        {title}
                      </h1>
                    </div>
                  ))}
                </div>

                <div className="relative inline-block">
                  <a href={story.linkSrc} target="_blank" className="link">
                    {story.linkLabel}
                  </a>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Slider;
