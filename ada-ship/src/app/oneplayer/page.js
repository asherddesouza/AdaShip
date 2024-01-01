import styles from "./page.css";
import { promises as fs} from 'fs';
import Play from "./page.client"

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

export default async function Page() {
  const rawFile = await fs.readFile(process.cwd() + '/src/app/adaship_config.ini', 'utf8'); //read from the adaship config file
  const config = parser(rawFile);
  return (
    <Play 
      config={config}
    />
  )
}