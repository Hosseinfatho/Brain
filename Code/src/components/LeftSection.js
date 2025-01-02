import React from "react";

const LeftSection = () => {
  return (
    <div className="left-section-container">
      <h3>Data Selection</h3>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="data-control">
          <label>
            <input type="checkbox" /> Select Data {item}
          </label>
          <input type="range" min="0" max="100" />
        </div>
      ))}
    </div>
  );
};

export default LeftSection;
