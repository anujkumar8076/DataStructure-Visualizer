import React, { useState } from "react";
import "./Tree.css";

// Node class to represent each node in the binary tree
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function App() {
  const [root, setRoot] = useState(null);
  const [inputValues, setInputValues] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState([]);
  const [highlightedNodes, setHighlightedNodes] = useState([]);

  // Utility to log steps with a fixed size
  const logStep = (message) => {
    setSteps((prev) => [...prev.slice(-4), message]);
  };

  // Insert a node into the binary tree
  const insertNode = (root, data) => {
    if (!root) {
      logStep(`Inserted ${data} as a new node.`);
      return new Node(data);
    }
    if (data < root.data) {
      logStep(`Going left from node ${root.data}`);
      root.left = insertNode(root.left, data);
    } else {
      logStep(`Going right from node ${root.data}`);
      root.right = insertNode(root.right, data);
    }
    return root;
  };

  // Delete a node from the binary tree
  const deleteNode = (root, data) => {
    if (!root) {
      logStep(`Node ${data} not found.`);
      return null;
    }
    if (data < root.data) {
      logStep(`Going left from node ${root.data}`);
      root.left = deleteNode(root.left, data);
    } else if (data > root.data) {
      logStep(`Going right from node ${root.data}`);
      root.right = deleteNode(root.right, data);
    } else {
      logStep(`Deleting node ${data}.`);
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      const minNode = findMin(root.right);
      root.data = minNode.data;
      root.right = deleteNode(root.right, minNode.data);
    }
    return root;
  };

  // Find the minimum value node
  const findMin = (node) => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  // Search for a node in the binary tree
  const searchNode = (root, data) => {
    if (!root) {
      logStep(`Node ${data} not found.`);
      return false;
    }
    if (root.data === data) {
      logStep(`Node ${data} found.`);
      setHighlightedNodes([data]);
      return true;
    }
    logStep(`Going ${data < root.data ? "left" : "right"} from node ${root.data}`);
    return searchNode(data < root.data ? root.left : root.right, data);
  };

  // Traversals
  const traverseTree = (root, type, result = []) => {
    if (root) {
      if (type === "preOrder") result.push(root.data);
      traverseTree(root.left, type, result);
      if (type === "inOrder") result.push(root.data);
      traverseTree(root.right, type, result);
      if (type === "postOrder") result.push(root.data);
    }
    return result;
  };

  const handleTraversal = (type) => {
    if (!root) {
      setResult("Tree is empty.");
      return;
    }
    const traversalResult = traverseTree(root, type);
    setHighlightedNodes(traversalResult);
    setResult(`Traversal result: ${traversalResult.join(" -> ")}`);
  };

  // Handlers
  const handleInsert = () => {
    const values = inputValues.split(",").map((val) => parseInt(val.trim(), 10));
    let newRoot = root;
    values.forEach((value) => {
      newRoot = insertNode(newRoot, value);
    });
    setRoot(newRoot);
    setInputValues("");
    setHighlightedNodes(values);
  };

  const handleDelete = () => {
    const value = parseInt(inputValues.trim(), 10);
    setRoot(deleteNode(root, value));
    setInputValues("");
    setHighlightedNodes([value]);
  };

  const handleSearch = () => {
    const value = parseInt(searchValue.trim(), 10);
    const found = searchNode(root, value);
    setResult(found ? `Node ${value} found.` : `Node ${value} not found.`);
    setSearchValue("");
  };

  // Render binary tree
  const renderTree = (node, x = 500, y = 50, level = 1) => {
    if (!node) return null;
    const gap = 200 / level;
    return (
      <>
        <circle
          cx={x}
          cy={y}
          r={20}
          fill={highlightedNodes.includes(node.data) ? "#FF6347" : "#76c7c0"}
          stroke="#000"
          strokeWidth="2"
        />
        <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="12px">
          {node.data}
        </text>
        {node.left && (
          <>
            <line x1={x} y1={y + 20} x2={x - gap} y2={y + 70} stroke="#000" strokeWidth="2" />
            {renderTree(node.left, x - gap, y + 70, level + 1)}
          </>
        )}
        {node.right && (
          <>
            <line x1={x} y1={y + 20} x2={x + gap} y2={y + 70} stroke="#000" strokeWidth="2" />
            {renderTree(node.right, x + gap, y + 70, level + 1)}
          </>
        )}
      </>
    );
  };

  return (
    <div className="app-container">
      <h1>Binary Search Tree Operations</h1>
      <div className="controls">
        <input
          type="text"
          value={inputValues}
          onChange={(e) => setInputValues(e.target.value)}
          placeholder="Enter values (comma-separated)"
        />
        <button onClick={handleInsert}>Insert</button>
        <button onClick={handleDelete}>Delete</button>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter value to search"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => handleTraversal("inOrder")}>In-Order</button>
        <button onClick={() => handleTraversal("preOrder")}>Pre-Order</button>
        <button onClick={() => handleTraversal("postOrder")}>Post-Order</button>
      </div>
      <div className="result">{result}</div>
      <div className="steps">
        <h3>Steps:</h3>
        <pre>{steps.join("\n")}</pre>
      </div>
      <svg className="tree-visualization" width="100%" height="600">
        {renderTree(root)}
      </svg>
    </div>
  );
}

export default App;
