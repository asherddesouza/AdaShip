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
        <button className="btn help" id="help-button">Help</button>
    )
}