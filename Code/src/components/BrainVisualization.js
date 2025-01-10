import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls, Line } from "@react-three/drei";
import "./BrainVisualization.css";

const BrainVisualization = ({ resolution = 100, initialPercent = 50 }) => {
  const [nodes, setNodes] = useState([]);
  const [inputEdges, setInputEdges] = useState([]);
  const [outputEdges, setOutputEdges] = useState([]);
  const [areaColors, setAreaColors] = useState({});
  const [percent, setPercent] = useState(initialPercent);
  const canvasRef = useRef();

  // Generate a random color for each area
  const generateAreaColors = (areas) => {
    const colors = {};
    areas.forEach((area, index) => {
      colors[area] = `hsl(${(index * 137.5) % 360}, 70%, 50%)`; // Generate unique color for each area
    });
    return colors;
  };

  // Load neuron positions from a file
  const loadPositions = async (currentResolution) => {
    const response = await fetch("/data/rank_0_positions.txt");
    const data = await response.text();
    const lines = data.split("\n");

    const loadedNodes = [];
    const areas = new Set();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith("#")) {
        const parts = line.split(/\s+/);
        const id = parseInt(parts[0], 10);
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);
        const z = parseFloat(parts[3]);
        const area = parts[4];
        areas.add(area);
        loadedNodes.push({ id, x, y, z, area });
      }
    }

    setNodes(loadedNodes.filter((node) => node.id % currentResolution === 0)); // Filter by resolution
    setAreaColors(generateAreaColors([...areas]));
  };

  // Load connections from a file
  const loadConnections = async (filePath, resolution) => {
    const response = await fetch(filePath);
    const data = await response.text();
    const lines = data.split("\n");
    const connections = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith("#")) {
        const parts = line.split(/\s+/);
        const targetId = parseInt(parts[1], 10) - 1; // Adjust for 0-indexing
        const sourceId = parseInt(parts[3], 10) - 1; // Adjust for 0-indexing
        const weight = parseFloat(parts[4]);

        if (targetId % resolution === 0 && sourceId % resolution === 0) {
          connections.push({ targetId, sourceId, weight });
        }
      }
    }
    return connections;
  };

  const getLineWidth = (weight, percent) => {
    const baseWidth = Math.round(percent / 20);
    return Math.max(1, baseWidth * weight); // Scale line width by weight
  };

  const handleRangeChange = (event) => {
    setPercent(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    loadPositions(resolution);
    loadConnections("/data/rank_0_step_0_in_network.txt", resolution).then(setInputEdges);
    loadConnections("/data/rank_0_step_1000000_out_network.txt", resolution).then(setOutputEdges);
  }, [resolution]);

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
          {/* Render neurons */}
          {nodes.map((node) => (
            <mesh key={node.id} position={[node.x, node.y, node.z]}>
              <Sphere args={[0.5, 6, 6]}>
                <meshStandardMaterial color={areaColors[node.area] || "gray"} />
              </Sphere>
            </mesh>
          ))}

          {/* Render input connections (red) */}
          {inputEdges.map((edge, index) => {
            const targetNode = nodes.find((node) => node.id === edge.targetId);
            const sourceNode = nodes.find((node) => node.id === edge.sourceId);

            if (targetNode && sourceNode) {
              const lineWidth = getLineWidth(edge.weight, percent);

              return (
                <Line
                  key={`in-${index}`}
                  points={[
                    [sourceNode.x, sourceNode.y, sourceNode.z],
                    [targetNode.x, targetNode.y, targetNode.z],
                  ]}
                  color="red"
                  lineWidth={lineWidth}
                />
              );
            }
            return null;
          })}

          {/* Render output connections (green) */}
          {outputEdges.map((edge, index) => {
            const targetNode = nodes.find((node) => node.id === edge.targetId);
            const sourceNode = nodes.find((node) => node.id === edge.sourceId);

            if (targetNode && sourceNode) {
              const lineWidth = getLineWidth(edge.weight, percent);

              return (
                <Line
                  key={`out-${index}`}
                  points={[
                    [sourceNode.x, sourceNode.y, sourceNode.z],
                    [targetNode.x, targetNode.y, targetNode.z],
                  ]}
                  color="green"
                  lineWidth={lineWidth}
                />
              );
            }
            return null;
          })}
        </group>

        <OrbitControls enableZoom={true} />
      </Canvas>

      <input
        type="range"
        min="0"
        max="100"
        value={percent}
        onChange={handleRangeChange}
        style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Line Width: {percent / 20} (Max: 5, Min: 1)
      </div>
    </div>
  );
};

export default BrainVisualization;
