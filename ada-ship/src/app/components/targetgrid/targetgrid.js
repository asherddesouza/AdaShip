'use client'

import { createElement } from "react";
import styles from "./targetgrid.css";

import React, { useEffect, useState } from 'react';

export default function TargetGrid({ 
  width = 10, 
  height = 10, 
  gameState,
  onUpdateGameState,
  onUpdateErrorState, 
  onSetErrorMessage,
  clearBoardStatus = false,
  onSetClearBoard,
  autoPlace,
  onSetAutoPlace,
  carrier, 
  battleship, 
  destroyer, 
  submarine, 
  patrolBoat }) {

  const [gameboardLogic, setGameboardLogic] = useState([]);

  useEffect(() => {
    const initializeGameboard = () => {
      const initialGameboard = [];

      let carrierPositionArray = [], carrierCount = carrier
      let battleshipPositionArray = [], battleshipCount = battleship
      let destroyerPositionArray = [], destroyerCount = destroyer
      let submarinePositionArray = [], submarineCount = submarine
      let patrolBoatPositionArray = [], patrolBoatCount = patrolBoat

      if (gameState === "Start"){
        for (let i = 0; i < width; i++) {
          const row = Array.from({ length: height }, () => '');
          initialGameboard.push(row);
        }
  
        for (let i = 0; i < carrier; i++){
          initialGameboard[0][i + 1] = 'C'
          carrierPositionArray.push([0, i + 1])
        }
  
        for (let i = 0; i < battleship; i++) {
          initialGameboard[i + 3][2] = 'B';
          battleshipPositionArray.push([i + 3, 2])
        }
  
        for (let i = 0; i < destroyer; i++) {
          initialGameboard[9][i + 5] = 'D';
          destroyerPositionArray.push([9, i + 5])
        }
  
        for (let i = 0; i < submarine; i++) {
          initialGameboard[i + 2][7] = 'S';
          submarinePositionArray.push([i + 2, 7])
        }
  
        for (let i = 0; i < patrolBoat; i++) {
          initialGameboard[5][i + 4] = 'P';
          patrolBoatPositionArray.push([5, i + 4])
        }

        setGameboardLogic(initialGameboard);
      }

      console.log(`row: ${carrierPositionArray[0][0]}, col: ${carrierPositionArray[0][1]}`) //carrierPositionArray[individualCell][0 is row, 1 is col]
      
    };

    

    initializeGameboard();
  }, [width, height]);

    const handleCellClick = (row, column) => {
      if (gameState === "User Attack"){
      // Do something with the clicked cell, for example, update its content
      // access the cell using gameboardLogic[row][column]
      const updatedGameboard = [...gameboardLogic];

      if (1 == 1){ // if the target has been hit
        updatedGameboard[row][column] = '💣';
      } else { // if the target has been missed
        updatedGameboard[row][column] = '❌';
      }

      setGameboardLogic(updatedGameboard);
      }
    };

    


  // create functions that create shipboards for CPU and player
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