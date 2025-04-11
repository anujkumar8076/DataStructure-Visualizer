import React, { useState } from 'react';
import './Queue.css';

const Queue = () => {
  const [queueType, setQueueType] = useState('Simple Queue'); // Selected queue type
  const [queue, setQueue] = useState([]); // Queue data
  const [inputValues, setInputValues] = useState(''); // Input values (comma-separated)
  const [front, setFront] = useState(0); // Front pointer for Circular Queue

  const maxSize = 5; // Max size for Circular Queue

  const enqueue = () => {
    const values = inputValues
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v !== '');

    if (values.length === 0) {
      alert('Please enter one or more values to enqueue.');
      return;
    }

    setQueue((prevQueue) => {
      if (queueType === 'Circular Queue') {
        if (prevQueue.length + values.length > maxSize) {
          alert(`Circular Queue will overflow! Max size is ${maxSize}.`);
          return prevQueue;
        }
        return [...prevQueue.slice(front), ...prevQueue.slice(0, front), ...values].slice(-maxSize);
      } else if (queueType === 'Priority Queue') {
        // Convert elements to numbers and sort numerically
        return [...prevQueue, ...values].sort((a, b) => parseInt(a) - parseInt(b));
      } else if (queueType === 'Double-Ended Queue') {
        return [...prevQueue, ...values];
      }
      return [...prevQueue, ...values]; // Simple Queue
    });
    setInputValues('');
  };


  const enqueueFront = () => {
    const values = inputValues
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v !== '');

    if (values.length === 0) {
      alert('Please enter one or more values to enqueue at the front.');
      return;
    }

    setQueue((prevQueue) => {
      if (queueType === 'Double-Ended Queue') {
        return [...values, ...prevQueue];
      }
      alert('Enqueue Front is not supported for this queue type.');
      return prevQueue;
    });
    setInputValues('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      alert('Queue is empty!');
      return;
    }

    setQueue((prevQueue) => {
      if (queueType === 'Priority Queue') {
        return prevQueue.slice(1); // Remove the highest priority element
      } else if (queueType === 'Circular Queue') {
        setFront((front + 1) % maxSize);
        return prevQueue.slice(1);
      }
      return prevQueue.slice(1); // Remove from the front
    });
  };

  const dequeueRear = () => {
    if (queue.length === 0) {
      alert('Queue is empty!');
      return;
    }
    setQueue((prevQueue) => {
      if (queueType === 'Double-Ended Queue') {
        return prevQueue.slice(0, -1); // Remove from the rear
      }
      alert('Dequeue Rear is not supported for this queue type.');
      return prevQueue;
    });
  };

  const peek = () => {
    if (queue.length === 0) {
      alert('Queue is empty!');
    } else {
      alert(`Front of the queue: ${queue[front]}`);
    }
  };

  const peekRear = () => {
    if (queue.length === 0) {
      alert('Queue is empty!');
    } else {
      alert(`Rear of the queue: ${queue[queue.length - 1]}`);
    }
  };

  const clearQueue = () => {
    setQueue([]);
    setFront(0);
    alert('Queue has been cleared!');
  };

  const getQueueVisualization = () => {
    const elements = queue.map((value, index) => (
      <div key={index} className={`queue-node ${queueType.toLowerCase().replace(/ /g, '-')}`}>
        {value}
        {index === front ? <span className="front-indicator">Front</span> : null}
        {index === queue.length - 1 ? <span className="rear-indicator">Rear</span> : null}

      </div>
    ));
  
    // Visual connection for Circular Queue
    if (queueType === 'Circular Queue' && queue.length > 1) {
      return (
        <div className="queue-wrapper">
          {elements}
          <svg className="arrow-back-to-front" height="50" width="100%">
            <line x1="0" y1="25" x2="100%" y2="25" style={{stroke: 'rgb(255, 0, 0)', strokeWidth: 2}} />
            <polyline points={`${elements.length * 50 - 25},25 ${elements.length * 50},20 ${elements.length * 50},30`} style={{fill: 'red'}} />
          </svg>
        </div>
      );
    } else {
      return elements;
    }
  };
  
 
  
  
  return (
    <div className="queue-container">
      <h1 className="title">Advanced Queue Visualization</h1>
      <p className="description">
        A <strong>Queue</strong> is a linear data structure that supports various types and operations:
      </p>
      <ul className="concept-list">
        <li><strong>Simple Queue:</strong> Basic FIFO behavior.</li>
        <li><strong>Circular Queue:</strong> Connects the end to the front, utilizing fixed size.</li>
        <li><strong>Priority Queue:</strong> Elements are dequeued based on priority.</li>
        <li><strong>Double-Ended Queue:</strong> Allows insertion and deletion from both ends.</li>
      </ul>

      <div className="input-section">
        <select value={queueType} onChange={(e) => setQueueType(e.target.value)}>
          <option>Simple Queue</option>
          <option>Circular Queue</option>
          <option>Priority Queue</option>
          <option>Double-Ended Queue</option>
        </select>

        <input
          type="text"
          value={inputValues}
          onChange={(e) => setInputValues(e.target.value)}
          placeholder="Enter values (comma-separated)"
          className="value-input"
        />

        <button onClick={enqueue} className="operation-button enqueue-button">
          Enqueue
        </button>

        {queueType === 'Double-Ended Queue' && (
          <button onClick={enqueueFront} className="operation-button enqueue-front-button">
            Enqueue Front
          </button>
        )}

        <button onClick={dequeue} className="operation-button dequeue-button">
          Dequeue
        </button>

        {queueType === 'Double-Ended Queue' && (
          <button onClick={dequeueRear} className="operation-button dequeue-rear-button">
            Dequeue Rear
          </button>
        )}

        <button onClick={peek} className="operation-button peek-button">
          Peek
        </button>

        {queueType === 'Double-Ended Queue' && (
          <button onClick={peekRear} className="operation-button peek-rear-button">
            Peek Rear
          </button>
        )}

        <button onClick={clearQueue} className="operation-button clear-button">
          Clear
        </button>
      </div>

      <div className="queue-visualization">
        {queue.length > 0 ? (
          getQueueVisualization()
        ) : (
          <p className="placeholder-text">The queue is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Queue;
