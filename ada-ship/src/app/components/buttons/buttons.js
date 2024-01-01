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

        else if (gameState === "Validated User Ship Selection"){
            setStartButtonText("Continue")
            onUpdateGameState("User Attack")
            onUpdateErrorState(false)
        }

        else if (gameState === "Change Attacker (CPU)"){
            onUpdateGameState("CPU Attack")
            onUpdateErrorState(false)
        }

        else if (gameState === "Change Attacker (User)"){
            onUpdateGameState("User Attack")
            onUpdateErrorState(false)
        }

    }

    return (
        <button className="btn continue" onClick={continueGame}>{startButtonText}</button>
    )
}

export function RestartButton(){
    return (
        <button className="btn restart" onClick={() => window.location.reload(false)}>Restart Game</button>
    )
}

export function ResetBoard({gameState, onUpdateGameState, onSetClearBoard}){
    const resetCells = () => {
        if (
            gameState == "User Carrier Selection" ||
            gameState == "User Battleship Selection" ||
            gameState == "User Destroyer Selection" ||
            gameState == "User Submarine Selection" ||
            gameState == "User Patrol Boat Selection"
            ) {
            onUpdateGameState("User Carrier Selection")
            onSetClearBoard(true)
        }
    }

    return (
        <button className="btn reset" onClick={resetCells}>Reset Board</button>
    )
}

export function AutoPlace({ gameState, autoPlace, onSetAutoPlace }){

    const triggerAutoPlace = () => {
        if (gameState == "User Carrier Selection") {
            onSetAutoPlace("Carrier")
        } else if (gameState == "User Battleship Selection"){
            onSetAutoPlace("Battleship")
        } else if (gameState == "User Destroyer Selection"){
            onSetAutoPlace("Destroyer")
        } else if (gameState == "User Submarine Selection"){
            onSetAutoPlace("Submarine")
        } else if (gameState == "User Patrol Boat Selection"){
            onSetAutoPlace("Patrol Boat")
        }
    }
    
    return (
        <button className="btn autoplace" onClick={triggerAutoPlace}>Auto Place</button>
    )
}

export function AutoPlaceAll({ gameState, onUpdateGameState, autoPlace, onSetAutoPlace }){
    //verify game state and then send back an 'all' response to onSetAutoPlace

    const triggerAutoPlaceAll = () => {
        if (gameState == "User Carrier Selection") {
            onSetAutoPlace("Autoplace All")
            //onUpdateGameState("User Patrol Boat Selection")
        }
    }

    return (
        <button className="btn autoplaceall" onClick={triggerAutoPlaceAll}>Auto Place All</button>
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