import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // Import OrbitControls
import { Sphere } from "@react-three/drei"; // Use Sphere from @react-three/drei

const BrainVisualization = () => {
  const [nodes, setNodes] = useState([]);

  // Load and parse the positions from the file
  const loadPositions = async () => {
    const response = await fetch("/data/rank_0_positions.txt");
    const data = await response.text();
    const lines = data.split("\n");

    const nodes = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith("#")) {
        const parts = line.split(/\s+/);
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);
        const z = parseFloat(parts[3]);
        nodes.push({ x, y, z });
      }
    }

    setNodes(nodes.slice(0, 100)); // Limit to 100 nodes for now
  };

  useEffect(() => {
    loadPositions();
  }, []); // Runs once when component mounts

  return (
    <Canvas style={{ width: "100%", height: "100%" }} >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
      <OrbitControls />

      {/* Render the first 100 nodes */}
      {nodes.map((node, index) => (
        <mesh key={index} position={[node.x, node.y, node.z]}>
          <Sphere args={[0.5, 32, 32]}>
            <meshStandardMaterial color="blue" />
          </Sphere>
        </mesh>
      ))}
    </Canvas>
  );
};

export default BrainVisualization;
