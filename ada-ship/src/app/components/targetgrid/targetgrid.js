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
  const [carrierPositionArray, setCarrierPositionArray] = useState([])
  const [battleshipPositionArray, setBattleshipPositionArray] = useState([])
  const [destroyerPositionArray, setDestroyerPositionArray] = useState([])
  const [submarinePositionArray, setSubmarinePositionArray] = useState([])
  const [patrolBoatPositionArray, setPatrolBoatPositionArray] = useState([])

  const determineShipOrientation = () => {
    return Math.random() < 0.5 ? "Horizontal" : "Vertical"
  }

  // array[individualCell][0 is row, 1 is col]
  const checkForEnemyShip = (row, column) => {
    for (let i = 0; i < carrier; i++){
      null
    }

    console.log(carrierPositionArray)

  return true
  }


  useEffect(() => {
    const initializeGameboard = () => {
      const initialGameboard = [];

      let carrierCount = carrier
      let battleshipCount = battleship
      let destroyerCount = destroyer
      let submarineCount = submarine
      let patrolBoatCount = patrolBoat

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

      if (gameState === "Start"){
        for (let i = 0; i < width; i++) {
          const row = Array.from({ length: height }, () => '');
          initialGameboard.push(row);
        }
  
        // carrier placement
        if (carrierOrientation === "Horizontal"){
          for (let i = 0; i < carrier; i++) {
            initialGameboard[0][i + carrierPosition] = `C`;
            setCarrierPositionArray((carrierPositionArray) => [...carrierPositionArray, [0, i + carrierPosition]])
          }
        } 
        else if (carrierOrientation === "Vertical"){
          for (let i = 0; i < carrier; i++) {
            initialGameboard[i + carrierPosition][9] = `C`;
            setCarrierPositionArray((carrierPositionArray) => [...carrierPositionArray, [i + carrierPosition, 9]])
          }
        }

        //battleship placement
        if (battleshipOrientation === "Horizontal"){

          for (let i = 0; i < battleship; i++) {
            initialGameboard[1][i + battleshipPosition] = `B`;
            setBattleshipPositionArray((battleshipPositionArray) => [...battleshipPositionArray, [1, i + battleshipPosition]])
          }
        } 
        else if (battleshipOrientation === "Vertical"){
          for (let i = 0; i < battleship; i++) {
            initialGameboard[i + battleshipPosition][1] = `B`;
            setBattleshipPositionArray((battleshipPositionArray) => [...battleshipPositionArray, [i + battleshipPosition, 1]])
          }
        }

        //destroyer placement
        if (destroyerOrientation === "Horizontal"){
          for (let i = 0; i < destroyer; i++) {
            initialGameboard[8][i + destroyerPosition] = `D`;
            setDestroyerPositionArray((destroyerPositionArray) => [...destroyerPositionArray, [8, i + destroyerPosition]])
          }
        } 
        else if (destroyerOrientation === "Vertical"){
          for (let i = 0; i < destroyer; i++) {
            initialGameboard[i + destroyerPosition][7] = `D`;
            setDestroyerPositionArray((destroyerPositionArray) => [...destroyerPositionArray, [i + destroyerPosition, 7]])
          }
        }

        //submarine placement
        if (submarineOrientation === "Horizontal"){
          for (let i = 0; i < submarine; i++) {
            initialGameboard[3][i + submarinePosition] = `S`;
            setSubmarinePositionArray((submarinePositionArray) => [...submarinePositionArray, [3, i + submarinePosition]])
          }
        } 
        else if (submarineOrientation === "Vertical"){ 
          for (let i = 0; i < submarine; i++) {
            initialGameboard[i + submarinePosition][3] = `S`;
            setSubmarinePositionArray((submarinePositionArray) => [...submarinePositionArray, [i + submarinePosition, 3]])
          }
        }

        //patrol boat placement
        if (patrolBoatOrientation === "Horizontal"){
          for (let i = 0; i < patrolBoat; i++) {
            initialGameboard[6][i + 4] = `P`;
            setPatrolBoatPositionArray((patrolBoatPositionArray) => [...patrolBoatPositionArray, [6, i + 4]])
          }
        }
        else if (patrolBoatOrientation === "Vertical"){
          for (let i = 0; i < patrolBoat; i++) {
            initialGameboard[i + patrolBoatPosition][5] = `P`;
            setPatrolBoatPositionArray((patrolBoatPositionArray) => [...patrolBoatPositionArray, [i + patrolBoatPosition, 5]])
          }
        }


        setGameboardLogic(initialGameboard);
      }
      
    };

    initializeGameboard();

      console.log('-----------------------')
      console.log(`array: ${carrierPositionArray[0]}`) //carrierPositionArray[individualCell][0 is row, 1 is col]
      console.log(`array: ${carrierPositionArray[1]}`) //carrierPositionArray[individualCell][0 is row, 1 is col]
      console.log(`array: ${carrierPositionArray[2]}`) //carrierPositionArray[individualCell][0 is row, 1 is col]
      console.log(`array: ${carrierPositionArray[3]}`) //carrierPositionArray[individualCell][0 is row, 1 is col]
      console.log(`array: ${carrierPositionArray[4]}`) //carrierPositionArray[individualCell][0 is row, 1 is col]

  }, [width, height, gameState]);


    const handleCellClick = (row, column) => {
      if (gameState === "User Attack"){
      // Do something with the clicked cell, for example, update its content
      // access the cell using gameboardLogic[row][column]
      const updatedGameboard = [...gameboardLogic];

      if (
        checkForEnemyShip(row, column)
        //updatedGameboard[row][column] === 'S'
        ){
        updatedGameboard[row][column] = '💣';
        //log the state of user's ships
      } 
      
      else { // if the target has been missed
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