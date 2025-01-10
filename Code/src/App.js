import React, { useState } from "react";
import MainSection from "./components/MainSection";
import LeftSection from "./components/LeftSection";
import TopSection from "./components/TopSection";
import BrainVisualization from "./components/BrainVisualization";
import "./App.css";

function App() {
  const [resolution, setResolution] = useState(100); // Default resolution
  const [options, setOptions] = useState({ option1: true, option2: true }); // Default to show both

  return (
    <div className="app-container">
      <TopSection
        onResolutionChange={setResolution}
        resolution={resolution}
        onOptionsChange={setOptions}
      />
      <div className="content-container">
        <LeftSection />
        <BrainVisualization
          resolution={resolution}
          showInputConnections={options.option1}
          showOutputConnections={options.option2}
        />
      </div>
    </div>
  );
}

export default App;
