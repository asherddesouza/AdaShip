'use client'

import styles from "./buttons.css";

export default function ContinueButton(){
    return (
        <button className="btn continue" id="continue-button">Continue</button>
    )
}

export function RestartButton(){
    return (
        <button className="btn restart" id="restart-button">Restart Game</button>
    )
}

export function HelpButton(){
    return (
        <button className="btn help" id="help-button">How To Play</button>
    )
}

export function ResetBoard(){
    return (
        <button className="btn reset" id="reset-button">Reset Board</button>
    )
}

export function AutoPlace(){
    return (
        <button className="btn autoplace" id="autoplace-button">Auto Place</button>
    )
}

export function AutoPlaceAll(){
    return (
        <button className="btn autoplaceall" id="autoplaceall-button">Auto Place All</button>
    )
}