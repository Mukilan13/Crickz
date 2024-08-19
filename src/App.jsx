import { useState } from "react";
import "./App.css";
import Home from "./Components/Home Page/Home";
import Loader from "./Components/Loader";

function App() {
  const [isLoaderAnimated, setIsLoaderAnimated] = useState(false);

  return (
    <>
      <Loader
        isLoaderAnimated={isLoaderAnimated}
        setIsLoaderAnimated={setIsLoaderAnimated}
      />
      <div className="app w-full h-full overflow-hidden">
        <Home isLoaderAnimated={isLoaderAnimated} />
      </div>
    </>
  );
}

export default App;