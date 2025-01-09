import React, { useState } from "react";
import "./TopSection.css"; // Import CSS file for custom styles

const TopSection = ({ onResolutionChange, onPercentChange }) => {
  const [percent, setPercent] = useState(10); // Default percent to 10%

  // Handle changes in the range slider
  const handleRangeChange = (e) => {
    const newPercent = parseInt(e.target.value, 10); // Convert value to integer
    setPercent(newPercent); // Update percent state
    if (onPercentChange) {
      onPercentChange(newPercent); // Notify parent component of percent change
    }
  };

  return (
    <div className="top-section-container">
      <h3>Controls</h3>
      <div className="controls">
        {/* Control Option 1 */}
        <div className="control-item">
          <label>
            <input type="checkbox" /> Option 1
          </label>
        </div>

        {/* Control Option 2 */}
        <div className="control-item">
          <label>
            <input type="checkbox" /> Option 2
          </label>
        </div>

        {/* Simulation Type Selection */}
        <div className="control-item">
          <select>
            <option>Choose Simulation Type</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
        </div>

        {/* Connection Percentage Slider */}
        <div className="control-item">
          <label htmlFor="connection-range">Connection Percentage:</label>
          <input
            type="range"
            id="connection-range"
            min="0"
            max="100"
            value={percent} // Bind value to state
            onChange={handleRangeChange} // Handle changes in range input
          />
          <span>{percent}%</span> {/* Display the current percent value */}
        </div>

        {/* Resolution Dropdown */}
        <div className="control-item">
          <label htmlFor="resolution-select">Resolution:</label>
          <select
            id="resolution-select"
            defaultValue="100" // Set default resolution to 100
            onChange={(e) => onResolutionChange(parseInt(e.target.value, 10))} // Notify parent of resolution change
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
