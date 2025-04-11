import React, { useState, useEffect } from "react";
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

    // Insert a node into the binary tree
    const insertNode = (root, data) => {
        if (root === null) {
            setSteps((prev) => [...prev.slice(-5), `Inserted ${data} as a new node.`]);
            return new Node(data);
        }
        if (data < root.data) {
            setSteps((prev) => [...prev.slice(-5), `Going left from node ${root.data}`]);
            root.left = insertNode(root.left, data);
        } else {
            setSteps((prev) => [...prev.slice(-5), `Going right from node ${root.data}`]);
            root.right = insertNode(root.right, data);
        }
        return root;
    };

    // Delete a node from the binary tree
    const deleteNode = (root, data) => {
        if (root === null) {
            setSteps((prev) => [...prev.slice(-5), `Node ${data} not found.`]);
            return null;
        }
        if (data < root.data) {
            setSteps((prev) => [...prev.slice(-5), `Going left from node ${root.data}`]);
            root.left = deleteNode(root.left, data);
        } else if (data > root.data) {
            setSteps((prev) => [...prev.slice(-5), `Going right from node ${root.data}`]);
            root.right = deleteNode(root.right, data);
        } else {
            setSteps((prev) => [...prev.slice(-5), `Deleting node ${data}.`]);
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;
            const minNode = findMin(root.right);
            root.data = minNode.data;
            root.right = deleteNode(root.right, minNode.data);
        }
        return root;
    };

    // Find the minimum value node
    const findMin = (node) => {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    };

    // Search for a node in the binary tree
    const searchNode = (root, data) => {
        if (root === null) {
            setSteps((prev) => [...prev.slice(-5), `Node ${data} not found.`]);
            return false;
        }
        if (root.data === data) {
            setSteps((prev) => [...prev.slice(-5), `Node ${data} found.`]);
            setHighlightedNodes([data]);
            return true;
        }
        if (data < root.data) {
            setSteps((prev) => [...prev.slice(-5), `Going left from node ${root.data}`]);
            return searchNode(root.left, data);
        }
        setSteps((prev) => [...prev.slice(-5), `Going right from node ${root.data}`]);
        return searchNode(root.right, data);
    };

    // Traversals with highlighting
    const inOrderTraversal = (root, result = []) => {
        if (root !== null) {
            inOrderTraversal(root.left, result);
            result.push(root.data);
            inOrderTraversal(root.right, result);
        }
        setHighlightedNodes(result);
        return result;
    };

    const preOrderTraversal = (root, result = []) => {
        if (root !== null) {
            result.push(root.data);
            preOrderTraversal(root.left, result);
            preOrderTraversal(root.right, result);
        }
        setHighlightedNodes(result);
        return result;
    };

    const postOrderTraversal = (root, result = []) => {
        if (root !== null) {
            postOrderTraversal(root.left, result);
            postOrderTraversal(root.right, result);
            result.push(root.data);
        }
        setHighlightedNodes(result);
        return result;
    };

    // Check types of binary trees
    const isFullBinaryTree = (node) => {
        if (!node) return true;
        if ((!node.left && node.right) || (node.left && !node.right)) return false;
        return isFullBinaryTree(node.left) && isFullBinaryTree(node.right);
    };

    const isPerfectBinaryTree = (node, depth, level = 0) => {
        if (!node) return true;
        if (!node.left && !node.right) return depth === level + 1;
        if (!node.left || !node.right) return false;
        return (
            isPerfectBinaryTree(node.left, depth, level + 1) &&
            isPerfectBinaryTree(node.right, depth, level + 1)
        );
    };

    const calculateDepth = (node) => {
        let depth = 0;
        while (node) {
            depth++;
            node = node.left;
        }
        return depth;
    };

    const isCompleteBinaryTree = (node, index, nodeCount) => {
        if (!node) return true;
        if (index >= nodeCount) return false;
        return (
            isCompleteBinaryTree(node.left, 2 * index + 1, nodeCount) &&
            isCompleteBinaryTree(node.right, 2 * index + 2, nodeCount)
        );
    };

    const isBalancedBinaryTree = (node) => {
        const checkHeight = (node) => {
            if (!node) return 0;
            const leftHeight = checkHeight(node.left);
            if (leftHeight === -1) return -1;
            const rightHeight = checkHeight(node.right);
            if (rightHeight === -1) return -1;
            if (Math.abs(leftHeight - rightHeight) > 1) return -1;
            return Math.max(leftHeight, rightHeight) + 1;
        };
        return checkHeight(node) !== -1;
    };

    // Handle tree type checks
    const handleTreeTypeCheck = () => {
        if (!root) {
            setResult("Tree is empty.");
            return;
        }
        const depth = calculateDepth(root);
        const nodeCount = countNodes(root);
        const checks = [];
        if (isFullBinaryTree(root)) checks.push("Full Binary Tree");
        if (isPerfectBinaryTree(root, depth)) checks.push("Perfect Binary Tree");
        if (isCompleteBinaryTree(root, 0, nodeCount)) checks.push("Complete Binary Tree");
        if (isBalancedBinaryTree(root)) checks.push("Balanced Binary Tree");
        setResult(`Tree type(s): ${checks.join(", ")}`);
    };

    const countNodes = (node) => {
        if (!node) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
    };

    // Handle insertion of nodes
    const handleInsert = () => {
        setSteps([]);
        const values = inputValues.split(",").map((val) => parseInt(val.trim(), 10));
        let newRoot = root;
        values.forEach((value) => {
            newRoot = insertNode(newRoot, value);
        });
        setRoot(newRoot);
        setInputValues("");
        setHighlightedNodes(values);
    };

    // Handle deletion of nodes
    const handleDelete = () => {
        setSteps([]);
        const value = parseInt(inputValues.trim(), 10);
        const newRoot = deleteNode(root, value);
        setRoot(newRoot);
        setInputValues("");
        setHighlightedNodes([value]);
    };

    // Handle searching for a node
    const handleSearch = () => {
        setSteps([]);
        const value = parseInt(searchValue.trim(), 10);
        const found = searchNode(root, value);
        setResult(found ? `Node ${value} found.` : `Node ${value} not found.`);
        setSearchValue("");
    };

    // Handle traversal operations
    const handleTraversal = (type) => {
        if (root === null) {
            setResult("Tree is empty.");
            return;
        }
        let traversalResult = [];
        switch (type) {
            case "inOrder":
                traversalResult = inOrderTraversal(root);
                break;
            case "preOrder":
                traversalResult = preOrderTraversal(root);
                break;
            case "postOrder":
                traversalResult = postOrderTraversal(root);
                break;
            default:
                break;
        }
        setResult(`Traversal result: ${traversalResult.join(" -> ")}`);
    };

    // Render the binary tree with enhanced SVG visualization
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
                        <line
                            x1={x}
                            y1={y + 20}
                            x2={x - gap}
                            y2={y + 70}
                            stroke="#000"
                            strokeWidth="2"
                        />
                        {renderTree(node.left, x - gap, y + 70, level + 1)}
                    </>
                )}
                {node.right && (
                    <>
                        <line
                            x1={x}
                            y1={y + 20}
                            x2={x + gap}
                            y2={y + 70}
                            stroke="#000"
                            strokeWidth="2"
                        />
                        {renderTree(node.right, x + gap, y + 70, level + 1)}
                    </>
                )}
            </>
        );
    };

    return (
        <div className="app-container">
            <h1>Binary Tree Operations</h1>
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
                <button onClick={handleTreeTypeCheck}>Check Tree Type</button>
            </div>
            <div className="result">{result}</div>
            <div className="steps" style={{ maxHeight: "100px", overflowY: "auto", backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
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