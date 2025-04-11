import React, { useState } from "react";
import "./Bubble.css";

const BubbleSortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [message, setMessage] = useState("Enter an array or generate one to start!");

    // Function to generate a random array
    const generateArray = () => {
        const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
        setArray(randomArray);
        setMessage("Generated a random array. Click 'Sort' to start sorting!");
    };

    // Bubble Sort implementation with visualization
    const bubbleSort = async () => {
        setIsSorting(true);
        let tempArray = [...array];
        let n = tempArray.length;

        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                setMessage(`Comparing ${tempArray[j]} and ${tempArray[j + 1]}...`);
                await sleep(500);

                if (tempArray[j] > tempArray[j + 1]) {
                    setMessage(`Swapping ${tempArray[j]} and ${tempArray[j + 1]}!`);
                    [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
                    swapped = true;
                    setArray([...tempArray]);
                    await sleep(500);
                }
            }
            if (!swapped) break;
        }

        setMessage("Array is sorted!");
        setIsSorting(false);
    };

    // Helper function to delay execution
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Handle user input for custom array
    const handleInputChange = (e) => {
        const input = e.target.value;
        const inputArray = input.split(",").map((num) => parseInt(num.trim()));
        if (inputArray.some(isNaN)) {
            setMessage("Please enter valid numbers separated by commas.");
            return;
        }
        setArray(inputArray);
        setMessage("Custom array set. Click 'Sort' to start sorting!");
    };

    // Reset array and messages
    const resetArray = () => {
        setArray([]);
        setMessage("Enter an array or generate one to start!");
    };

    return (
        <div className="bubble-sort-visualizer">
            <h1>Bubble Sort Visualizer</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Enter numbers separated by commas"
                    onChange={handleInputChange}
                    disabled={isSorting}
                />
                <button onClick={generateArray} disabled={isSorting}>
                    Generate Random Array
                </button>
                <button onClick={bubbleSort} disabled={isSorting || array.length === 0}>
                    Sort
                </button>
                <button onClick={resetArray} disabled={isSorting}>
                    Reset
                </button>
            </div>
            <div className="array-container">
                {array.map((value, index) => (
                    <div
                        key={index}
                        className="array-bar"
                        style={{ height: `${value}px` }}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <p className="message">{message}</p>
        </div>
    );
};

export default BubbleSortVisualizer;
