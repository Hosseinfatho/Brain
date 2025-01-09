import React from "react";
import BrainVisualization from "./BrainVisualization";

const MainSection = ({ resolution }) => {
  return (
    <div className="main-section-container">
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Brain Simulation</h3>
      {/* Pass the resolution prop to BrainVisualization */}
      <BrainVisualization resolution={resolution} />
    </div>
  );
};

export default MainSection;
