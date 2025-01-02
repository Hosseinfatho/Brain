import React from "react";
import MainSection from "./components/MainSection"; // Import MainSection
import LeftSection from "./components/LeftSection"; // Import LeftSection
import TopSection from "./components/TopSection"; // Import TopSection

function App() {
  return (
    <div className="app-container">
      {/* Top section (row at the top) */}
      <TopSection />
      
      {/* Main layout with left and main sections */}
      <div className="content-container">
        {/* Left section (20% width) */}
        <LeftSection />
        
        {/* Main section (Brain Visualization takes up remaining space) */}
        <MainSection />
      </div>
    </div>
  );
}

export default App;
