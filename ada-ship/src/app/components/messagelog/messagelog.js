import styles from "./messagelog.css";

export default function MessageLog({message}){
    return (
        <div className="message-container">
            <div>{message}</div>
        </div>
    )
}