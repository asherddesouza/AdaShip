'use client'

import { Fragment, useState } from "react";
import styles from "./buttons.css";
import HelpModal from "../helpmodal/helpmodal";

export default function ContinueButton({ gameState, onUpdateGameState, onUpdateErrorState}){
    const [startButtonText, setStartButtonText] = useState("Start")

    const continueGame = () => {
        if (startButtonText === "Start"){
            setStartButtonText("Confirm Selection")
            onUpdateGameState("User Carrier Selection")
            onUpdateErrorState(false)
        }

        else if (gameState === "User Carrier Selection"){
            onUpdateGameState("User Battleship Selection")
            onUpdateErrorState(false)
        }

        else if (gameState === "User Battleship Selection"){
            onUpdateGameState("User Destroyer Selection")
            onUpdateErrorState(false)
        }

        else if (gameState === "User Destroyer Selection"){
            onUpdateGameState("User Submarine Selection")
            onUpdateErrorState(false)
        }

        else if (gameState === "User Submarine Selection"){
            setStartButtonText("Validate")
            onUpdateGameState("User Patrol Boat Selection")
            onUpdateErrorState(false)
        }

        else if (gameState === "User Patrol Boat Selection"){
            setStartButtonText("Continue")
            onUpdateGameState("User Ship Selection Validation")
            onUpdateErrorState(false)
        }

    }

    return (
        <button className="btn continue" onClick={continueGame}>{startButtonText}</button>
    )
}

export function RestartButton({gameState}){
    return (
        <button className="btn restart" onClick={() => window.location.reload(false)}>Restart Game</button>
    )
}

export function ResetBoard({gameState, onUpdateGameState, onSetClearBoard}){
    const resetCells = () => {
        if (true) { //when attacks have been implemented, restrict this
            onUpdateGameState("User Carrier Selection")
            onSetClearBoard(true)
        }
    }

    return (
        <button className="btn reset" onClick={resetCells}>Reset Board</button>
    )
}

export function AutoPlace({gameState}){
    return (
        <button className="btn autoplace">Auto Place</button>
    )
}

export function AutoPlaceAll({gameState}){
    return (
        <button className="btn autoplaceall">Auto Place All</button>
    )
}

export function HelpButton({carrier = 5, battleship = 4, destroyer = 3, submarine = 3, patrolBoat = 2}) {
    const [helpModalOpen, setHelpModalOpen] = useState(false);

    return (
        <>
            {helpModalOpen ? (
                <HelpModal
                    gamemode="One Player" //change this to be dynamic
                    body_intro="AdaShip is a game where the aim is to sink all of your opponent's battleships by taking it in turns to select a target on the board and firing a torpedo at it."
                    body_shipdetails="The sizes of the various ships are as follows: "
                    body_message="Once you have sunk all the opponent's ships, you win!"
                    carrierSize = {carrier}
                    battleshipSize = {battleship}
                    destroyerSize = {destroyer}
                    submarineSize = {submarine}
                    patrolBoatSize = {patrolBoat}
                    onClose={() => {
                        setHelpModalOpen(false);
                    }}
                />
            ) : null}

            <button
                className="btn help"
                onClick={() => setHelpModalOpen(true)}
            >
                How To Play
            </button>
        </>
    );
}