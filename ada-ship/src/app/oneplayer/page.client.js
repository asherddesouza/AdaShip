'use client'

import ContinueButton, { AutoPlace, AutoPlaceAll, HelpButton, ResetBoard, RestartButton } from "../components/buttons/buttons";
import PlayerGrid from "../components/playergrid/playergrid";
import TargetGrid from "../components/targetgrid/targetgrid";
import MessageLog from "../components/messagelog/messagelog";

import React, { useState } from 'react';

export default function Play({ searchParams, config }) {
    //const gamemode = searchParams.gamemode;
  
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
            message={"Press 'Start' to begin the game."}
          />
          <br/>
  
          <div className="button-container">
            <ContinueButton/>
            <AutoPlace/>
            <AutoPlaceAll/>
            <ResetBoard/>
            <RestartButton/>
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