import styles from "./messagelog.css";
import React, { useState, useEffect } from 'react';

export default function MessageLog({ gameState }) {
  const [message, setMessage] = useState("Press 'Start' to begin.");

  useEffect(() => {
    if (gameState === "User Carrier Selection") {
      setMessage("Select a position on the left board for your Carrier (5 cells), cells must be arranged in rows or columns");
    } else {
      setMessage("Press 'Start' to begin.");
    }
  }, [gameState]);

  return (
    <div className="message-container">
      <div>{message}</div>
    </div>
  );
}