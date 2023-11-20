import styles from './page.css'

export const metadata = {
    title: 'Two Player',
  }

export default function Play({searchParams}) {
    const gamemode = searchParams.gamemode
    //console.log(gamemode)
    return <h1 className="title">Two Player</h1>
}