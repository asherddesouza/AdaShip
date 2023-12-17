'use client'

import styles from "./playergrid.css";

import React, { useEffect, useState } from 'react';
import ErrorModal from "../errormodal/errormodal";

export default function PlayerGrid({ 
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

      onSetClearBoard(false)
    }

    clearBoard();
  }, [clearBoardStatus]);

  useEffect(() => {
    const checkShipValidPlacement = () => {
      //if the ships are placed in a perfect row/column, then move on
      // otherwise, throw an error

      const checkShipCorrectDirection = (shipType, shipLength) => {
        let firstOccurrenceRow, firstOccurrenceColumn // looks at bottom right instead of top left

        for (let i = 0; i < width; i++){
          for (let j = 0; j < height; j++){
            if (gameboardLogic[i][j] == shipType){
              [firstOccurrenceRow, firstOccurrenceColumn] = [i, j]
            }
          }
        }

        let horizontalCheck = true;
        let verticalCheck = true;

        //horizontal check
        for (let i = 0; i < shipLength; i++) {
          if (
            firstOccurrenceColumn - i < 0 ||
            firstOccurrenceColumn - i >= width ||
            gameboardLogic[firstOccurrenceRow][firstOccurrenceColumn - i] !== shipType
          ) {
            horizontalCheck = false;
            break;
          }
        }

        if (horizontalCheck){return horizontalCheck}

        //vertical check
        for (let i = 0; i < shipLength; i++) {
          if (
            firstOccurrenceRow - i < 0 ||
            firstOccurrenceRow - i >= height ||
            gameboardLogic[firstOccurrenceRow - i][firstOccurrenceColumn] !== shipType
          ) {
            verticalCheck = false;
            break;
          }
        }

        //final return
        if (verticalCheck){
          return verticalCheck
        } else return false
      }

      if (gameState === "User Ship Selection Validation"){
        let carrierCount = 0
        let battleshipCount = 0
        let destroyerCount = 0
        let submarineCount = 0
        let patrolboatCount = 0

        for (let i = 0; i < width; i++){
          for (let j = 0; j < height; j++){
            if (gameboardLogic[i][j] == 'C'){
              carrierCount++
            } else if (gameboardLogic[i][j] == 'B'){
              battleshipCount++
            } else if (gameboardLogic[i][j] == 'D'){
              destroyerCount++
            } else if (gameboardLogic[i][j] == 'S'){
              submarineCount++
            } else if (gameboardLogic[i][j] == 'P'){
              patrolboatCount++
            }
          }
        }
        
        if (carrierCount != carrier){
          onUpdateGameState("Invalid Ship Placement")
          onUpdateErrorState(true)
          onSetErrorMessage(`Invalid number of Carriers placed (${carrierCount}), you can only place ${carrier} (click to restart)`)
        } else if (battleshipCount != battleship){
          onUpdateGameState("Invalid Ship Placement")
          onUpdateErrorState(true)
          onSetErrorMessage(`Invalid number of Battleships placed (${battleshipCount}), you can only place ${battleship} (click to restart)`)
        } else if (destroyerCount != destroyer){
          onUpdateGameState("Invalid Ship Placement")
          onUpdateErrorState(true)
          onSetErrorMessage(`Invalid number of Destroyers placed (${destroyerCount}), you can only place ${destroyer} (click to restart)`)
        } else if (submarineCount != submarine){
          onUpdateGameState("Invalid Ship Placement")
          onUpdateErrorState(true)
          onSetErrorMessage(`Invalid number of Submarines placed (${submarineCount}), you can only place ${submarine} (click to restart)`)
        } else if (patrolboatCount != patrolBoat){
          onUpdateGameState("Invalid Ship Placement")
          onUpdateErrorState(true)
          onSetErrorMessage(`Invalid number of Patrol Boats placed (${patrolboatCount}), you can only place ${patrolBoat} (click to restart)`)
        } else if (carrierCount == carrier){
            if (
              checkShipCorrectDirection("C", carrier) &&
              checkShipCorrectDirection("B", battleship) &&
              checkShipCorrectDirection("D", destroyer) &&
              checkShipCorrectDirection("S", submarine) &&
              checkShipCorrectDirection("P", patrolBoat)
            ){
              onUpdateGameState("Validated User Ship Selection")
            } else {
              onUpdateGameState("Invalid Ship Placement")
              onUpdateErrorState(true)
              onSetErrorMessage("Some of your ships had invalid placements, try again. (click to restart)")
            }
        }
      }
    }

    checkShipValidPlacement()
  }, [gameState])

  useEffect(() => {
  const autoPlaceShips = () => {
    const getIndexWithinRange = (max) => {
      return Math.floor(Math.random() * (max))
    }

    setGameboardLogic((currentGameboard) => {
      const updatedGameboard = [...currentGameboard];

      if (autoPlace === "Carrier") {
        const carrierColumnBound = getIndexWithinRange(carrier)

        let count = 0

        for (let i = 0; i < carrier; i++) {
          updatedGameboard[0][carrierColumnBound + i] = 'C';
          count++
        }

        onUpdateErrorState(true)
        onSetErrorMessage(`columnBound: ${carrierColumnBound} // i: ${count} // columnBound + i: ${carrierColumnBound + count}`)
      }


      return updatedGameboard;
    });
  };

  autoPlaceShips();
}, [autoPlace]);

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