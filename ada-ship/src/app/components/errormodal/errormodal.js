'use client'

import styles from "./errormodal.css";

import React, { useEffect, useState } from 'react';

const ErrorModal = ({errorMessage, onClose}) => {

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
        <div 
        className="error-container" 
        onClick={() => {
            onClose();
        }}
        >
            <div>{errorMessage}</div>
            <div>Tap to dismiss.</div>
        </div>
    )
}

export default ErrorModal