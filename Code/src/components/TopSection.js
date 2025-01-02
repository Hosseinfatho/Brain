import React from "react";

const TopSection = () => {
  return (
    <div className="top-section-container">
      <h3>Controls</h3>
      <div className="controls">
        <div>
          <label>
            <input type="checkbox" /> Option 1
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" /> Option 2
          </label>
        </div>
        <div>
          <select>
            <option>Choose Simulation Type</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
        </div>
        <div>
          <input type="range" min="0" max="100" />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
