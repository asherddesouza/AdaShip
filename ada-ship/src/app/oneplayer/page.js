import styles from "./page.css";
import { promises as fs} from 'fs';

export const metadata = {
  title: "One Player",
};

function parser(file){
  const newLines = file.split("\n")

  let board_size = newLines[0].slice(-6)
  let boat_carrier = newLines[1].slice(-2)
  let boat_battleship = newLines[2].slice(-2)
  let boat_destroyer = newLines[3].slice(-2)
  let boat_submarine = newLines[4].slice(-2)
  let boat_patrolboat = newLines[5].slice(-1)

  //hardcode a search for v1

  // console.log(board_size);
  // console.log(boat_carrier);
  // console.log(boat_battleship);
  // console.log(boat_destroyer);
  // console.log(boat_submarine);
  // console.log(boat_patrolboat);

  const config = {
    boardSize: board_size,
    carrierSize: boat_carrier, 
    battleshipSize: boat_battleship,
    destroyerSize: boat_destroyer,
    submarineSize: boat_submarine,
    patrolBoatSize: boat_patrolboat
  }

  return config
}

export default async function Play({ searchParams }) {
  //const gamemode = searchParams.gamemode;

  const rawFile = await fs.readFile(process.cwd() + '/src/app/adaship_config.ini', 'utf8'); //read from the adaship config file
  const config = parser(rawFile);
  

  return (
    <div>
      <div>
        <p>put navbar here</p>
      </div>
      <h1 className="title">One Player</h1>
      <div className="grid">
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
        <p>poo</p>
      </div>
      <footer>© Asher De Souza 2023</footer>
    </div>
    
  );

  //create a grid in HTML/CSS to mirror what is created within the code
  //create a default array type then create two arrays from that, one target and one shipboard
}
