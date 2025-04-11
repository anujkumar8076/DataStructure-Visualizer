import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const categories = {
    Linear: ["Array", "LinkedList", "Stack", "Queue"],
    "Non-Linear": ["BST", "AVL", "Graph"],
    "Hash-Based": ["HashMap", "HashSet"],
    //"Sorting": ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
    Specialized: ["Trie", "Heap"],
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home">
      <header className="header">
        <h1 className="main-title">Data Structure Visualizer</h1>
        <p className="sub-title">Interactive and Fun Learning Experience</p>
      </header>
      <div className="content-container">
        <h2 className="title">
          {selectedCategory
            ? `Select a ${selectedCategory} Data Structure`
            : "Explore Categories"}
        </h2>
        <div className="breadcrumb">
          {selectedCategory ? (
            <span>
              Home / <strong>{selectedCategory}</strong>
            </span>
          ) : (
            <span>Home</span>
          )}
        </div>
        <div className="data-structure-grid">
          {!selectedCategory
            ? Object.keys(categories).map((category) => (
              <div
                key={category}
                className="data-structure-card category-card"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="card-content">
                  <h3>{category}</h3>
                  <p className="card-description">
                    Explore {category} data structures
                  </p>
                </div>
              </div>
            ))
            : categories[selectedCategory].map((structure) => (
              <Link
                to={`/visualize/${structure.toLowerCase()}s`}
                key={structure}
                className="data-structure-card structure-card"
              >
                <div className="card-content">
                  <h3>{structure}</h3>
                </div>
              </Link>
            ))}
        </div>
        {selectedCategory && (
          <button
            className="back-button"
            onClick={() => setSelectedCategory(null)}
          >
            Back to Categories
          </button>
        )}
      </div>
      <div className="rating-panel">
        <h4>Your Progress</h4>
        <div className="circular-progress">
          <div className="circle">
            <span className="progress-value">65%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
