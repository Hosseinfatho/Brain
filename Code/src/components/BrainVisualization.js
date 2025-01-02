import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

const BrainVisualization = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load and parse the positions from the file
  const loadPositions = async () => {
    try {
      const response = await fetch("/data/rank_0_positions.txt");
      if (!response.ok) throw new Error("Failed to load data.");
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

      // Update state with the nodes
      setNodes(nodes);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  // Function to group every 5 nodes into one
  const groupNodes = (nodes) => {
    const groupedNodes = [];
    for (let i = 0; i < nodes.length; i += 5) {
      // Group every 5 nodes
      const group = nodes.slice(i, i + 5);
      
      // Calculate average position of the group
      const avgX = group.reduce((sum, node) => sum + node.x, 0) / group.length;
      const avgY = group.reduce((sum, node) => sum + node.y, 0) / group.length;
      const avgZ = group.reduce((sum, node) => sum + node.z, 0) / group.length;

      groupedNodes.push({ x: avgX, y: avgY, z: avgZ });
    }
    return groupedNodes;
  };

  useEffect(() => {
    console.log("Attempting to load positions...");
    loadPositions();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading...</div>; // Show loading message while the file is being loaded
  }

  // Group nodes for lower resolution visualization
  const groupedNodes = groupNodes(nodes);

  return (
    <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [200, 200, 200], fov: 75 }}>
      {/* Set ambient light */}
      <ambientLight intensity={0.5} />
      {/* Add spot light for better visibility */}
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />

      {/* Render grouped nodes */}
      {groupedNodes.map((node, index) => (
        <mesh key={index} position={[node.x, node.y, node.z]}>
          <Sphere args={[0.2, 8, 8]}>
            <meshStandardMaterial color="blue" />
          </Sphere>
        </mesh>
      ))}
    </Canvas>
  );
};

export default BrainVisualization;
