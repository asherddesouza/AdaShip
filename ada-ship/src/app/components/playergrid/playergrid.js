'use client'

import styles from "./playergrid.css";

import React, { useEffect, useState } from 'react';
import ErrorModal from "../errormodal/errormodal";

export default function PlayerGrid({ 
  width = 10, 
  height = 10, 
  gameState, 
  onUpdateErrorState, 
  onSetErrorMessage,
  clearBoardStatus,
  carrier, 
  battleship, 
  destroyer, 
  submarine, 
  patrolBoat }) {
  
  const [gameboardLogic, setGameboardLogic] = useState([]);

  useEffect(() => {
    if (gameState === "Start" || clearBoardStatus){
      // try to get this working
    }
    
    const initialiseGameboard = () => {
      const initialGameboard = [];

      for (let i = 0; i < width; i++) {
        const row = Array.from({ length: height }, () => '');
        initialGameboard.push(row);
      }

      setGameboardLogic(initialGameboard);
    };

    initialiseGameboard();
  }, [width, height]);

  const handleCellClick = (row, column) => {
    if (gameState === "User Carrier Selection"){
    // Do something with the clicked cell, for example, update its content
    // access the cell using gameboardLogic[row][column]
    const updatedGameboard = [...gameboardLogic];
    updatedGameboard[row][column] = 'C';
    setGameboardLogic(updatedGameboard);
    } else if (gameState === "FOO BAR"){
      pass
    }
    
    else if (gameState === "Start"){
      onUpdateErrorState(true)
      onSetErrorMessage("Press Start before trying to place your ships")
    }
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