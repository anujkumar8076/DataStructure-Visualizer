import React, { useState, useEffect } from 'react';
import './Array.css';

const arrayOperations = ['Insert', 'Delete', 'Search'];

const operationDescriptions = {
  Insert: "Inserting values into an array adds them either at the end or a specific index.",
  Delete: "Deleting a value removes the element at a specific index or value and shifts subsequent elements.",
  Search: "Searching an array means finding the index of an element by its value or index.",
};

const Array = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [visualizationData, setVisualizationData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [operationClass, setOperationClass] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isDeleteByIndex, setIsDeleteByIndex] = useState(true);
  const [isSearchByIndex, setIsSearchByIndex] = useState(true);

  useEffect(() => {
    if (operationClass) {
      const timeout = setTimeout(() => setOperationClass(''), 1000);
      return () => clearTimeout(timeout);
    }
  }, [operationClass]);

  useEffect(() => {
    setDescription(operationDescriptions[selectedOperation] || '');
  }, [selectedOperation]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleVisualize = () => {
    const currentData = [...visualizationData];
    let opClass = '';
    let newMessage = '';

    switch (selectedOperation) {
      case 'Insert':
        if (inputValue) {
          const values = inputValue.split(',').map(v => Number(v.trim())).filter(v => !isNaN(v));
          if (values.length > 0) {
            setVisualizationData([...currentData, ...values]);
            opClass = 'insert-animation';
            newMessage = 'Values inserted successfully!';
          } else {
            newMessage = 'Invalid values entered.';
          }
        }
        break;

      case 'Delete':
        if (isDeleteByIndex) {
          const index = parseInt(inputValue);
          if (index >= 0 && index < currentData.length) {
            currentData.splice(index, 1);
            setVisualizationData(currentData);
            opClass = 'delete-animation';
            newMessage = `Value at index ${index} deleted successfully!`;
          } else {
            newMessage = 'Index out of bounds.';
          }
        } else {
          const value = Number(inputValue);
          const deleteIndex = currentData.indexOf(value);
          if (deleteIndex !== -1) {
            currentData.splice(deleteIndex, 1);
            setVisualizationData(currentData);
            opClass = 'delete-animation';
            newMessage = 'Value deleted successfully!';
          } else {
            newMessage = 'Value not found for deletion.';
          }
        }
        break;

      case 'Search':
        if (isSearchByIndex) {
          const index = parseInt(inputValue);
          if (index >= 0 && index < currentData.length) {
            setHighlightedIndex(index);
            newMessage = `Value found at index ${index}: ${currentData[index]}`;
          } else {
            newMessage = 'Index out of bounds.';
          }
        } else {
          const value = Number(inputValue);
          const foundIndex = currentData.indexOf(value);
          setHighlightedIndex(foundIndex !== -1 ? foundIndex : null);
          newMessage = foundIndex !== -1 ? `Value found at index ${foundIndex}: ${value}` : 'Value not found.';
        }
        break;

      default:
        newMessage = 'Please select a valid operation.';
    }

    setOperationClass(opClass);
    setMessage(newMessage);
    setInputValue(''); // Clear the input field
  };

  return (
    <div className="visualization-container">
      <h1 className="title">Array Operations Visualization</h1>
      <p className="description">{description || 'Choose an operation to visualize its functionality!'}</p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter value(s), comma-separated"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="value-input"
        />

        <select
          value={selectedOperation}
          onChange={(e) => setSelectedOperation(e.target.value)}
          className="operation-select"
        >
          <option value="">Select an operation</option>
          {arrayOperations.map((operation) => (
            <option key={operation} value={operation}>
              {operation}
            </option>
          ))}
        </select>

        {selectedOperation === 'Delete' && (
  <div className="delete-options inline-options">
    <label>
      <input
        type="radio"
        checked={isDeleteByIndex}
        onChange={() => setIsDeleteByIndex(true)}
      />
      Delete by Index
    </label>
    <label>
      <input
        type="radio"
        checked={!isDeleteByIndex}
        onChange={() => setIsDeleteByIndex(false)}
      />
      Delete by Value
    </label>
  </div>
)}

{selectedOperation === 'Search' && (
  <div className="search-options inline-options">
    <label>
      <input
        type="radio"
        checked={isSearchByIndex}
        onChange={() => setIsSearchByIndex(true)}
      />
      Search by Index
    </label>
    <label>
      <input
        type="radio"
        checked={!isSearchByIndex}
        onChange={() => setIsSearchByIndex(false)}
      />
      Search by Value
    </label>
  </div>
)}


        <button
          onClick={handleVisualize}
          className="visualize-button"
          disabled={!selectedOperation || (selectedOperation !== 'Search' && !inputValue)}
        >
          Visualize
        </button>
      </div>

      <p className="message">{message}</p>

      <div className="visualization-output">
        {visualizationData.length > 0 ? (
          <ul className={`output-list ${operationClass}`}>
            {visualizationData.map((value, index) => (
              <li
                key={index}
                className={`output-item ${highlightedIndex === index ? 'highlight' : ''}`}
                data-index={`Index ${index}`}
              >
                {value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="placeholder-text">The array is empty. Add some values to visualize!</p>
        )}
      </div>
    </div>
  );
};

export default Array;
