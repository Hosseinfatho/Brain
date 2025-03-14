import React, { useState } from "react";
import "./TopSection.css"; // Import CSS file for custom styles

const TopSection = ({ onResolutionChange, resolution, onOptionsChange }) => {
  const [option1, setOption1] = useState(true); // Default to show input connections
  const [option2, setOption2] = useState(true); // Default to show output connections

  const handleResolutionChange = (e) => {
    onResolutionChange(parseInt(e.target.value, 10)); // Pass the selected resolution to the parent
  };

  const handleOption1Change = (e) => {
    const checked = e.target.checked;
    setOption1(checked);
    onOptionsChange({ option1: checked, option2 }); // Update parent with the new state
  };

  const handleOption2Change = (e) => {
    const checked = e.target.checked;
    setOption2(checked);
    onOptionsChange({ option1, option2: checked }); // Update parent with the new state
  };

  return (
    <div className="top-section-container">
      <h3>Controls</h3>
      <div className="controls">
        <div className="control-item">
          <label>
            <input
              type="checkbox"
              checked={option1}
              onChange={handleOption1Change}
            />{" "}
            Option 1 (Input Connections Red)
          </label>
        </div>
        <div className="control-item">
          <label>
            <input
              type="checkbox"
              checked={option2}
              onChange={handleOption2Change}
            />{" "}
            Option 2 (Output Connections Green)
          </label>
        </div>
        <div className="control-item">
          <label htmlFor="resolution-select">Resolution:</label>
          <select
            id="resolution-select"
            value={resolution} // Ensure dropdown reflects the current resolution
            onChange={handleResolutionChange} // Update the resolution on change
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
