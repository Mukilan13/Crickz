import { useState, useEffect } from "react";
import "./App.css";
import Cursor from "./Components/Cursor";
import Navbar from "./Components/Navbar";
import Slider from "./Components/Slider";

function App() {
  const [direction, setDirection] = useState("next");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app w-full h-full overflow-hidden">
      <Cursor
        direction={direction}
        setDirection={setDirection}
        isMenuOpen={isMenuOpen}
      />
      <div className="banner w-full h-screen">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Slider direction={direction} isMenuOpen={isMenuOpen} />
      </div>
    </div>
  );
}

export default App;
