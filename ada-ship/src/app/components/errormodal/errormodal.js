'use client'

import styles from "./errormodal.css";

import React, { useEffect, useState } from 'react';

const ErrorModal = ({errorMessage, onClose, gameState}) => {

    const [closeButton, setCloseButton] = useState("X")

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

    useEffect(() => {
        if (gameState == "Invalid Ship Placement"){
            setCloseButton("↻")
          } else setCloseButton("X")
    }, [gameState])


    return (
        <div 
        className="error-container" 
        onClick={() => {
            onClose();

            if(gameState == "Invalid Ship Placement"){
                window.location.reload(false)
              }
        }}
        >
            <div className="close-button">{closeButton}</div>
            <div>{errorMessage}</div>
        </div>
    )
}

export default ErrorModal