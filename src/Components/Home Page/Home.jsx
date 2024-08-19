import { useState } from "react";
import Cursor from "../Cursor";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Chumma from "./Chumma";

const Home = ({ isLoaderAnimated }) => {
  const [direction, setDirection] = useState("next");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home_page">
      <Cursor
        direction={direction}
        setDirection={setDirection}
        isMenuOpen={isMenuOpen}
      />
      <div className="banner relative w-full h-screen">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Slider
          direction={direction}
          isMenuOpen={isMenuOpen}
          isLoaderAnimated={isLoaderAnimated}
        />
      </div>
      {isLoaderAnimated && <Chumma />}
    </div>
  );
};

export default Home;
