import { useEffect } from "react";
import styles from "./helpmodal.css";

const HelpModal = ({
    gamemode,
    body_intro,
    body_shipdetails,
    body_message,
    carrierSize,
    battleshipSize,
    destroyerSize,
    submarineSize,
    patrolBoatSize,
    onClose,
}) => {

    const onEscClicked = () => {
        onClose();
    }

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === "Escape") {
                event.preventDefault()

                onEscClicked();
            }
        }

        document.addEventListener("keydown", keyDownHandler)

        return () => {
            document.removeEventListener("keydown", keyDownHandler)
        }
    })

    return (
        <div className="modal-container">
            <div
            className="modal"
            onClick={() => {
                onClose();
            }}
            >
                <h1 className="modal-title">{gamemode}</h1>
                <div className="modalCloseButton">X</div>
                <hr className="divider"/>
                <p>{body_intro}</p>
                <p>{body_shipdetails}</p>
                <p>Carrier: {carrierSize}</p>
                <p>Battleship: {battleshipSize}</p>
                <p>Destroyer: {destroyerSize}</p>
                <p>Submarine: {submarineSize}</p>
                <p>Patrol Boat: {patrolBoatSize}</p>
                <p>{body_message}</p>
            </div>
        </div>
    )
}

export default HelpModal;