import styles from "./grid.css";

export default async function Grid({width = 10, height = 10, carrier, battleship, destroyer, submarine, patrolBoat}){

    let gameboard = [];

    for (let i = 0; i < width; i++){
        gameboard.push([])
        for (let j = 0; j < height; j++){
        gameboard[i].push("")
        }
    }
    
    console.log("Board: ")
    console.table(gameboard)

    return (
        <div className="grid" id="game-grid"></div>
    )
}