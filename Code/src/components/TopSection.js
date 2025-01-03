import React from "react";
import "./TopSection.css"; // Import CSS file for custom styles

const TopSection = ({ onResolutionChange }) => {
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
          <input type="range" min="0" max="100" />
        </div>
        <div className="control-item">
          <label htmlFor="resolution-select">Resolution:</label>
          <select
            id="resolution-select"
            defaultValue="10" // Set default value to 10
            onChange={(e) => onResolutionChange(parseInt(e.target.value, 10))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
