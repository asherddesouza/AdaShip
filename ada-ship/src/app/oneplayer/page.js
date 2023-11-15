export const metadata = {
    title: 'One Player',
  }

export default function Play({searchParams}) {
    return <h1>One Player, Gamemode: {searchParams.gamemode}</h1>
}