import React, { useState } from "react";
import "./Trie.css";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class TrieStructure {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    for (const char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  search(word) {
    let current = this.root;
    for (const char of word) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }
    return current.isEndOfWord;
  }

  delete(word) {
    const deleteRecursively = (node, word, index) => {
      if (index === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return Object.keys(node.children).length === 0;
      }
      const char = word[index];
      const childNode = node.children[char];
      if (!childNode) return false;
      const shouldDeleteCurrentNode = deleteRecursively(childNode, word, index + 1);
      if (shouldDeleteCurrentNode) {
        delete node.children[char];
        return Object.keys(node.children).length === 0;
      }
      return false;
    };

    deleteRecursively(this.root, word, 0);
  }

  update(oldWord, newWord) {
    this.delete(oldWord);
    this.insert(newWord);
  }
}

const Trie = () => {
  const [trie] = useState(new TrieStructure());
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState("insert");
  const [visualTrie, setVisualTrie] = useState(trie.root);
  const [message, setMessage] = useState("");

  const handleOperation = () => {
    if (inputValue.trim() === "") return;

    if (operation === "insert") {
      trie.insert(inputValue);
      setMessage(`Inserted: "${inputValue}"`);
    } else if (operation === "delete") {
      trie.delete(inputValue);
      setMessage(`Deleted: "${inputValue}"`);
    } else if (operation === "search") {
      const found = trie.search(inputValue);
      setMessage(found ? `Found: "${inputValue}"` : `"${inputValue}" not found`);
    } else if (operation === "update") {
      const [oldWord, newWord] = inputValue.split(",");
      if (oldWord && newWord) {
        trie.update(oldWord.trim(), newWord.trim());
        setMessage(`Updated: "${oldWord.trim()}" to "${newWord.trim()}"`);
      } else {
        setMessage("Invalid input for update. Use 'oldWord,newWord' format.");
      }
    }
    setVisualTrie({ ...trie.root });
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const inputLength = e.target.value.length;
    // Dynamically adjust the input width based on the length
    const inputElement = e.target;
    inputElement.style.width = `${Math.min(inputLength * 10 + 50, 400)}px`;
  };

  const renderTrie = (node, level = 0) => {
    return Object.keys(node.children).map((char) => (
      <div key={char} className="trie-node" style={{ marginLeft: `${level * 20}px` }}>
        <span className={`node-char ${node.children[char].isEndOfWord ? "end-node" : ""}`}>
          {char}
        </span>
        {renderTrie(node.children[char], level + 1)}
      </div>
    ));
  };

  return (
    <div className="trie-container">
      <h1>Trie Visualization</h1>
      <div className="input-section">
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="insert">Insert</option>
          <option value="delete">Delete</option>
          <option value="search">Search</option>
          <option value="update">Update</option>
        </select>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={operation === "update" ? "oldWord,newWord" : "Enter a word"}
        />
        <button onClick={handleOperation}>Perform</button>
      </div>
      <div className="message">{message}</div>
      <div className="trie-visualization">{renderTrie(visualTrie)}</div>
    </div>
  );
};

export default Trie;
