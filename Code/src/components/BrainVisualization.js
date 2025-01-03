import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import { Line } from "@react-three/drei";
import "./BrainVisualization.css";

const BrainVisualization = ({ resolution }) => {
  const [nodes, setNodes] = useState([]);
  const [groupedNodes, setGroupedNodes] = useState([]);

  // Load and parse the positions from the file
  const loadPositions = async () => {
    const response = await fetch("/data/rank_0_positions.txt");
    const data = await response.text();
    const lines = data.split("\n");

    const loadedNodes = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith("#")) {
        const parts = line.split(/\s+/);
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);
        const z = parseFloat(parts[3]);
        loadedNodes.push({ x, y, z });
      }
    }
    setNodes(loadedNodes);
  };

  // Group nodes based on the resolution
  const groupNodes = (nodes) => {
    const grouped = [];
    for (let i = 0; i < nodes.length; i += resolution) {
      const group = nodes.slice(i, i + resolution);

      // Calculate average position of the group
      const avgX = group.reduce((sum, node) => sum + node.x, 0) / group.length;
      const avgY = group.reduce((sum, node) => sum + node.y, 0) / group.length;
      const avgZ = group.reduce((sum, node) => sum + node.z, 0) / group.length;

      grouped.push({ x: avgX, y: avgY, z: avgZ });
    }
    setGroupedNodes(grouped);
  };

  useEffect(() => {
    loadPositions();
  }, []);

  useEffect(() => {
    groupNodes(nodes);
  }, [nodes, resolution]);

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, -150, 0], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />

      {/* Wrap all content in a group and move it downward */}
      <group position={[-75, -75, -75]}> {/* Move the origin down by 50 units */}
        {/* Custom Cartesian Axes */}
        <group>
          {/* X-Axis (Red) */}
          <Line
            points={[
              [0, 0, 0],
              [100, 0, 0],
            ]}
            color="red"
            lineWidth={2}
          />
          {/* Y-Axis (Green) */}
          <Line
            points={[
              [0, 0, 0],
              [0, 100, 0],
            ]}
            color="green"
            lineWidth={2}
          />
          {/* Z-Axis (Blue) */}
          <Line
            points={[
              [0, 0, 0],
              [0, 0, 100],
            ]}
            color="blue"
            lineWidth={2}
          />
        </group>

        {/* Render grouped nodes */}
        {groupedNodes.map((node, index) => (
          <mesh key={index} position={[node.x, node.y, node.z]}>
            <Sphere args={[0.5, 6, 6]}>
              <meshStandardMaterial color="blue" />
            </Sphere>
          </mesh>
        ))}
      </group>

      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default BrainVisualization;
