'use client'

import { Fragment, useState } from "react";
import styles from "./buttons.css";
import HelpModal from "../helpmodal/helpmodal";

export default function ContinueButton(){
    const [startButtonText, setStartButtonText] = useState("Start")

    function continueGame() {
        if (startButtonText === "Start"){
            setStartButtonText("Continue")
        }
        // make another useState hook within the MessageLog so that it changes when you press start
    }

    return (
        <button className="btn continue" onClick={continueGame}>{startButtonText}</button>
    )
}

export function RestartButton(){
    return (
        <button className="btn restart">Restart Game</button>
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

export function ResetBoard(){
    return (
        <button className="btn reset">Reset Board</button>
    )
}

export function AutoPlace(){
    return (
        <button className="btn autoplace">Auto Place</button>
    )
}

export function AutoPlaceAll(){
    return (
        <button className="btn autoplaceall">Auto Place All</button>
    )
}