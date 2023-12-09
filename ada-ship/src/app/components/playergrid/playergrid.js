'use client'

import { createElement } from "react";
import styles from "./playergrid.css";

import React, { useEffect, useState } from 'react';

export default function PlayerGrid({ width = 10, height = 10, carrier, battleship, destroyer, submarine, patrolBoat }) {
  const [gameboardLogic, setGameboardLogic] = useState([]);

  useEffect(() => {
    const initializeGameboard = () => {
      const initialGameboard = [];

      for (let i = 0; i < width; i++) {
        const row = Array.from({ length: height }, () => '');
        initialGameboard.push(row);
      }

      setGameboardLogic(initialGameboard);
    };

    initializeGameboard();
  }, [width, height]);

  const handleCellClick = (row, column) => {
    // Do something with the clicked cell, for example, update its content
    // access the cell using gameboardLogic[row][column]
    const updatedGameboard = [...gameboardLogic];
    updatedGameboard[row][column] = '🚢';
    setGameboardLogic(updatedGameboard);
    // ❌ 💣 
  };



  // create an autoplace function that can be called during initial generation
  

  return (
    <div className="grid">
      {gameboardLogic.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, columnIndex) => (
            <div
              key={columnIndex}
              className="cell"
              data-row={rowIndex}
              data-column={columnIndex}
              onClick={() => handleCellClick(rowIndex, columnIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}