import styles from './page.css'

export const metadata = {
    title: 'One Player',
  }

export default function Play({searchParams}) {
    const gamemode = searchParams.gamemode
    console.log(gamemode)
    return <h1 className='title'>One Player</h1>

    //fix css
    //create a file parser to take what's in adaship_config to define ship and board sizes
    //create a grid in HTML/CSS to mirror what is created within the code
    //create a default array type then create two arrays from that, one target and one shipboard
}