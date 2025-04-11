import React, { useState, useEffect } from "react";
import "./Quiz.css";

const allQuestions = [
  {
    question: "Which data structure uses the LIFO principle?",
    options: ["Stack", "Queue", "Array", "LinkedList"],
    correct: "Stack",
  },
  {
    question: "Which data structure allows insertion and deletion at both ends?",
    options: ["Deque", "Stack", "Queue", "Heap"],
    correct: "Deque",
  },
  {
    question: "Which data structure is used to implement recursion?",
    options: ["Queue", "Stack", "Tree", "Array"],
    correct: "Stack",
  },
  {
    question: "Which non-linear data structure is used to represent hierarchical relationships?",
    options: ["Graph", "Tree", "Heap", "LinkedList"],
    correct: "Tree",
  },
  {
    question: "What is a common operation in a HashMap?",
    options: ["Hashing", "Pushing", "Traversal", "Recursion"],
    correct: "Hashing",
  },
  {
    question: "Which data structure is best for shortest path algorithms?",
    options: ["Graph", "Array", "Queue", "Trie"],
    correct: "Graph",
  },
  {
    question: "Which data structure is used for priority queue implementation?",
    options: ["Heap", "Tree", "Stack", "Graph"],
    correct: "Heap",
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correct: "O(log n)",
  },
  {
    question: "Which data structure is used in Breadth-First Search (BFS)?",
    options: ["Queue", "Stack", "Heap", "Graph"],
    correct: "Queue",
  },
  {
    question: "What is a characteristic of a binary search tree?",
    options: ["All nodes have two children", "Left child is smaller than parent", "Parent is always smaller than children", "Nodes are sorted level by level"],
    correct: "Left child is smaller than parent",
  },
  {
    question: "Which algorithm is used to sort an array efficiently?",
    options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
    correct: "Quick Sort",
  },
  {
    question: "Which data structure uses hashing for efficient lookups?",
    options: ["HashMap", "Queue", "Stack", "Binary Tree"],
    correct: "HashMap",
  },
  {
    question: "Which data structure can be used to implement a LRU Cache?",
    options: ["Deque", "Stack", "Priority Queue", "HashMap"],
    correct: "Deque",
  },
  {
    question: "Which traversal technique is not depth-first?",
    options: ["In-order", "Breadth-First", "Pre-order", "Post-order"],
    correct: "Breadth-First",
  },
  {
    question: "Which data structure is most suitable for undo operations?",
    options: ["Stack", "Queue", "Heap", "Graph"],
    correct: "Stack",
  },
  {
    question: "What is the purpose of a Trie data structure?",
    options: ["Storing strings efficiently", "Implementing LIFO operations", "Sorting elements", "Balancing trees"],
    correct: "Storing strings efficiently",
  },
  {
    question: "What is the primary use of a graph data structure?",
    options: ["Hierarchical relationships", "Connecting nodes and edges", "Sorting elements", "Implementing LIFO operations"],
    correct: "Connecting nodes and edges",
  },
  {
    question: "Which data structure is used for function call stack management?",
    options: ["Queue", "Stack", "Heap", "Binary Tree"],
    correct: "Stack",
  },
  {
    question: "What is the difference between a binary tree and a binary search tree?",
    options: ["Binary trees are unsorted", "Binary trees always have two children", "Binary search trees do not allow duplicates", "Binary search trees are sorted"],
    correct: "Binary search trees are sorted",
  },
  {
    question: "Which data structure supports First-In-First-Out (FIFO) operations?",
    options: ["Queue", "Stack", "Deque", "Heap"],
    correct: "Queue",
  },
  {
    question: "What is the time complexity of searching in a HashMap?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correct: "O(1)",
  },
  {
    question: "What is the primary use of a priority queue?",
    options: ["Retrieving the smallest or largest element", "Storing hierarchical data", "Implementing FIFO operations", "Traversing graphs"],
    correct: "Retrieving the smallest or largest element",
  },
  {
    question: "What is the main characteristic of a circular queue?",
    options: ["Elements wrap around", "Always sorted", "Allows unlimited size", "Uses hashing"],
    correct: "Elements wrap around",
  },
  {
    question: "Which sorting algorithm is considered stable?",
    options: ["Merge Sort", "Heap Sort", "Quick Sort", "Selection Sort"],
    correct: "Merge Sort",
  },
  {
    question: "What is the time complexity of inserting into a binary heap?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n^2)"],
    correct: "O(log n)",
  },
  {
    question: "What type of graph has edges with weights?",
    options: ["Weighted graph", "Directed graph", "Undirected graph", "Complete graph"],
    correct: "Weighted graph",
  },
  {
    question: "Which traversal is used to serialize a binary tree?",
    options: ["Level-order", "In-order", "Pre-order", "Post-order"],
    correct: "Level-order",
  },
  {
    question: "What is the main feature of a balanced binary search tree?",
    options: ["Height is minimized", "All levels are full", "Duplicates are allowed", "Elements are unsorted"],
    correct: "Height is minimized",
  },
  {
    question: "Which data structure is used to implement a graph?",
    options: ["Adjacency list", "Heap", "Binary Tree", "Deque"],
    correct: "Adjacency list",
  },
  {
    question: "Which graph traversal technique uses a stack?",
    options: ["Depth-First Search", "Breadth-First Search", "Level-Order", "Topological Sort"],
    correct: "Depth-First Search",
  },
  {
    question: "Which data structure is used for dynamic programming?",
    options: ["Array", "HashMap", "Graph", "Trie"],
    correct: "Array",
  },
  {
    question: "What is the purpose of a red-black tree?",
    options: ["Self-balancing binary search tree", "Storing strings", "Efficient traversal", "Sorting data"],
    correct: "Self-balancing binary search tree",
  },
  {
    question: "What is a sparse matrix?",
    options: ["A matrix with many zero entries", "A matrix with equal rows and columns", "A sorted matrix", "A graph representation"],
    correct: "A matrix with many zero entries",
  },
  {
    question: "What is a key feature of a doubly linked list?",
    options: ["Nodes point to both next and previous nodes", "Nodes are sorted", "Only forward traversal is possible", "It is implemented using arrays"],
    correct: "Nodes point to both next and previous nodes",
  },
  {
    question: "Which data structure is best suited for implementing recursion?",
    options: ["Stack", "Queue", "Heap", "Graph"],
    correct: "Stack",
  },
  {
    question: "Which data structure supports hierarchical data representation?",
    options: ["Tree", "Graph", "HashMap", "Array"],
    correct: "Tree",
  },
  {
    question: "Which traversal technique visits nodes level by level?",
    options: ["Breadth-First", "Depth-First", "Pre-order", "Post-order"],
    correct: "Breadth-First",
  },
  {
    question: "What is the purpose of a heap in priority queues?",
    options: ["Efficient insertion and retrieval of priority elements", "Storing hierarchical data", "Sorting elements", "Implementing LIFO operations"],
    correct: "Efficient insertion and retrieval of priority elements",
  },
  {
    question: "What is the key feature of a complete binary tree?",
    options: ["All levels are completely filled", "Nodes are sorted", "No duplicates allowed", "Elements wrap around"],
    correct: "All levels are completely filled",
  },
  {
    question: "Which data structure is suitable for implementing stacks efficiently?",
    options: ["Array", "Linked List", "Heap", "Tree"],
    correct: "Array",
  },
  {
    question: "What is the purpose of a graph adjacency matrix?",
    options: ["Representing graph connections", "Sorting edges", "Balancing trees", "Storing hierarchical data"],
    correct: "Representing graph connections",
  },
  {
    question: "Which graph algorithm is used to detect cycles?",
    options: ["Depth-First Search", "Breadth-First Search", "Kruskal's Algorithm", "Dijkstra's Algorithm"],
    correct: "Depth-First Search",
  },
  {
    question: "What is the purpose of hashing in data structures?",
    options: ["Efficiently store and retrieve data", "Sort data elements", "Implement graph traversal", "Balance binary trees"],
    correct: "Efficiently store and retrieve data",
  },
  {
    question: "Which data structure is used in Kruskal's algorithm?",
    options: ["Disjoint Set", "Queue", "Stack", "Graph"],
    correct: "Disjoint Set",
  },
  {
    question: "What is a key property of a minimum spanning tree?",
    options: ["Minimum total edge weight", "Maximum edge weight", "All nodes are connected", "No cycles"],
    correct: "Minimum total edge weight",
  },
  {
    question: "Which data structure uses a parent-child relationship?",
    options: ["Tree", "Graph", "HashMap", "Stack"],
    correct: "Tree",
  },
  {
    question: "Which traversal is best for finding the shortest path in an unweighted graph?",
    options: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm", "Prim's Algorithm"],
    correct: "Breadth-First Search",
  },
  {
    question: "What is the key feature of a Fibonacci heap?",
    options: ["Supports amortized O(1) decrease key operation", "Binary structure", "Efficient for balancing trees", "Stores strings efficiently"],
    correct: "Supports amortized O(1) decrease key operation",
  },
];


const getRandomQuestions = (questions, count) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const QuizPage = () => {
  const [questions, setQuestions] = useState(getRandomQuestions(allQuestions, 10));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(30);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    } else {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct Answer!");
    } else {
      setFeedback(`Incorrect! Correct Answer: ${questions[currentQuestion].correct}`);
    }
    setTimeout(() => {
      setFeedback("");
      setSelectedOption("");
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setTimer(30);
      } else {
        setIsSubmitted(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestions(getRandomQuestions(allQuestions, 10));
    setCurrentQuestion(0);
    setIsSubmitted(false);
    setSelectedOption("");
    setTimer(30);
    setFeedback("");
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Data Structure Quiz</h1>

      {!isSubmitted ? (
        <>
          <div className="progress-section">
            <p>
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="question-section">
            <h2 className="question">
              Q{currentQuestion + 1}: {questions[currentQuestion].question}
            </h2>
            <p className="timer">Time Left: {timer}s</p>
          </div>

          <div className="options-section">
            {questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`option ${selectedOption === option ? "selected-option" : ""
                  }`}
              >
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </div>

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!selectedOption || feedback !== ""}
          >
            {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next"}
          </button>

          {feedback && <p className="feedback animated-fade">{feedback}</p>}
        </>
      ) : (
        <div className="result-section">
          <h2 className="result-title">Quiz Completed!</h2>
          <p className="score-text">
            Your Score: {score} / {questions.length}
          </p>
          <p className="feedback">
            {score >= questions.length / 2
              ? "Great job! Keep it up!"
              : "Keep practicing to improve!"}
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
