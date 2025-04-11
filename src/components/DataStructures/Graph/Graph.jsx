import React, { useState, useCallback } from 'react';
import { Play, RotateCcw, MousePointer2, Flag } from 'lucide-react';
import './Graph.css';

const manhattan = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const reconstructPath = (parent, start, end) => {
  const path = [end];
  let current = end;

  while (current[0] !== start[0] || current[1] !== start[1]) {
    const key = `${current[0]},${current[1]}`;
    current = parent.get(key);
    path.unshift(current);
  }

  return path;
};

const bfs = (grid, start, end) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [start];
  const visited = new Set();
  const parent = new Map();
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (queue.length > 0) {
    const [row, col] = queue.shift();

    if (row === end[0] && col === end[1]) {
      return reconstructPath(parent, start, end);
    }

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      const key = `${newRow},${newCol}`;

      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        grid[newRow][newCol] !== 1 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([newRow, newCol]);
        parent.set(key, [row, col]);
      }
    }
  }

  return [];
};

const dfs = (grid, start, end) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const stack = [start];
  const visited = new Set();
  const parent = new Map();
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (stack.length > 0) {
    const [row, col] = stack.pop();

    if (row === end[0] && col === end[1]) {
      return reconstructPath(parent, start, end);
    }

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      const key = `${newRow},${newCol}`;

      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        grid[newRow][newCol] !== 1 &&
        !visited.has(key)
      ) {
        visited.add(key);
        stack.push([newRow, newCol]);
        parent.set(key, [row, col]);
      }
    }
  }

  return [];
};

const astar = (grid, start, end) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const openSet = [];
  const closedSet = new Set();

  const startNode = {
    position: start,
    g: 0,
    h: manhattan(start, end),
    f: 0,
    parent: null
  };

  startNode.f = startNode.g + startNode.h;
  openSet.push(startNode);

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (openSet.length > 0) {
    let current = openSet[0];
    let currentIndex = 0;

    openSet.forEach((node, index) => {
      if (node.f < current.f) {
        current = node;
        currentIndex = index;
      }
    });

    if (current.position[0] === end[0] && current.position[1] === end[1]) {
      return reconstructPathAstar(current);
    }

    openSet.splice(currentIndex, 1);
    closedSet.add(`${current.position[0]},${current.position[1]}`);

    for (const [dx, dy] of directions) {
      const newRow = current.position[0] + dx;
      const newCol = current.position[1] + dy;
      const key = `${newRow},${newCol}`;

      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        grid[newRow][newCol] !== 1 &&
        !closedSet.has(key)
      ) {
        const gScore = current.g + 1;
        const neighbor = {
          position: [newRow, newCol],
          g: gScore,
          h: manhattan([newRow, newCol], end),
          f: 0,
          parent: current
        };
        neighbor.f = neighbor.g + neighbor.h;

        const existingNode = openSet.find(
          node => node.position[0] === newRow && node.position[1] === newCol
        );

        if (!existingNode || gScore < existingNode.g) {
          if (!existingNode) {
            openSet.push(neighbor);
          } else {
            existingNode.g = gScore;
            existingNode.f = gScore + existingNode.h;
            existingNode.parent = current;
          }
        }
      }
    }
  }

  return [];
};

const reconstructPathAstar = (endNode) => {
  const path = [];
  let current = endNode;

  while (current !== null) {
    path.unshift(current.position);
    current = current.parent;
  }

  return path;
};

const Grid = ({ grid, path, start, end, onCellClick }) => {
  const getCellClass = (row, col) => {
    if (row === start[0] && col === start[1]) {
      return 'cell-start';
    }
    if (row === end[0] && col === end[1]) {
      return 'cell-end';
    }
    if (grid[row][col] === 1) {
      return 'cell-wall';
    }
    if (path.some(([r, c]) => r === row && c === col)) {
      return 'cell-path';
    }
    return 'cell-default';
  };

  return (
    <div
      className="grid-container"
      style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}
    >
      {grid.map((row, i) =>
        row.map((_, j) => (
          <div
            key={`${i}-${j}`}
            className={`grid-cell ${getCellClass(i, j)}`}
            onClick={() => onCellClick(i, j)}
          />
        ))
      )}
    </div>
  );
};

function App() {
  const [grid, setGrid] = useState(() => Array(20).fill(0).map(() => Array(20).fill(0)));
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([19, 19]);
  const [path, setPath] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState('BFS');
  const [mode, setMode] = useState('wall');

  const handleCellClick = useCallback((row, col) => {
    if (mode === 'wall') {
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = newGrid[row][col] === 1 ? 0 : 1;
        return newGrid;
      });
    } else if (mode === 'start') {
      setStart([row, col]);
    } else if (mode === 'end') {
      setEnd([row, col]);
    }
    setPath([]);
  }, [mode]);

  const runAlgorithm = useCallback(() => {
    let newPath = [];
    switch (selectedAlgo) {
      case 'BFS':
        newPath = bfs(grid, start, end);
        break;
      case 'DFS':
        newPath = dfs(grid, start, end);
        break;
      case 'A*':
        newPath = astar(grid, start, end);
        break;
      default:
        break;
    }
    setPath(newPath);
  }, [grid, start, end, selectedAlgo]);

  const resetGrid = useCallback(() => {
    setGrid(Array(20).fill(0).map(() => Array(20).fill(0)));
    setPath([]);
  }, []);

  return (
    <div className="app-container">
      <div className="controls-container">
        <h1 className="title">Pathfinding Visualizer</h1>

        <div className="controls">
          <select
            className="dropdown"
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
          >
            <option value="BFS">Breadth-First Search</option>
            <option value="DFS">Depth-First Search</option>
            <option value="A*">A* Search</option>
          </select>

          <button className="btn btn-run" onClick={runAlgorithm}>
            <Play size={16} /> Run Algorithm
          </button>

          <button className="btn btn-reset" onClick={resetGrid}>
            <RotateCcw size={16} /> Reset Grid
          </button>
        </div>

        <div className="mode-controls">
          <button
            className={`btn ${mode === 'wall' ? 'btn-active' : ''}`}
            onClick={() => setMode('wall')}
          >
            <MousePointer2 size={16} /> Draw Walls
          </button>
          <button
            className={`btn ${mode === 'start' ? 'btn-active' : ''}`}
            onClick={() => setMode('start')}
          >
            <Play size={16} /> Set Start
          </button>
          <button
            className={`btn ${mode === 'end' ? 'btn-active' : ''}`}
            onClick={() => setMode('end')}
          >
            <Flag size={16} /> Set End
          </button>
        </div>
      </div>

      <Grid grid={grid} path={path} start={start} end={end} onCellClick={handleCellClick} />
    </div>
  );
}

export default App;
