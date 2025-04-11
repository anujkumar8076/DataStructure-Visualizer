import React, { useState } from "react";
import "./Heap.css";

function App() {
  const [heap, setHeap] = useState([]);
  const [heapType, setHeapType] = useState("min");
  const [inputValues, setInputValues] = useState("");
  const [steps, setSteps] = useState([]);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [result, setResult] = useState("");
  const [swapHistory, setSwapHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

  const showMessage = (message, type = "success") => {
    setResult({ message, type });
    setTimeout(() => setResult(""), 3000);
  };

  const heapifyDown = async (arr, n, i) => {
    let extreme = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (
      left < n &&
      (heapType === "min" ? arr[left] < arr[extreme] : arr[left] > arr[extreme])
    ) {
      extreme = left;
    }
    if (
      right < n &&
      (heapType === "min" ? arr[right] < arr[extreme] : arr[right] > arr[extreme])
    ) {
      extreme = right;
    }

    if (extreme !== i) {
      const prev = [...arr];
      swap(arr, i, extreme);
      const historyEntry = `Swapped ${prev[i]} and ${prev[extreme]}`;
      setSteps((prev) => [...prev.slice(-5), historyEntry]);
      setSwapHistory((prev) => [...prev, historyEntry]);
      setHeap([...arr]);
      setHighlightedNodes([i, extreme]);
      await delay(500);
      await heapifyDown(arr, n, extreme);
    }
  };

  const heapifyUp = async (arr, i) => {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heapType === "min" ? arr[i] < arr[parent] : arr[i] > arr[parent]) {
        const prev = [...arr];
        swap(arr, i, parent);
        const historyEntry = `Swapped ${prev[i]} and ${prev[parent]}`;
        setSteps((prev) => [...prev.slice(-5), historyEntry]);
        setSwapHistory((prev) => [...prev, historyEntry]);
        setHeap([...arr]);
        setHighlightedNodes([i, parent]);
        await delay(500);
        i = parent;
      } else {
        break;
      }
    }
  };

  const insert = async (value) => {
    if (animating) return;
    if (isNaN(value)) {
      showMessage("Invalid value. Please enter a valid number.", "error");
      return;
    }
    setAnimating(true);
    const newHeap = [...heap, value];
    setHeap(newHeap);
    setSteps((prev) => [...prev.slice(-5), `Inserted ${value}`]);
    setSwapHistory((prev) => [...prev, `Inserted ${value}`]);
    await heapifyUp(newHeap, newHeap.length - 1);
    setAnimating(false);
    showMessage(`Inserted ${value} successfully.`);
  };

  const deleteRoot = async () => {
    if (animating || heap.length === 0) {
      showMessage("Heap is empty. Nothing to delete.", "error");
      return;
    }
    setAnimating(true);
    const newHeap = [...heap];
    const root = newHeap[0];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    setHeap([...newHeap]);
    setSteps((prev) => [...prev.slice(-5), `Deleted root ${root}`]);
    setSwapHistory((prev) => [...prev, `Deleted root ${root}`]);
    await heapifyDown(newHeap, newHeap.length, 0);
    setAnimating(false);
    showMessage(`Deleted root ${root} successfully.`);
  };

  const deleteNode = async (value) => {
    if (animating) return;
    const index = heap.indexOf(value);
    if (index === -1) {
      showMessage(`Node ${value} not found in the heap.`, "error");
      return;
    }
    setAnimating(true);
    const newHeap = [...heap];
    newHeap[index] = newHeap[newHeap.length - 1];
    newHeap.pop();
    setHeap([...newHeap]);
    setSteps((prev) => [...prev.slice(-5), `Deleted node ${value}`]);
    setSwapHistory((prev) => [...prev, `Deleted node ${value}`]);
    await heapifyDown(newHeap, newHeap.length, index);
    setAnimating(false);
    showMessage(`Deleted node ${value} successfully.`);
  };

  const buildHeap = async () => {
    if (animating) return;
    const arr = inputValues
      .split(",")
      .map((v) => parseInt(v.trim(), 10))
      .filter((v) => !isNaN(v));
    if (arr.length === 0) {
      showMessage("No valid input to build the heap.", "error");
      return;
    }
    setAnimating(true);
    setHeap(arr);
    setSteps(["Building heap..."]);
    setSwapHistory(["Building heap..."]);
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      await heapifyDown(arr, arr.length, i);
    }
    setAnimating(false);
    showMessage("Heap built successfully.");
  };

  const toggleHistoryModal = () => setShowHistory(!showHistory);

  const calculateNodePositions = (arr) => {
    const positions = [];
    const maxDepth = Math.ceil(Math.log2(arr.length + 1));
    const baseWidth = window.innerWidth;

    const computePositions = (index, depth, xMin, xMax) => {
      if (index >= arr.length) return;

      const x = (xMin + xMax) / 2; // Center of the current range
      const y = depth * 100; // Vertical spacing between levels (adjustable)

      positions[index] = { x, y };

      // Recursively calculate positions for left and right children
      computePositions(2 * index + 1, depth + 1, xMin, x); // Left child
      computePositions(2 * index + 2, depth + 1, x, xMax); // Right child
    };

    computePositions(0, 1, 0, baseWidth); // Start with the root node
    return positions;
  };

  const renderTree = (arr, positions) => {
    if (!positions || arr.length === 0) return null;

    return positions.map((pos, index) => {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      return (
        <g key={index}>
          {leftChildIndex < arr.length && (
            <line
              x1={pos.x}
              y1={pos.y}
              x2={positions[leftChildIndex].x}
              y2={positions[leftChildIndex].y}
              stroke="url(#edgeGradient)"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          )}
          {rightChildIndex < arr.length && (
            <line
              x1={pos.x}
              y1={pos.y}
              x2={positions[rightChildIndex].x}
              y2={positions[rightChildIndex].y}
              stroke="url(#edgeGradient)"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          )}
          <circle
            cx={pos.x}
            cy={pos.y}
            r={20}
            fill={
              highlightedNodes.includes(index)
                ? "url(#highlightGradient)"
                : "url(#nodeGradient)"
            }
            stroke="#000"
            strokeWidth="2"
          />
          <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="#fff" fontSize="12px">
            {arr[index]}
          </text>
        </g>
      );
    });
  };

  const positions = calculateNodePositions(heap);

  return (
    <div className="app-container">
      <h1>Heap Visualizer</h1>
      {result && (
        <div className={`notification ${result.type}`}>
          {result.message}
        </div>
      )}
      <div className="controls">
        <label>
          <input
            type="radio"
            name="heapType"
            value="min"
            checked={heapType === "min"}
            onChange={() => setHeapType("min")}
          />
          Min-Heap
        </label>
        <label>
          <input
            type="radio"
            name="heapType"
            value="max"
            checked={heapType === "max"}
            onChange={() => setHeapType("max")}
          />
          Max-Heap
        </label>
        <input
          type="text"
          value={inputValues}
          onChange={(e) => setInputValues(e.target.value)}
          placeholder="Enter values (comma-separated)"
        />
        <button onClick={buildHeap}>Build Heap</button>
        <button onClick={() => insert(Math.floor(Math.random() * 1000))}>
          Insert Random
        </button>
        <button onClick={deleteRoot}>Delete Root</button>
        <button onClick={() => deleteNode(parseInt(prompt("Enter value to delete"), 10))}>
          Delete Specific Node
        </button>
        <button onClick={() => setHeap([])}>Clear All</button>
        <button onClick={toggleHistoryModal}>View Swap History</button>
      </div>
      {showHistory && (
        <div className="history-modal">
          <h2>Swap History</h2>
          <pre>{swapHistory.join("\n")}</pre>
          <button onClick={toggleHistoryModal}>Close</button>
        </div>
      )}
      <svg className="tree-visualization" width="100%" height="600">
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#76c7c0", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#4caf50", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FF6347", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#FF4500", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#000", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#444", stopOpacity: 1 }} />
          </linearGradient>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
          </marker>
        </defs>
        {renderTree(heap, positions)}
      </svg>
    </div>
  );
}

export default App;
