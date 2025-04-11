import React, { useState } from "react";
import "./HashSet.css";

const App = () => {
  const [hashSet, setHashSet] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [size, setSize] = useState(0);
  const [loadFactor, setLoadFactor] = useState(0);
  const [bucketCount, setBucketCount] = useState(10);

  // Hash function to calculate bucket index and sum
  const hashFunction = (value) => {
    if (!value) return { bucketIndex: null, sum: 0 };
    const sum = value
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return {
      bucketIndex: sum % bucketCount,
      sum,
    };
  };

  // Calculate and update the load factor
  const calculateLoadFactor = (newSize) => {
    setLoadFactor(newSize / bucketCount);
  };

  // Update HashSet and manage add/remove operations
  const updateHashSet = (values, action) => {
    let updatedValues = [];
    let details = [];
    let updatedSize = size;

    setHashSet((prev) => {
      const newHashSet = { ...prev };

      values.forEach((value) => {
        if (!value) {
          details.push("Empty value ignored.");
          return;
        }
        const { bucketIndex, sum } = hashFunction(value);
        const bucket = newHashSet[bucketIndex] || [];
        if (action === "add") {
          if (!bucket.includes(value)) {
            bucket.push(value);
            newHashSet[bucketIndex] = bucket;
            updatedSize++;
            updatedValues.push(value);
            details.push(`Added to bucket ${bucketIndex}`);
          } else {
            details.push(`"${value}" already exists in bucket ${bucketIndex}`);
          }
        } else if (action === "remove") {
          if (bucket.includes(value)) {
            newHashSet[bucketIndex] = bucket.filter((item) => item !== value);
            updatedSize--;
            updatedValues.push(value);
            details.push(`Removed from bucket ${bucketIndex}`);
          } else {
            details.push(`"${value}" not found in bucket ${bucketIndex}`);
          }
        }
      });

      calculateLoadFactor(updatedSize);
      setSize(updatedSize);
      return newHashSet;
    });

    // Format the message
    const actionVerb = action === "add" ? "added" : "removed";
    const valueMessages = updatedValues
      .map((value) => `${value} is ${actionVerb}`)
      .join(", ");
    const detailMessage =
      details.length > 0 ? details.join("; ") : "No details available";

    setMessage(
      `${valueMessages}\nDetails: ${detailMessage}`
    );
    setInputValue("");
  };

  const addElement = () => updateHashSet(inputValue.split(","), "add");
  const removeElement = () => updateHashSet(inputValue.split(","), "remove");

  const clearHashSet = () => {
    setHashSet({});
    setSize(0);
    setLoadFactor(0);
    setMessage("HashSet cleared.");
  };

  const updateBucketCount = (newCount) => {
    const parsedCount = parseInt(newCount, 10);
    if (parsedCount > 0) {
      setBucketCount(parsedCount);
      clearHashSet();
      setMessage(`Bucket count updated to ${parsedCount}. HashSet cleared.`);
    } else {
      setMessage("Invalid bucket count. Must be a positive integer.");
    }
  };

  const checkElement = () => {
    const values = inputValue.split(",").map((val) => val.trim());
    let existingValues = [];
    let nonExistingValues = [];
    let details = [];

    values.forEach((value) => {
      if (!value) {
        details.push("Empty value ignored.");
        return;
      }
      const { bucketIndex, sum } = hashFunction(value);
      const bucket = hashSet[bucketIndex] || [];
      if (bucket.includes(value)) {
        existingValues.push(value);
        details.push(
          `\"${value}\" (Sum: ${sum}) exists in Bucket ${bucketIndex}`
        );
      } else {
        nonExistingValues.push(value);
        details.push(
          `\"${value}\" (Sum: ${sum}) does not exist in Bucket ${bucketIndex}`
        );
      }
    });

    setMessage(
      `Exists: ${existingValues.length > 0 ? existingValues.join(", ") : "None"
      }\nDetails: ${details.length > 0 ? details.join("; ") : "No details available"
      }`
    );
    setInputValue("");
  };

  return (
    <div className="App">
      <h1>HashSet Visualization 🚀</h1>
      <div className="status-bar">
        <p>
          🧩 Bucket Count: {bucketCount} | 📊 Load Factor: {loadFactor.toFixed(
            2
          )} | 🛠️ Size: {size}
        </p>
      </div>
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter values (comma-separated)"
        />
        <button onClick={addElement}>➕ Add</button>
        <button onClick={removeElement}>➖ Remove</button>
        <button onClick={checkElement}>🔍 Check</button>
        <button onClick={clearHashSet}>🗑️ Clear</button>
        <input
          type="number"
          min="1"
          placeholder="Bucket count"
          onChange={(e) => updateBucketCount(e.target.value)}
        />
      </div>
      <p className="message">{message}</p>
      <div className="hash-table">
        {Array.from({ length: bucketCount }, (_, index) => (
          <div key={index} className="bucket">
            <h3>Bucket {index} 🧺 (Size: {(hashSet[index] || []).length})</h3>
            <div className="elements">
              {(hashSet[index] || []).map((item, i) => (
                <div key={i} className="element">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
