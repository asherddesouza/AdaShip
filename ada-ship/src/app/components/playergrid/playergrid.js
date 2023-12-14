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
  clearBoardStatus = false,
  carrier, 
  battleship, 
  destroyer, 
  submarine, 
  patrolBoat }) {
  
  const [gameboardLogic, setGameboardLogic] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    const clearBoard = () => {
      if (clearBoardStatus && gameState === "User Carrier Selection"){
        const updatedGameboard = [...gameboardLogic];

        for (let i = 0; i < width; i++){
          for (let j = 0; j < height; j++){
            updatedGameboard[i][j] = ' ';
          }
        }
        setGameboardLogic(updatedGameboard);
      }
    }

    clearBoard();
  }, [clearBoardStatus]);

  useEffect(() => {
    const checkShipValidPlacement = () => {
      //if the Cs are placed in a perfect row/column, then move on
      // otherwise, throw an error

      if (gameState === "User Ship Selection Validation"){
        console.log("cheese")
        // need to implement this ^^ when continue is clicked
      }
    }

    checkShipValidPlacement()
  }, [gameState])

  const handleCellClick = (row, column) => {
    const updatedGameboard = [...gameboardLogic];

    if (gameState === "User Carrier Selection"){
    // Do something with the clicked cell, for example, update its content
    // access the cell using gameboardLogic[row][column]
    updatedGameboard[row][column] = 'C';
} 
    
    else if (gameState === "User Battleship Selection"){
      updatedGameboard[row][column] = 'B';
    }

    else if (gameState === "User Destroyer Selection"){
      updatedGameboard[row][column] = 'D';
    }

    else if (gameState === "User Submarine Selection"){
      updatedGameboard[row][column] = 'S';
    }

    else if (gameState === "User Patrol Boat Selection"){
      updatedGameboard[row][column] = 'P';
    }
    
    else if (gameState === "Start"){
      onUpdateErrorState(true)
      onSetErrorMessage("Press Start before trying to place your ships")
    }

    setGameboardLogic(updatedGameboard);
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