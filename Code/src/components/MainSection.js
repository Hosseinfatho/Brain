import React from "react";
import BrainVisualization from "./BrainVisualization";

const MainSection = ({ resolution }) => {
  return (
    <div className="main-section-container">
      <h3 style={{ textAlign: "center" }}>Brain Simulation</h3>
      <BrainVisualization resolution={resolution} />
    </div>
  );
};

export default MainSection;
