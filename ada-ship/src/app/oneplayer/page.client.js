'use client'

import ContinueButton, { AutoPlace, AutoPlaceAll, HelpButton, ResetBoard, RestartButton } from "../components/buttons/buttons";
import PlayerGrid from "../components/playergrid/playergrid";
import TargetGrid from "../components/targetgrid/targetgrid";
import MessageLog from "../components/messagelog/messagelog";

import React, { useState } from 'react';

export default function Play({ searchParams, config }) {
    //const gamemode = searchParams.gamemode;

    const [currentGameState, setCurrentGameState] = useState("Start")

    const updateCurrentGameState = (newState) => {
      setCurrentGameState(newState);
    }
  
    return (
      <div>
        <h1 className="title">One Player</h1>
        <hr></hr>
        <br></br>
  
        <div className="game-window">
          <div className="grid-window">
            <div className="player-grid">
              <p className="board-title">Your Board</p>
              <PlayerGrid
                width = {config.gridWidth}
                height = {config.gridHeight}
                gameState = {currentGameState}
                carrier = {config.carrierSize}
                battleship = {config.carrierSize}
                destroyer = {config.destroyerSize}
                submarine = {config.submarineSize}
                patrolBoat = {config.patrolBoatSize}
              />
            </div>
            
            <div className="target-grid">
              <p className="board-title">Target Board</p>
              <TargetGrid
                width = {config.gridWidth}
                height = {config.gridHeight}
                gameState = {currentGameState}
                carrier = {config.carrierSize}
                battleship = {config.carrierSize}
                destroyer = {config.destroyerSize}
                submarine = {config.submarineSize}
                patrolBoat = {config.patrolBoatSize}
              />
            </div>
          </div>
          
  
          <br/>
          <MessageLog
            gameState = {currentGameState}
          />
          <br/>
  
          <div className="button-container">
            <ContinueButton
              onUpdateGameState = {updateCurrentGameState}
            />
            <AutoPlace 
              gameState = {currentGameState}
            />
            <AutoPlaceAll 
              gameState = {currentGameState}
            />
            <ResetBoard
              gameState = {currentGameState}
            />
            <RestartButton
              gameState = {currentGameState}
            />
            <HelpButton
              carrier = {config.carrierSize}
              battleship = {config.carrierSize}
              destroyer = {config.destroyerSize}
              submarine = {config.submarineSize}
              patrolBoat = {config.patrolBoatSize}
            />
          </div>
        </div>
  
        <footer>© Asher De Souza 2023</footer>
      </div>
      
    );

}