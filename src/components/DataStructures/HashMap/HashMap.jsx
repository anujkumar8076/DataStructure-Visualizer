import React, { useState } from "react";
import "./HashMap.css";

const HashMap = () => {
  const [hashMap, setHashMap] = useState({});
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [deleteKey, setDeleteKey] = useState("");
  const [checkKey, setCheckKey] = useState("");
  const [checkValue, setCheckValue] = useState("");
  const [updateKey, setUpdateKey] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  // Insert a key-value pair
  const insert = () => {
    if (key.trim() === "" || value.trim() === "") {
      alert("Key and value cannot be empty!");
      return;
    }
    if (key in hashMap) {
      alert("Key already exists! Use update to modify the value.");
      return;
    }
    setHashMap((prevHashMap) => ({ ...prevHashMap, [key]: value }));
    setKey("");
    setValue("");
    alert(`Inserted: ${key} -> ${value}`);
  };

  // Search for a key
  const search = () => {
    if (searchKey.trim() === "") {
      alert("Please provide a key to search!");
      return;
    }
    if (searchKey in hashMap) {
      alert(`Found: ${searchKey} -> ${hashMap[searchKey]}`);
    } else {
      alert(`Key '${searchKey}' not found!`);
    }
    setSearchKey("");
  };

  // Delete a key-value pair by key
  const deleteByKey = () => {
    if (deleteKey.trim() === "") {
      alert("Please provide a key to delete!");
      return;
    }
    if (!(deleteKey in hashMap)) {
      alert(`Key '${deleteKey}' not found!`);
      return;
    }
    setHashMap((prevHashMap) => {
      const updatedHashMap = { ...prevHashMap };
      delete updatedHashMap[deleteKey];
      return updatedHashMap;
    });
    setDeleteKey("");
    alert(`Key '${deleteKey}' deleted successfully!`);
  };

  // Update an existing key's value
  const update = () => {
    if (updateKey.trim() === "" || updateValue.trim() === "") {
      alert("Key and value cannot be empty for update!");
      return;
    }
    if (!(updateKey in hashMap)) {
      alert(`Key '${updateKey}' not found!`);
      return;
    }
    setHashMap((prevHashMap) => ({
      ...prevHashMap,
      [updateKey]: updateValue,
    }));
    setUpdateKey("");
    setUpdateValue("");
    alert(`Updated: ${updateKey} -> ${updateValue}`);
  };

  // Clear all key-value pairs
  const clearHashMap = () => {
    setHashMap({});
    alert("HashMap cleared!");
  };

  // Check if a key exists in the HashMap
  const checkIfKeyExists = () => {
    if (checkKey.trim() === "") {
      alert("Please provide a key to check!");
      return;
    }
    if (checkKey in hashMap) {
      alert(`Key '${checkKey}' exists.`);
    } else {
      alert(`Key '${checkKey}' does not exist.`);
    }
    setCheckKey("");
  };

  // Check if a value exists in the HashMap
  const checkIfValueExists = () => {
    if (checkValue.trim() === "") {
      alert("Please provide a value to check!");
      return;
    }
    if (Object.values(hashMap).includes(checkValue)) {
      alert(`Value '${checkValue}' exists.`);
    } else {
      alert(`Value '${checkValue}' does not exist.`);
    }
    setCheckValue("");
  };

  return (
    <div className="hashmap-container">
      <h1>Enhanced HashMap Visualization</h1>

      <div className="operations">
        <div className="operation">
          <h3>Insert</h3>
          <input
            type="text"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={insert}>Insert</button>
        </div>

        <div className="operation">
          <h3>Search by Key</h3>
          <input
            type="text"
            placeholder="Key to Search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button onClick={search}>Search</button>
        </div>

        <div className="operation">
          <h3>Delete by Key</h3>
          <input
            type="text"
            placeholder="Key to Delete"
            value={deleteKey}
            onChange={(e) => setDeleteKey(e.target.value)}
          />
          <button onClick={deleteByKey}>Delete</button>
        </div>

        <div className="operation">
          <h3>Update</h3>
          <input
            type="text"
            placeholder="Key to Update"
            value={updateKey}
            onChange={(e) => setUpdateKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Value"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
          />
          <button onClick={update}>Update</button>
        </div>

        <div className="operation">
          <h3>Contains Key</h3>
          <input
            type="text"
            placeholder="Key to Check"
            value={checkKey}
            onChange={(e) => setCheckKey(e.target.value)}
          />
          <button onClick={checkIfKeyExists}>Check Key</button>
        </div>

        <div className="operation">
          <h3>Contains Value</h3>
          <input
            type="text"
            placeholder="Value to Check"
            value={checkValue}
            onChange={(e) => setCheckValue(e.target.value)}
          />
          <button onClick={checkIfValueExists}>Check Value</button>
        </div>
      </div>

      <button className="clear-button" onClick={clearHashMap}>
        Clear HashMap
      </button>

      <div className="hashmap-visualization">
        <h2>HashMap</h2>
        <p className="hashmap-summary">Total Elements: {Object.keys(hashMap).length}</p>
        <div className="hashmap-grid">
          {Object.keys(hashMap).length === 0 ? (
            <div className="empty-message">No elements in the HashMap.</div>
          ) : (
            Object.entries(hashMap).map(([k, v]) => (
              <div key={k} className="hashmap-cell">
                <div className="cell-key">{k}</div>
                <div className="cell-value">{v}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HashMap;
