import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import QuizPage from './components/Quiz/Quiz';
import VisualizationPage from './components/pages/VisualizationPage/VisualizationPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Array from './components/DataStructures/Array/Array';
import Stack from './components/DataStructures/Stack/Stack';
import Tree from './components/DataStructures/Tree/Tree';
import LinkedList from './components/DataStructures/LinkedList/LinkedList';
import Queue from './components/DataStructures/Queue/Queue';
import Graph from './components/DataStructures/Graph/Graph';
import SplashScreen from './components/SplashScreen';
import HashMap from './components/DataStructures/HashMap/HashMap';
import HashSet from './components/DataStructures/HashSet/HashSet';
import Trie from './components/DataStructures/Trie/Trie';
import Heap from './components/DataStructures/Heap/Heap';

import BST from './components/DataStructures/BST/Tree';


function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000); // Splash screen visible for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app">
        {isSplashVisible ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} /> {/* Updated path */}
              <Route path="/visualize/arrays" element={<Array />} />
              <Route path="/visualize/hashmaps" element={<HashMap />} />
              <Route path="/visualize/hashsets" element={<HashSet />} />
              <Route path="/visualize/tries" element={<Trie />} />
              <Route path="/visualize/heaps" element={<Heap />} />
              <Route path="/visualize/stacks" element={<Stack />} />

              <Route path="/visualize/bsts" element={<BST />} />
              <Route path="/visualize/avls" element={<Tree />} />
              <Route path="/visualize/graphs" element={<Graph />} />
              <Route path="/visualize/queues" element={<Queue />} />
              <Route path="/visualize/linkedlists" element={<LinkedList />} />
              <Route path="/visualize/:dataStructure" element={<VisualizationPage />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
