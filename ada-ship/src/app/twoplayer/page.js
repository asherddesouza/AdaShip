export const metadata = {
    title: 'Two Player',
  }

export default function Play({searchParams}) {
    return <h1>Two Player, Gamemode: {searchParams.gamemode}</h1>
}