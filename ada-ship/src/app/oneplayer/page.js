import styles from "./page.css";
import { promises as fs} from 'fs';
import { ini } from 'ini';

export const metadata = {
  title: "One Player",
};

export default async function Play({ searchParams }) {
  const gamemode = searchParams.gamemode;

  const file = await fs.readFile(process.cwd() + '/src/app/adaship_config.ini', 'utf8');
  const data = ini.parse(file);
  


  return (
    <div>
      <h1 className="title">One Player</h1>
      <p>{data}</p>
    </div>
  );

  //create a file parser to take what's in adaship_config to define ship and board sizes
  //create a grid in HTML/CSS to mirror what is created within the code
  //create a default array type then create two arrays from that, one target and one shipboard
}
