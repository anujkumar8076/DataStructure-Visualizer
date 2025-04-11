import React, { useState } from "react";
import "./Tree.css";

// Node class to represent each node in the AVL tree
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

function App() {
  const [root, setRoot] = useState(null);
  const [inputValues, setInputValues] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState("");
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const logStep = (message) => {
    setSteps((prev) => `${prev}\n${message}`);
  };

  const height = (node) => (node ? node.height : 0);

  const getBalance = (node) => (node ? height(node.left) - height(node.right) : 0);

  const rightRotate = (y) => {
    logStep(`Performing right rotation on node ${y.data}`);
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;

    return x;
  };

  const leftRotate = (x) => {
    logStep(`Performing left rotation on node ${x.data}`);
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(height(x.left), height(x.right)) + 1;
    y.height = Math.max(height(y.left), height(y.right)) + 1;

    return y;
  };

  const insertNode = (node, data) => {
    if (!node) {
      logStep(`Inserted ${data} as a new node.`);
      return new Node(data);
    }

    if (data < node.data) {
      logStep(`Going left from node ${node.data}`);
      node.left = insertNode(node.left, data);
    } else if (data > node.data) {
      logStep(`Going right from node ${node.data}`);
      node.right = insertNode(node.right, data);
    } else {
      logStep(`Node ${data} already exists.`);
      return node;
    }

    node.height = Math.max(height(node.left), height(node.right)) + 1;

    const balance = getBalance(node);

    if (balance > 1 && data < node.left.data) {
      return rightRotate(node);
    }
    if (balance < -1 && data > node.right.data) {
      return leftRotate(node);
    }
    if (balance > 1 && data > node.left.data) {
      node.left = leftRotate(node.left);
      return rightRotate(node);
    }
    if (balance < -1 && data < node.right.data) {
      node.right = rightRotate(node.right);
      return leftRotate(node);
    }

    return node;
  };

  const deleteNode = (node, data) => {
    if (!node) {
      logStep(`Node ${data} not found.`);
      return node;
    }

    if (data < node.data) {
      logStep(`Going left from node ${node.data}`);
      node.left = deleteNode(node.left, data);
    } else if (data > node.data) {
      logStep(`Going right from node ${node.data}`);
      node.right = deleteNode(node.right, data);
    } else {
      logStep(`Deleting node ${data}.`);
      if (!node.left || !node.right) {
        const temp = node.left || node.right;
        node = temp;
      } else {
        const temp = findMin(node.right);
        node.data = temp.data;
        node.right = deleteNode(node.right, temp.data);
      }
    }

    if (!node) return node;

    node.height = Math.max(height(node.left), height(node.right)) + 1;

    const balance = getBalance(node);

    if (balance > 1 && getBalance(node.left) >= 0) {
      return rightRotate(node);
    }
    if (balance > 1 && getBalance(node.left) < 0) {
      node.left = leftRotate(node.left);
      return rightRotate(node);
    }
    if (balance < -1 && getBalance(node.right) <= 0) {
      return leftRotate(node);
    }
    if (balance < -1 && getBalance(node.right) > 0) {
      node.right = rightRotate(node.right);
      return leftRotate(node);
    }

    return node;
  };

  const findMin = (node) => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  const searchNode = (node, value) => {
    if (!node) {
      logStep(`Node ${value} not found.`);
      setHighlightedNodes([]);
      return null;
    }
    if (node.data === value) {
      logStep(`Node ${value} found.`);
      setHighlightedNodes([node.data]);
      return node;
    }
    logStep(`Searching ${value} in ${value < node.data ? "left" : "right"} subtree of node ${node.data}`);
    return searchNode(value < node.data ? node.left : node.right, value);
  };

  const handleSearch = () => {
    const value = parseInt(searchValue.trim(), 10);
    if (isNaN(value)) {
      setResult("Please enter a valid number to search.");
      return;
    }
    const found = searchNode(root, value);
    setResult(found ? `Node ${value} found.` : `Node ${value} not found.`);
    setSearchValue("");
  };

  const handleInsert = () => {
    const values = inputValues.split(",").map((val) => parseInt(val.trim(), 10));
    let newRoot = root;
    values.forEach((value) => {
      newRoot = insertNode(newRoot, value);
    });
    setRoot(newRoot);
    setInputValues("");
    setHighlightedNodes(values);
    setAnimationTrigger(true);
    setTimeout(() => setAnimationTrigger(false), 1000);
  };

  const handleDelete = () => {
    const value = parseInt(inputValues.trim(), 10);
    setRoot(deleteNode(root, value));
    setInputValues("");
    setHighlightedNodes([value]);
    setAnimationTrigger(true);
    setTimeout(() => setAnimationTrigger(false), 1000);
  };

  const renderTree = (node, x = 500, y = 300, level = 1) => {
    if (!node) return null;
    const gap = Math.max(300 / level, 50);
    return (
      <>
        <circle
          cx={x}
          cy={y}
          r={20}
          fill={highlightedNodes.includes(node.data) ? "#FF6347" : "#76c7c0"}
          stroke="#000"
          strokeWidth="2"
          className={animationTrigger ? "node-animation" : ""}
        />
        <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="12px">
          {node.data}
        </text>
        {node.left && (
          <>
            <line x1={x} y1={y + 20} x2={x - gap} y2={y + 80} stroke="#000" strokeWidth="2" />
            {renderTree(node.left, x - gap, y + 80, level + 1)}
          </>
        )}
        {node.right && (
          <>
            <line x1={x} y1={y + 20} x2={x + gap} y2={y + 80} stroke="#000" strokeWidth="2" />
            {renderTree(node.right, x + gap, y + 80, level + 1)}
          </>
        )}
      </>
    );
  };

  const handleTraversal = (type) => {
    if (!root) {
      setResult("Tree is empty.");
      return;
    }
    const traversalResult = [];

    const traverse = (node) => {
      if (!node) return;
      if (type === "preOrder") traversalResult.push(node.data);
      traverse(node.left);
      if (type === "inOrder") traversalResult.push(node.data);
      traverse(node.right);
      if (type === "postOrder") traversalResult.push(node.data);
    };

    traverse(root);
    setHighlightedNodes(traversalResult);
    setResult(`Traversal (${type}): ${traversalResult.join(" -> ")}`);
  };

  const clearTree = () => {
    setRoot(null);
    setResult("Tree has been cleared.");
    setSteps("");
    setHighlightedNodes([]);
  };

  return (
    <div className="app-container">
      <h1>Interactive AVL Tree Visualizer</h1>
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
        <button onClick={clearTree}>Clear Tree</button>
      </div>
      <div className="steps" style={{ textAlign: "center" }}>
        <h3>Steps:</h3>
        <pre>{steps}</pre>
      </div>
      <div className="result" style={{ textAlign: "center" }}>
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg className="tree-visualization" style={{ width: "100%", height: "600px", maxWidth: "1200px" }}>
          {renderTree(root)}
        </svg>
      </div>
    </div>
  );
}

export default App;
