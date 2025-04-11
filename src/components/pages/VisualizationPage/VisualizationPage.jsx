// src/pages/VisualizationPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VisualizationPage.css';

const operationsByDataStructure = {
  array: ['Insert', 'Delete', 'Update', 'Search'],
  'linked list': ['Insert at Head', 'Insert at Tail', 'Delete', 'Update', 'Search'],
  stack: ['Push', 'Pop', 'Peek'],
  queue: ['Enqueue', 'Dequeue', 'Peek'],
  tree: ['Insert Node', 'Delete Node', 'Traverse', 'Search'],
  graph: ['Add Vertex', 'Add Edge', 'Remove Vertex', 'Remove Edge', 'Search'],
};

const VisualizationPage = () => {
  const { dataStructure } = useParams();
  const [values, setValues] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [visualizationData, setVisualizationData] = useState([]);
  const [operationClass, setOperationClass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (operationClass) {
      const timeout = setTimeout(() => setOperationClass(''), 1000);
      return () => clearTimeout(timeout);
    }
  }, [operationClass]);

  const handleVisualize = () => {
    try {
      if (!values.trim()) throw new Error('Input cannot be empty.');
      if (!selectedOperation) throw new Error('Please select an operation.');

      const inputData = values.split(',').map((val) => {
        const number = parseFloat(val.trim());
        if (isNaN(number)) throw new Error('All inputs must be numbers.');
        return number;
      });

      let visualizationResult = [];
      let opClass = '';

      switch (selectedOperation) {
        case 'Insert':
        case 'Insert at Head':
        case 'Insert at Tail':
          visualizationResult = [...inputData, 'Inserted'];
          opClass = 'insert-animation';
          break;
        case 'Delete':
        case 'Pop':
        case 'Dequeue':
        case 'Remove Vertex':
          visualizationResult = inputData.slice(0, -1);
          opClass = 'delete-animation';
          break;
        case 'Update':
          visualizationResult = inputData.map((val) => val + 1);
          opClass = 'update-animation';
          break;
        case 'Search':
          visualizationResult = inputData.filter((val) => val === inputData[0]);
          opClass = 'search-animation';
          break;
        case 'Push':
          visualizationResult = [...inputData, 'Pushed'];
          opClass = 'insert-animation';
          break;
        case 'Peek':
        case 'Traverse':
          visualizationResult = inputData;
          opClass = 'peek-animation';
          break;
        default:
          visualizationResult = inputData;
      }

      setVisualizationData(visualizationResult);
      setOperationClass(opClass);
      setError('');
    } catch (err) {
      setError(err.message);
      setVisualizationData([]);
      setOperationClass('');
    }
  };

  return (
    <div className="visualization-container">
      <h2 className="title">Visualize {dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1)}</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter values separated by commas (e.g., 1,2,3)"
          value={values}
          onChange={(e) => setValues(e.target.value)}
          className="value-input"
        />

        <select
          value={selectedOperation}
          onChange={(e) => setSelectedOperation(e.target.value)}
          className="operation-select"
        >
          <option value="">Select an operation</option>
          {operationsByDataStructure[dataStructure.toLowerCase()]?.map((operation) => (
            <option key={operation} value={operation}>
              {operation}
            </option>
          ))}
        </select>

        <button
          onClick={handleVisualize}
          className="visualize-button"
          disabled={!selectedOperation}
        >
          Visualize
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="visualization-output">
        {visualizationData.length > 0 ? (
          <ul className={`output-list ${operationClass}`}>
            {visualizationData.map((value, index) => (
              <li key={index} className="output-item">
                {value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="placeholder-text">Visualization will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default VisualizationPage;
