import React from "react";

const LeftSection = () => {
  return (
    <div className="left-section">
      <h3>Simulation Ensemble Members</h3>
      <div className="data-options">
        <div>
          <label>
            <input type="radio" name="data" /> No-network
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="data" /> Disable
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="data" /> Stimulus
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="data" /> Calcium
          </label>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
