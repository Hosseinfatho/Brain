import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import "./BrainVisualization.css";

const BrainVisualization = ({ resolution = 100 }) => {
  const [nodes, setNodes] = useState([]);
  const [groupedNodes, setGroupedNodes] = useState([]);
  const canvasRef = useRef();

  // Load neuron positions from a text file
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
        loadedNodes.push({ id: i, x, y, z });
      }
    }
    setNodes(loadedNodes);
  };

  // Group nodes based on resolution
  const groupNodes = (nodes) => {
    const grouped = [];
    for (let i = 0; i < nodes.length; i += resolution) {
      const group = nodes.slice(i, i + resolution);

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
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, -200, 0], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />

        <group position={[-75, -75, -75]}>
          {/* Render Neurons */}
          {groupedNodes.map((node, index) => (
            <mesh key={index} position={[node.x, node.y, node.z]}>
              <Sphere args={[1.0, 6, 6]}>
                <meshStandardMaterial color="blue" />
              </Sphere>
            </mesh>
          ))}
        </group>

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default BrainVisualization;
