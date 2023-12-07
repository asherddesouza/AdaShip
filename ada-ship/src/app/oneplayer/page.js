import ContinueButton, { AutoPlace, AutoPlaceAll, HelpButton, ResetBoard, RestartButton } from "../components/buttons/buttons";
import Grid from "../components/gamegrid/grid";
import MessageLog from "../components/messagelog/messagelog";
import styles from "./page.css";
import { promises as fs} from 'fs';

export const metadata = {
  title: "One Player",
};

function parser(file){
  const newLines = file.split("\n") // get each line

  let board_size = newLines[0].replace(/\D/g, "");
  let halfBoard = board_size.split("")
  let gridWidthObj = halfBoard.slice(0, halfBoard.length / 2)
  let gridHeightObj = halfBoard.slice(halfBoard.length / 2)
  let grid_width = parseInt(gridWidthObj.join(''))
  let grid_height = parseInt(gridHeightObj.join('')) // parse the grid's length and width


  let boat_carrier = parseInt(newLines[1].replace(/\D/g, ""));
  let boat_battleship = parseInt(newLines[2].replace(/\D/g, ""));
  let boat_destroyer = parseInt(newLines[3].replace(/\D/g, ""));
  let boat_submarine = parseInt(newLines[4].replace(/\D/g, ""));
  let boat_patrolboat = parseInt(newLines[5].replace(/\D/g, ""));

  const config = {
    gridWidth: grid_width,
    gridHeight: grid_height,
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

  //const battleshipGrid = document.getElementById("game-grid")

  return (
    <div>
      <h1 className="title">One Player</h1>
      <hr></hr>
      <br></br>

      <div className="game-window">
        <Grid
          width = {config.gridWidth}
          height = {config.gridHeight}
          carrier = {config.carrierSize}
          battleship = {config.carrierSize}
          destroyer = {config.destroyerSize}
          submarine = {config.submarineSize}
          patrolBoat = {config.patrolBoatSize}
        />

        <br></br>
        <MessageLog></MessageLog>

        <div className="button-container">
          <ContinueButton/>
          <AutoPlace/>
          <AutoPlaceAll/>
          <ResetBoard/>
          <RestartButton/>
        </div>
        <br/>
        <HelpButton
          carrier = {config.carrierSize}
          battleship = {config.carrierSize}
          destroyer = {config.destroyerSize}
          submarine = {config.submarineSize}
          patrolBoat = {config.patrolBoatSize}
        />
      </div>

      <footer>© Asher De Souza 2023</footer>
    </div>
    
  );


  //create a grid in HTML/CSS to mirror what is created within the code
  //create a default array type then create two arrays from that, one target and one shipboard
}
