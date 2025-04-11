import React, { useState, useEffect } from 'react';
import './Stack.css';

const Stack = () => {
  const [stack, setStack] = useState([]); // Stack array
  const [inputValue, setInputValue] = useState(''); // Input value for push operation
  const [operationClass, setOperationClass] = useState(''); // Animation class
  const [peekValue, setPeekValue] = useState(null); // Peeked value
  const [errorMessage, setErrorMessage] = useState(''); // Error message for user feedback
  const MAX_SIZE = 10; // Maximum stack size

  useEffect(() => {
    // Reset animation class after a delay
    if (operationClass) {
      const timeout = setTimeout(() => setOperationClass(''), 1000);
      return () => clearTimeout(timeout);
    }
  }, [operationClass]);

  const handlePush = () => {
    if (!inputValue.trim()) {
      setErrorMessage('Please enter valid values to push.');
      return;
    }

    setErrorMessage('');
    const values = inputValue
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v !== '');

    if (values.length === 0) {
      setErrorMessage('Please enter a valid value to push.');
      return;
    }

    if (stack.length + values.length <= MAX_SIZE) {
      setStack([...stack, ...values]);
      setInputValue('');
      setOperationClass('push-animation');
    } else {
      setErrorMessage(`Stack is full! Maximum size is ${MAX_SIZE}.`);
    }
  };

  const handlePop = () => {
    if (stack.length > 0) {
      const newStack = [...stack];
      newStack.pop(); // Remove last element from stack
      setStack(newStack);
      setOperationClass('pop-animation');
      setPeekValue(null); // Reset peek value
      setErrorMessage('');
    } else {
      setErrorMessage('Stack is empty! Cannot pop.');
    }
  };

  const handlePeek = () => {
    if (stack.length > 0) {
      setPeekValue(stack[stack.length - 1]); // Get the top element
      setErrorMessage('');
    } else {
      setErrorMessage('Stack is empty! No element to peek.');
    }
  };

  const handleIsEmpty = () => {
    alert(stack.length === 0 ? 'The stack is empty.' : 'The stack is not empty.');
  };

  const handleIsFull = () => {
    alert(stack.length === MAX_SIZE ? 'The stack is full.' : 'The stack is not full.');
  };

  const handleSize = () => {
    alert(`Current size of the stack is: ${stack.length}`);
  };

  return (
    <div className="stack-container">
      <h2 className="title">Enhanced Stack Operations Visualization</h2>
      <p className="description">
        A <strong>Stack</strong> is a linear data structure that follows the <strong>Last In, First Out (LIFO)</strong> principle.
        This means the last element added to the stack is the first to be removed. Common operations include:
      </p>
      <ul className="concept-list">
        <li>
          <strong>Push:</strong> Add an element to the top of the stack.
        </li>
        <li>
          <strong>Pop:</strong> Remove the top element from the stack.
        </li>
        <li>
          <strong>Peek:</strong> View the top element without removing it.
        </li>
        <li>
          <strong>IsEmpty:</strong> Check if the stack is empty.
        </li>
        <li>
          <strong>IsFull:</strong> Check if the stack is full.
        </li>
        <li>
          <strong>Size:</strong> Get the current number of elements in the stack.
        </li>
      </ul>

      <div className="controls-section">
        <input
          type="text"
          placeholder="Enter value(s) (comma separated)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="value-input"
        />
        <button onClick={handlePush} className="operation-button push-button">
          Push
        </button>
        <button onClick={handlePop} className="operation-button pop-button" disabled={stack.length === 0}>
          Pop
        </button>
        <button onClick={handlePeek} className="operation-button peek-button" disabled={stack.length === 0}>
          Peek
        </button>
        <button onClick={handleIsEmpty} className="operation-button isEmpty-button">
          Is Empty?
        </button>
        <button onClick={handleIsFull} className="operation-button isFull-button">
          Is Full?
        </button>
        <button onClick={handleSize} className="operation-button size-button">
          Size
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="stack-visualization">
        {stack.length > 0 ? (
          <ul className="stack-list">
            {stack.map((value, index) => (
              <li key={index} className={`stack-item ${operationClass}`}>
                {value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="placeholder-text">The stack is empty.</p>
        )}
      </div>

      {peekValue !== null && (
        <div className="peek-value">Peeked Value: <strong>{peekValue}</strong></div>
      )}
    </div>
  );
};

export default Stack;
