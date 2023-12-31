'use client'

import styles from "./playergrid.css";

import React, { useEffect, useState } from 'react';

export default function PlayerGrid({ 
  width = 10, 
  height = 10, 
  gameState,
  userMessage,
  onUpdateUserMessage,
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

  const determineShipOrientation = () => {
    return Math.random() < 0.5 ? "Horizontal" : "Vertical"
  }


  useEffect(() => {
  const autoPlaceShips = () => {

    let carrierPosition = Math.floor(Math.random() * carrier + 1) 
    let battleshipPosition = Math.floor(Math.random() * (battleship - 1) + 1)
    let destroyerPosition = Math.floor(Math.random() * destroyer + 2)
    let submarinePosition = Math.floor(Math.random() * submarine + 2)
    let patrolBoatPosition = Math.random() < 0.5 ? 4 : 5

    const carrierOrientation = determineShipOrientation()
    const battleshipOrientation = determineShipOrientation()
    const destroyerOrientation = determineShipOrientation()
    const submarineOrientation = determineShipOrientation()
    const patrolBoatOrientation = determineShipOrientation()


    setGameboardLogic((currentGameboard) => {
      const updatedGameboard = [...currentGameboard]; //updatedGameboard[row][column]

      if (autoPlace === "Autoplace All") {
        // carrier placement
        if (carrierOrientation === "Horizontal"){
          for (let i = 0; i < carrier; i++) {
            updatedGameboard[0][i + carrierPosition] = `C`;
          }
        } 
        else if (carrierOrientation === "Vertical"){
          for (let i = 0; i < carrier; i++) {
            updatedGameboard[i + carrierPosition][9] = `C`;
          }
        }

        //battleship placement
        if (battleshipOrientation === "Horizontal"){

          for (let i = 0; i < battleship; i++) {
            updatedGameboard[1][i + battleshipPosition] = `B`;
          }
        } 
        else if (battleshipOrientation === "Vertical"){
          for (let i = 0; i < battleship; i++) {
            updatedGameboard[i + battleshipPosition][1] = `B`;
          }
        }

        //destroyer placement
        if (destroyerOrientation === "Horizontal"){
          for (let i = 0; i < destroyer; i++) {
            updatedGameboard[8][i + destroyerPosition] = `D`;
          }
        } 
        else if (destroyerOrientation === "Vertical"){
          for (let i = 0; i < destroyer; i++) {
            updatedGameboard[i + destroyerPosition][7] = `D`;
          }
        }
 
        //submarine placement
        if (submarineOrientation === "Horizontal"){
          for (let i = 0; i < submarine; i++) {
            updatedGameboard[3][i + submarinePosition] = `S`;
          }
        } 
        else if (submarineOrientation === "Vertical"){ 
          for (let i = 0; i < submarine; i++) {
            updatedGameboard[i + submarinePosition][3] = `S`;
          }
        }

        //patrol boat placement
        if (patrolBoatOrientation === "Horizontal"){
          for (let i = 0; i < patrolBoat; i++) {
            updatedGameboard[6][i + 4] = `P`;
          }
        } 
        else if (patrolBoatOrientation === "Vertical"){
          for (let i = 0; i < patrolBoat; i++) {
            updatedGameboard[i + patrolBoatPosition][5] = `P`;
          }
        }
      }

      if (autoPlace === "Carrier") {
        if (carrierOrientation === "Horizontal"){
          for (let i = 0; i < carrier; i++) {
            updatedGameboard[0][i + carrierPosition] = 'C';
          }
        } 
        else if (carrierOrientation === "Vertical"){
          for (let i = 0; i < carrier; i++) {
            updatedGameboard[i + carrierPosition][9] = 'C';
          }
        }
      }

      if (autoPlace === "Battleship") {
        if (battleshipOrientation === "Horizontal"){
          for (let i = 0; i < battleship; i++) {
            updatedGameboard[1][i + battleshipPosition] = 'B';
          }
        } 
        else if (battleshipOrientation === "Vertical"){
          for (let i = 0; i < battleship; i++) {
            updatedGameboard[i + battleshipPosition][1] = 'B';
          }
        }
      }

      if (autoPlace === "Destroyer") {
        if (destroyerOrientation === "Horizontal"){
          for (let i = 0; i < destroyer; i++) {
            updatedGameboard[8][i + destroyerPosition] = 'D';
          }
        } 
        else if (destroyerOrientation === "Vertical"){
          for (let i = 0; i < destroyer; i++) {
            updatedGameboard[i + destroyerPosition][7] = 'D';
          }
        }
      }

      if (autoPlace === "Submarine") {
        if (submarineOrientation === "Horizontal"){
          for (let i = 0; i < submarine; i++) {
            updatedGameboard[3][i + submarinePosition] = 'S';
          }
        } 
        else if (submarineOrientation === "Vertical"){
          for (let i = 0; i < submarine; i++) {
            updatedGameboard[i + submarinePosition][3] = 'S';
          }
        }
      }

      if (autoPlace === "Patrol Boat") {
        if (patrolBoatOrientation === "Horizontal"){
          for (let i = 0; i < patrolBoat; i++) {
            updatedGameboard[6][i + 4] = 'P';
          }
        } 
        else if (patrolBoatOrientation === "Vertical"){
          for (let i = 0; i < patrolBoat; i++) {
            updatedGameboard[i + patrolBoatPosition][5] = 'P';
          }
        }
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