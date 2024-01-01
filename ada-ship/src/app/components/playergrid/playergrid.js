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
  const [carrierPositionArray, setCarrierPositionArray] = useState([])
  const [battleshipPositionArray, setBattleshipPositionArray] = useState([])
  const [destroyerPositionArray, setDestroyerPositionArray] = useState([])
  const [submarinePositionArray, setSubmarinePositionArray] = useState([])
  const [patrolBoatPositionArray, setPatrolBoatPositionArray] = useState([])
  const [boatsRemaining, setBoatsRemaining] = useState([carrier, battleship, destroyer, submarine, patrolBoat])
  const [boatsDestroyed, setBoatsDestroyed] = useState([false, false, false, false, false])
  const [enemyAttackLog, setEnemyAttackLog] = useState([[9, 0], [7, 2], [5, 4], [4, 6], [2, 8]]) // to increase difficulty, 5 cells have been blocked off for attack

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
    const shipMessage = () => {
      // This will run every time boatsRemaining changes
      console.log('boatsRemaining: ', boatsRemaining);
  
      if (boatsRemaining[0] <= 0){
        onUpdateUserMessage("All your Carriers have been destroyed!")
  
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[0] += 1
        setBoatsRemaining(updatedBoatsRemaining)
  
        const updatedBoatsDestroyed = [...boatsDestroyed]
        updatedBoatsDestroyed[0] = true
        setBoatsDestroyed(updatedBoatsDestroyed)
      }
      if (boatsRemaining[1] <= 0){
        onUpdateUserMessage("All your Battleships have been destroyed!")
  
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[1] += 1
        setBoatsRemaining(updatedBoatsRemaining)
  
        const updatedBoatsDestroyed = [...boatsDestroyed]
        updatedBoatsDestroyed[1] = true
        setBoatsDestroyed(updatedBoatsDestroyed)
      }
      if (boatsRemaining[2] <= 0){
        onUpdateUserMessage("All your Destroyers have been destroyed!")
  
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[2] += 1
        setBoatsRemaining(updatedBoatsRemaining)
  
        const updatedBoatsDestroyed = [...boatsDestroyed]
        updatedBoatsDestroyed[2] = true
        setBoatsDestroyed(updatedBoatsDestroyed)
      }
      if (boatsRemaining[3] <= 0){
        onUpdateUserMessage("All your Submarines have been destroyed!")
  
        const updatedBoatsRemaining = [...boatsRemaining]
        updatedBoatsRemaining[3] += 1
        setBoatsRemaining(updatedBoatsRemaining)
  
        const updatedBoatsDestroyed = [...boatsDestroyed]
        updatedBoatsDestroyed[3] = true
        setBoatsDestroyed(updatedBoatsDestroyed)
      }
      if (boatsRemaining[4] <= 0){
        onUpdateUserMessage("All your Patrol Boats have been destroyed!")
  
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
          onUpdateGameState("CPU Win")
      }
    }

    shipMessage()
  }, [boatsRemaining])


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
          setCarrierPositionArray((carrierPositionArray) => [...carrierPositionArray, [0, i + carrierPosition]])
        }
      } 
      else if (carrierOrientation === "Vertical"){
        for (let i = 0; i < carrier; i++) {
          updatedGameboard[i + carrierPosition][9] = `C`;
          setCarrierPositionArray((carrierPositionArray) => [...carrierPositionArray, [i + carrierPosition, 9]])
        }
      }

      //battleship placement
      if (battleshipOrientation === "Horizontal"){
        for (let i = 0; i < battleship; i++) {
          updatedGameboard[1][i + battleshipPosition] = `B`;
          setBattleshipPositionArray((battleshipPositionArray) => [...battleshipPositionArray, [1, i + battleshipPosition]])
        }
      } 
      else if (battleshipOrientation === "Vertical"){
        for (let i = 0; i < battleship; i++) {
          updatedGameboard[i + battleshipPosition][1] = `B`;
          setBattleshipPositionArray((battleshipPositionArray) => [...battleshipPositionArray, [i + battleshipPosition, 1]])
        }
      }

      //destroyer placement
      if (destroyerOrientation === "Horizontal"){
        for (let i = 0; i < destroyer; i++) {
          updatedGameboard[8][i + destroyerPosition] = `D`;
          setDestroyerPositionArray((destroyerPositionArray) => [...destroyerPositionArray, [8, i + destroyerPosition]])
        }
      } 
      else if (destroyerOrientation === "Vertical"){
        for (let i = 0; i < destroyer; i++) {
          updatedGameboard[i + destroyerPosition][7] = `D`;
          setDestroyerPositionArray((destroyerPositionArray) => [...destroyerPositionArray, [i + destroyerPosition, 7]])
        }
      }

      //submarine placement
      if (submarineOrientation === "Horizontal"){
        for (let i = 0; i < submarine; i++) {
          updatedGameboard[3][i + submarinePosition] = `S`;
          setSubmarinePositionArray((submarinePositionArray) => [...submarinePositionArray, [3, i + submarinePosition]])
        }
      } 
      else if (submarineOrientation === "Vertical"){ 
        for (let i = 0; i < submarine; i++) {
          updatedGameboard[i + submarinePosition][3] = `S`;
          setSubmarinePositionArray((submarinePositionArray) => [...submarinePositionArray, [i + submarinePosition, 3]])
        }
      }

      //patrol boat placement
      if (patrolBoatOrientation === "Horizontal"){
        for (let i = 0; i < patrolBoat; i++) {
          updatedGameboard[6][i + 4] = `P`;
          setPatrolBoatPositionArray((patrolBoatPositionArray) => [...patrolBoatPositionArray, [6, i + 4]])
        }
      }
      else if (patrolBoatOrientation === "Vertical"){
        for (let i = 0; i < patrolBoat; i++) {
          updatedGameboard[i + patrolBoatPosition][5] = `P`;
          setPatrolBoatPositionArray((patrolBoatPositionArray) => [...patrolBoatPositionArray, [i + patrolBoatPosition, 5]])
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

useEffect(() => {
  const enemyAttack = () => {
    if (gameState === "CPU Attack"){
      const updatedGameboard = [...gameboardLogic];

      let attackCoordinate;
      let containsCoordinate;

      do {
        const row = Math.floor(Math.random() * height)
        const column = Math.floor(Math.random() * width)
        attackCoordinate = [row, column]

        containsCoordinate = enemyAttackLog.some(coord => coord[0] === attackCoordinate[0] && coord[1] === attackCoordinate[1]);

      } while (containsCoordinate)

      setEnemyAttackLog((enemyAttackLog) => [...enemyAttackLog, [attackCoordinate[0], attackCoordinate[1]]])

      console.log("- CPU Attack -")
      console.log(attackCoordinate)
      console.log(enemyAttackLog)

      const verifyAttack = () => {
        for (let i = carrier; i < (carrier * 2); i++){
          if (attackCoordinate[0] === carrierPositionArray[i][0] && attackCoordinate[1] === carrierPositionArray[i][1]){
            onUpdateUserMessage("Your Carrier was hit!")
            const updatedBoatsRemaining = [...boatsRemaining]
            updatedBoatsRemaining[0] -= 1
            setBoatsRemaining(updatedBoatsRemaining)
            return true
          }
        }
  
        for (let i = battleship; i < (battleship * 2); i++){
          if (attackCoordinate[0] === battleshipPositionArray[i][0] && attackCoordinate[1] === battleshipPositionArray[i][1]){
            onUpdateUserMessage("Your Battleship was hit!")
            const updatedBoatsRemaining = [...boatsRemaining]
            updatedBoatsRemaining[1] -= 1
            setBoatsRemaining(updatedBoatsRemaining)
            return true
          }
        }
  
        for (let i = destroyer; i < (destroyer * 2); i++){
          if (attackCoordinate[0] === destroyerPositionArray[i][0] && attackCoordinate[1] === destroyerPositionArray[i][1]){
            onUpdateUserMessage("Your Destroyer was hit!")
            const updatedBoatsRemaining = [...boatsRemaining]
            updatedBoatsRemaining[2] -= 1
            setBoatsRemaining(updatedBoatsRemaining)
            return true
          }
        }
  
        for (let i = submarine; i < (submarine * 2); i++){
          if (attackCoordinate[0] === submarinePositionArray[i][0] && attackCoordinate[1] === submarinePositionArray[i][1]){
            onUpdateUserMessage("Your Submarine was hit!")
            const updatedBoatsRemaining = [...boatsRemaining]
            updatedBoatsRemaining[3] -= 1
            setBoatsRemaining(updatedBoatsRemaining)
            return true
          }
        }
  
        for (let i = patrolBoat; i < (patrolBoat * 2); i++){
          if (attackCoordinate[0] === patrolBoatPositionArray[i][0] && attackCoordinate[1] === patrolBoatPositionArray[i][1]){
            onUpdateUserMessage("Your Patrol Boat was hit!")
            const updatedBoatsRemaining = [...boatsRemaining]
            updatedBoatsRemaining[4] -= 1
            setBoatsRemaining(updatedBoatsRemaining)
            return true
          }
        }
      }

      if (verifyAttack()){
        updatedGameboard[attackCoordinate[0]][attackCoordinate[1]] = '💣';
      } else {
        updatedGameboard[attackCoordinate[0]][attackCoordinate[1]] = '❌';
        onUpdateUserMessage("Opponent Missed!")
      }

      onUpdateGameState("Change Attacker (User)")


      

      setGameboardLogic(updatedGameboard);
    }
  }

  enemyAttack()
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