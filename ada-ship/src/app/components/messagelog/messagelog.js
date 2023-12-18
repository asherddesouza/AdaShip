import styles from "./messagelog.css";
import React, { useState, useEffect } from 'react';

const MessageLog = ({ 
    gameState,
    carrier, 
    battleship, 
    destroyer, 
    submarine, 
    patrolBoat
 }) => {
  const [message, setMessage] = useState("Press 'Start' to begin.");

  useEffect(() => {
    if (gameState === "Start"){
        setMessage("Press 'Start' to begin.");
    }
    else if (gameState === "User Carrier Selection") {
      setMessage(`Select a position on the left board for your Carrier (${carrier} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Battleship Selection"){
        setMessage(`Select a position on the left board for your Battleship (${battleship} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Destroyer Selection"){
        setMessage(`Select a position on the left board for your Destroyer (${destroyer} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Submarine Selection"){
        setMessage(`Select a position on the left board for your Submarine (${submarine} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Patrol Boat Selection"){
        setMessage(`Select a position on the left board for your Patrol Boat (${patrolBoat} cells), cells must be arranged in rows or columns`);
    }
    else if (gameState === "User Ship Selection Validation"){
        setMessage("Validating Ship Placement...")
    }
    else if (gameState === "Validated User Ship Selection"){
        setMessage("Ship Placements Validated - press Continue")
    }
    else if (gameState === "User Attack"){
        setMessage("Choose a place on the opponent's grid to attack.")
    }

    else {
      null
    }
  }, [gameState]);

  return (
    <div className="message-container">
      <div>{message}</div>
    </div>
  );
}

export default MessageLog;