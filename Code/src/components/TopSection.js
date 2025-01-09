import React, { useState } from "react";
import "./TopSection.css"; // Import CSS file for custom styles

const TopSection = ({ onResolutionChange, onConnectionChange }) => {
  const [percent, setPercent] = useState(10); // Set default percent to 10%

  const handleRangeChange = (e) => {
    const newPercent = e.target.value; // Update the state on range change
    setPercent(newPercent);
    onConnectionChange(newPercent); // Call the onConnectionChange prop to pass the value to the parent
  };

  return (
    <div className="top-section-container">
      <h3>Controls</h3>
      <div className="controls">
        <div className="control-item">
          <label>
            <input type="checkbox" /> Option 1
          </label>
        </div>
        <div className="control-item">
          <label>
            <input type="checkbox" /> Option 2
          </label>
        </div>
        <div className="control-item">
          <select>
            <option>Choose Simulation Type</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
        </div>
        <div className="control-item">
          <label htmlFor="resolution-select">Resolution:</label>
          <select
            id="resolution-select"
            defaultValue="50" // Set default value to 50
            onChange={(e) => onResolutionChange(parseInt(e.target.value, 10))} // Pass the value to parent
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
