import React, { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const boardSize = 12; // The size of the board
  // The state for the board
  const [board, setBoard] = useState(
    Array(boardSize)
      .fill()
      .map(() => Array(boardSize).fill())
  );

  const [circlePosition, setCirclePosition] = useState(0); // New state for the circle position
  const [path, setPath] = useState([]); // New state for the path
  const [intervalTime, setIntervalTime] = useState(1000); // New state for the interval time

  useEffect(() => {
    const generatedPath = generateRandomPath(boardSize); // Generate a random path
    setPath(generatedPath); // Save the path to state
    // Create a new board with the path marked in red
    const newBoard = board.map((row, i) =>
      row.map((_, j) => (generatedPath.includes(`${i}-${j}`) ? "red" : ""))
    );
    setBoard(newBoard);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCirclePosition((prevPosition) => prevPosition + 1);
    }, intervalTime); // Use the interval time from state
    return () => clearInterval(timer); // Clean up the timer when the component unmounts
  }, [intervalTime]); // Re-run the effect when the interval time changes

  // Function to generate a random path from top-left to bottom-right
  const generateRandomPath = (size) => {
    let path = ["0-0"];
    let current = [0, 0];
    // While we haven't reached the bottom-right
    while (current[0] !== size - 1 || current[1] !== size - 1) {
      let direction = Math.random() < 0.5 ? "right" : "down";
      if (current[0] === size - 1) direction = "right";
      if (current[1] === size - 1) direction = "down";
      if (direction === "right") current[1]++;
      else current[0]++;
      path.push(`${current[0]}-${current[1]}`);
    }
    return path;
  };

  return (
    <div className="board">
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => (
            <div className={`cell ${cell}`} key={j}>
              {`${i}-${j}` === path[circlePosition] && (
                <div className="circle" onClick={() => {
                  setCirclePosition(-1); // Set the circle position to -1 when clicked
                  setIntervalTime((prevTime) => Math.max(100, prevTime - 100)); // Decrease the interval time by 100ms, but don't go below 100ms
                }} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};