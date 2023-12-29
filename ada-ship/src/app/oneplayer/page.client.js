'use client'

import ContinueButton, { AutoPlace, AutoPlaceAll, HelpButton, ResetBoard, RestartButton } from "../components/buttons/buttons";
import PlayerGrid from "../components/playergrid/playergrid";
import TargetGrid from "../components/targetgrid/targetgrid";
import MessageLog from "../components/messagelog/messagelog";
import ErrorModal from "../components/errormodal/errormodal";
import React, { useState } from 'react';

export default function Play({ searchParams, config }) {
    //const gamemode = searchParams.gamemode;

    const [currentGameState, setCurrentGameState] = useState("Start")
    const [errorModalOpen, setErrorModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Generic Error")
    const [clearBoard, setClearBoard] = useState(false)
    const [autoPlaceType, setAutoPlaceType] = useState(String)

    const updateCurrentGameState = (newState) => {
      setCurrentGameState(newState);
    }

    const updateErrorMessage = (newMessage) => {
      setErrorMessage(newMessage)
    }

    const updateClearBoard = (decision) => {
      setClearBoard(decision)
    }

    const updateAutoPlaceType = (type) => {
      setAutoPlaceType(type)
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
                onUpdateGameState = {updateCurrentGameState}
                onUpdateErrorState = {setErrorModalOpen}
                onSetErrorMessage = {updateErrorMessage}
                clearBoardStatus = {clearBoard}
                onSetClearBoard = {updateClearBoard}
                autoPlace = {autoPlaceType}
                onSetAutoPlace = {updateAutoPlaceType}
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
                onUpdateGameState = {updateCurrentGameState}
                onUpdateErrorState = {setErrorModalOpen}
                onSetErrorMessage = {updateErrorMessage}
                clearBoardStatus = {clearBoard}
                onSetClearBoard = {updateClearBoard}
                autoPlace = {autoPlaceType}
                onSetAutoPlace = {updateAutoPlaceType}
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
            carrier = {config.carrierSize}
            battleship = {config.carrierSize}
            destroyer = {config.destroyerSize}
            submarine = {config.submarineSize}
            patrolBoat = {config.patrolBoatSize}
          />
          <br/>

          {errorModalOpen ? (
            <ErrorModal
              errorMessage={errorMessage}
              onClose={() => {
                setErrorModalOpen(false);
              }}
              gameState={currentGameState}
            />
          ) : null}
  
          <div className="button-container">
            <ContinueButton
              gameState={ currentGameState }
              onUpdateGameState = {updateCurrentGameState}
              onUpdateErrorState = {setErrorModalOpen}
            />
            <AutoPlace 
              gameState = {currentGameState}
              autoPlace = {autoPlaceType}
              onSetAutoPlace = {updateAutoPlaceType}
            />
            <AutoPlaceAll 
              gameState = {currentGameState}
              onUpdateGameState = {updateCurrentGameState}
              autoPlace = {autoPlaceType}
              onSetAutoPlace = {updateAutoPlaceType}
            />
            <ResetBoard
              gameState = {currentGameState}
              onUpdateGameState = {updateCurrentGameState}
              onSetClearBoard = {updateClearBoard}
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