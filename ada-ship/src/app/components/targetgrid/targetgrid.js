'use client'

import { createElement } from "react";
import styles from "./targetgrid.css";

import React, { useEffect, useState } from 'react';

export default function TargetGrid({ 
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
  const [carrierPositionArray, setCarrierPositionArray] = useState([])
  const [battleshipPositionArray, setBattleshipPositionArray] = useState([])
  const [destroyerPositionArray, setDestroyerPositionArray] = useState([])
  const [submarinePositionArray, setSubmarinePositionArray] = useState([])
  const [patrolBoatPositionArray, setPatrolBoatPositionArray] = useState([])
  const [boatsRemaining, setBoatsRemaining] = useState([carrier, battleship, destroyer, submarine, patrolBoat])
  const [boatsDestroyed, setBoatsDestroyed] = useState([false, false, false, false, false])

  const determineShipOrientation = () => {
    return Math.random() < 0.5 ? "Horizontal" : "Vertical"
  }

  // array[individualCell][0 is row, 1 is col]
  const checkForEnemyShip = (row, column) => {
    for (let i = carrier; i < (carrier * 2); i++){
      if (row === carrierPositionArray[i][0] && column === carrierPositionArray[i][1]){
        onUpdateUserMessage("Opponent Carrier Hit!")
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[0] -= 1
        setBoatsRemaining(updatedBoatsRemaining)
        return true
      }
    }

    for (let i = battleship; i < (battleship * 2); i++){
      if (row === battleshipPositionArray[i][0] && column === battleshipPositionArray[i][1]){
        onUpdateUserMessage("Opponent Battleship Hit!")
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[1] -= 1
        setBoatsRemaining(updatedBoatsRemaining)
        return true
      }
    }

    for (let i = destroyer; i < (destroyer * 2); i++){
      if (row === destroyerPositionArray[i][0] && column === destroyerPositionArray[i][1]){
        onUpdateUserMessage("Opponent Destroyer Hit!")
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[2] -= 1
        setBoatsRemaining(updatedBoatsRemaining)
        return true
      }
    }

    for (let i = submarine; i < (submarine * 2); i++){
      if (row === submarinePositionArray[i][0] && column === submarinePositionArray[i][1]){
        onUpdateUserMessage("Opponent Submarine Hit!")
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[3] -= 1
        setBoatsRemaining(updatedBoatsRemaining)
        return true
      }
    }

    for (let i = patrolBoat; i < (patrolBoat * 2); i++){
      if (row === patrolBoatPositionArray[i][0] && column === patrolBoatPositionArray[i][1]){
        onUpdateUserMessage("Opponent Patrol Boat Hit!")
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[4] -= 1
        setBoatsRemaining(updatedBoatsRemaining)
        return true
      }
    }

  return false
  }

  const shipMessage = () => {
    // This will run every time boatsRemaining changes
    console.log('boatsRemaining: ', boatsRemaining);

    if (boatsRemaining[0] <= 0){
      onUpdateUserMessage("All opponent Carriers destroyed!")

      const updatedBoatsRemaining = [...boatsRemaining]
      updatedBoatsRemaining[0] += 1
      setBoatsRemaining(updatedBoatsRemaining)

      const updatedBoatsDestroyed = [...boatsDestroyed]
      updatedBoatsDestroyed[0] = true
      setBoatsDestroyed(updatedBoatsDestroyed)
    }
    if (boatsRemaining[1] <= 0){
      onUpdateUserMessage("All opponent Battleships destroyed!")

      const updatedBoatsRemaining = [...boatsRemaining]
      updatedBoatsRemaining[1] += 1
      setBoatsRemaining(updatedBoatsRemaining)

      const updatedBoatsDestroyed = [...boatsDestroyed]
      updatedBoatsDestroyed[1] = true
      setBoatsDestroyed(updatedBoatsDestroyed)
    }
    if (boatsRemaining[2] <= 0){
      onUpdateUserMessage("All opponent Destroyers destroyed!")

      const updatedBoatsRemaining = [...boatsRemaining]
      updatedBoatsRemaining[2] += 1
      setBoatsRemaining(updatedBoatsRemaining)

      const updatedBoatsDestroyed = [...boatsDestroyed]
      updatedBoatsDestroyed[2] = true
      setBoatsDestroyed(updatedBoatsDestroyed)
    }
    if (boatsRemaining[3] <= 0){
      onUpdateUserMessage("All opponent Submarines destroyed!")

      const updatedBoatsRemaining = [...boatsRemaining]
      updatedBoatsRemaining[3] += 1
      setBoatsRemaining(updatedBoatsRemaining)

      const updatedBoatsDestroyed = [...boatsDestroyed]
      updatedBoatsDestroyed[3] = true
      setBoatsDestroyed(updatedBoatsDestroyed)
    }
    if (boatsRemaining[4] <= 0){
      onUpdateUserMessage("All opponent Patrol Boats destroyed!")

      const updatedBoatsRemaining = [...boatsRemaining]
      updatedBoatsRemaining[4] += 1
      setBoatsRemaining(updatedBoatsRemaining)

      const updatedBoatsDestroyed = [...boatsDestroyed]
      updatedBoatsDestroyed[4] = true
      setBoatsDestroyed(updatedBoatsDestroyed)
    }

    if (
      boatsDestroyed[0] == true &&
      boatsDestroyed[1] == true &&
      boatsDestroyed[2] == true &&
      boatsDestroyed[3] == true &&
      boatsDestroyed[4] == true
      ){
        onUpdateUserMessage("All opponent ships destroyed - you win! 🎉")
    }
  }

  const initializeGameboard = () => {
    const initialGameboard = [];

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

  useEffect(() => {
    initializeGameboard();
  }, [width, height, gameState]);

  useEffect(() => {
    shipMessage()
  }, [boatsRemaining]);


    const handleCellClick = (row, column) => {
      if (gameState === "User Attack"){
      const updatedGameboard = [...gameboardLogic];

      if (checkForEnemyShip(row, column)){
        updatedGameboard[row][column] = '💣';
      } 
      
      else { // if the target has been missed
        updatedGameboard[row][column] = '❌';
        onUpdateUserMessage("You Missed!")
      }

      setGameboardLogic(updatedGameboard);
      }
    }
    


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