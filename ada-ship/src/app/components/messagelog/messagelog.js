import styles from "./messagelog.css";
import React, { useState, useEffect } from 'react';

const MessageLog = ({ 
    gameState,
    userMessage,
    onUpdateUserMessage,
    carrier, 
    battleship, 
    destroyer, 
    submarine, 
    patrolBoat
 }) => {
  

  useEffect(() => {
    if (gameState === "Start"){
      onUpdateUserMessage("Press 'Start' to begin.");
    }
    else if (gameState === "User Carrier Selection") {
      onUpdateUserMessage(`Select a position on the left board for your Carrier (${carrier} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Battleship Selection"){
      onUpdateUserMessage(`Select a position on the left board for your Battleship (${battleship} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Destroyer Selection"){
      onUpdateUserMessage(`Select a position on the left board for your Destroyer (${destroyer} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Submarine Selection"){
      onUpdateUserMessage(`Select a position on the left board for your Submarine (${submarine} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Patrol Boat Selection"){
      onUpdateUserMessage(`Select a position on the left board for your Patrol Boat (${patrolBoat} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Ship Selection Validation"){
      onUpdateUserMessage("Validating Ship Placement...")
    }
    else if (gameState === "Validated User Ship Selection"){
      onUpdateUserMessage("Ship Placements Validated - press Continue")
    }
    else if (gameState === "User Attack"){
      onUpdateUserMessage("Choose a place on the opponent's grid to attack.")
    }
    else if (gameState === "User Win"){
      onUpdateUserMessage("All opponent ships destroyed - you win! 🎉")
    }
    else if (gameState === "CPU Win"){
      onUpdateUserMessage("All your ships were destroyed - you lose... 😢")
    }

    else {
      null
    }
  }, [gameState]);

  return (
    <div className="message-container">
      <div>{userMessage}</div>
    </div>
  );
}

export default MessageLog;