import React, { useState } from "react";
import MainSection from "./components/MainSection";
import LeftSection from "./components/LeftSection";
import TopSection from "./components/TopSection";
import "./App.css"; // Assuming global styles are here

function App() {
  const [resolution, setResolution] = useState(100); // Default resolution set to 100

  return (
    <div className="app-container">
      <TopSection resolution={resolution} onResolutionChange={setResolution} />
      <div className="content-container">
        <LeftSection />
        <MainSection resolution={resolution} />
      </div>
    </div>
  );
}

export default App;
