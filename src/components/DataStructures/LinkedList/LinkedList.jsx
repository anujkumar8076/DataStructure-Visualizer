import React, { useState } from 'react';
import './LinkedList.css';
import { Plus, Minus, ArrowUpToLine, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react';

const Node = ({ value, isLast, doublyLinked }) => (
  <div className="node">
    {doublyLinked && <ArrowLeft className="icon" />}
    <div className="circle">{value}</div>
    {!isLast && <ArrowRight className="icon" />}
  </div>
);

const LinkedListVisualizer = ({ values, doublyLinked }) => (
  <div className="list-container">
    {values.map((value, index) => (
      <Node
        key={index}
        value={value}
        isLast={index === values.length - 1}
        doublyLinked={doublyLinked}
      />
    ))}
  </div>
);

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    const newNode = { value, next: null };
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  prepend(value) {
    this.head = { value, next: this.head };
    this.size++;
  }

  delete(value) {
    if (!this.head) return false;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

class DoublyLinkedList extends SinglyLinkedList {
  append(value) {
    const newNode = { value, next: null, prev: null };
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(value) {
    const newNode = { value, next: this.head, prev: null };
    if (this.head) {
      this.head.prev = newNode;
    }
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
  }

  delete(value) {
    if (!this.head) return false;
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}

function App() {
  const [singlyList] = useState(() => new SinglyLinkedList());
  const [doublyList] = useState(() => new DoublyLinkedList());
  const [inputValue, setInputValue] = useState('');
  const [singlyValues, setSinglyValues] = useState([]);
  const [doublyValues, setDoublyValues] = useState([]);

  const handleAdd = (list, setListValues) => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      list.append(value);
      setListValues(list.toArray());
      setInputValue('');
    }
  };

  const handlePrepend = (list, setListValues) => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      list.prepend(value);
      setListValues(list.toArray());
      setInputValue('');
    }
  };

  const handleDelete = (list, setListValues) => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      list.delete(value);
      setListValues(list.toArray());
      setInputValue('');
    }
  };

  const handleClear = (list, setListValues) => {
    list.clear();
    setListValues([]);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Linked List Visualizer</h1>
        <div className="input-group">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input"
            placeholder="Enter a number"
          />
        </div>
        <div className="list-section">
          <div className="list">
            <h2>Singly Linked List</h2>
            <div className="button-group">
              <button
                className="button append"
                onClick={() => handleAdd(singlyList, setSinglyValues)}
              >
                <Plus /> Append
              </button>
              <button
                className="button prepend"
                onClick={() => handlePrepend(singlyList, setSinglyValues)}
              >
                <ArrowUpToLine /> Prepend
              </button>
              <button
                className="button delete"
                onClick={() => handleDelete(singlyList, setSinglyValues)}
              >
                <Minus /> Delete
              </button>
              <button
                className="button clear"
                onClick={() => handleClear(singlyList, setSinglyValues)}
              >
                <Trash2 /> Clear
              </button>
            </div>
            <LinkedListVisualizer values={singlyValues} />
          </div>
          <div className="list">
            <h2>Doubly Linked List</h2>
            <div className="button-group">
              <button
                className="button append"
                onClick={() => handleAdd(doublyList, setDoublyValues)}
              >
                <Plus /> Append
              </button>
              <button
                className="button prepend"
                onClick={() => handlePrepend(doublyList, setDoublyValues)}
              >
                <ArrowUpToLine /> Prepend
              </button>
              <button
                className="button delete"
                onClick={() => handleDelete(doublyList, setDoublyValues)}
              >
                <Minus /> Delete
              </button>
              <button
                className="button clear"
                onClick={() => handleClear(doublyList, setDoublyValues)}
              >
                <Trash2 /> Clear
              </button>
            </div>
            <LinkedListVisualizer values={doublyValues} doublyLinked />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
