import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls, Line } from "@react-three/drei";
import "./BrainVisualization.css";

const BrainVisualization = ({ resolution = 100, initialPercent = 50 }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [groupedNodes, setGroupedNodes] = useState([]);
  const [percent, setPercent] = useState(initialPercent); // State for controlling line width
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

  // Load connection data (in and out) from the network files
  const loadNetworkData = async () => {
    const inResponse = await fetch("/data/rank_0_step_0_in_network.txt");
    const outResponse = await fetch("/data/rank_0_step_0_out_network.txt");

    const inData = await inResponse.text();
    const outData = await outResponse.text();

    const parseNetworkData = (data) => {
      const lines = data.split("\n");
      const connections = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith("#")) {
          const parts = line.split(/\s+/);
          const targetId = parseInt(parts[1], 10) - 1; // Target neuron id (adjusted for 0-indexing)
          const sourceId = parseInt(parts[3], 10) - 1; // Source neuron id (adjusted for 0-indexing)
          const weight = parseFloat(parts[4]); // Connection weight
          connections.push({ targetId, sourceId, weight });
        }
      }
      return connections;
    };

    const inConnections = parseNetworkData(inData);
    const outConnections = parseNetworkData(outData);

    // Combine connections
    const allConnections = [...inConnections, ...outConnections];
    setEdges(allConnections);
  };

  // Group nodes based on resolution
  const groupNodes = (nodes, resolution) => {
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

  // Filter nodes based on the resolution
  const filterNodes = (nodes, resolution) => {
    return nodes.filter((node) => node.id % resolution === 0); // Show neurons with ID % resolution == 0
  };

  const getLineWidth = (weight, percent) => {
    // Calculate line width as percent / 20 and round it to the nearest integer
    const lineWidth = Math.round(percent / 20); // Round the result
    return Math.max(1, lineWidth); // Minimum line width of 1
  };

  // Handle range change for percent value
  const handleRangeChange = (event) => {
    const newPercent = parseInt(event.target.value);
    setPercent(newPercent); // Update state when range slider value changes
  };

  useEffect(() => {
    loadPositions();
    loadNetworkData();
  }, []);

  useEffect(() => {
    groupNodes(nodes, resolution);
  }, [nodes, resolution]);

  const filteredNodes = filterNodes(nodes, resolution);

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
          {/* Render filtered neurons based on resolution */}
          {filteredNodes.map((node, index) => (
            <mesh key={index} position={[node.x, node.y, node.z]}>
              <Sphere args={[0.5, 6, 6]}>
                <meshStandardMaterial color="blue" />
              </Sphere>
            </mesh>
          ))}

          {/* Render connections only between visible neurons */}
          {edges.map((edge, index) => {
            const targetNode = filteredNodes.find((node) => node.id === edge.targetId);
            const sourceNode = filteredNodes.find((node) => node.id === edge.sourceId);

            if (targetNode && sourceNode) {
              const lineWidth = getLineWidth(edge.weight, percent);

              return (
                <Line
                  key={index}
                  points={[
                    [sourceNode.x, sourceNode.y, sourceNode.z],
                    [targetNode.x, targetNode.y, targetNode.z],
                  ]}
                  color="red"
                  lineWidth={lineWidth} // Use calculated line width
                />
              );
            }
            return null;
          })}
        </group>

        <OrbitControls enableZoom={true} />
      </Canvas>

      {/* Range slider for adjusting line width (percent) */}
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
