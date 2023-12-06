import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div>
        <h1>
          AdaShip
        </h1>
      </div>

      <p className='description'>A reimagined take on the classic game of Battleships.</p>
      <br></br>
      <hr></hr>
      <br></br>

      <div>
      <div className='game-selector'>
        <Link
          href={{
            pathname: "/oneplayer",
            query: {gamemode: "normal"}
        }}
        >
          <h2>
            Player vs Computer{' '}
            <span>
              -&gt;
            </span>
          </h2>
          <p>
            Play against a computer-generated opponent.
          </p>
        </Link>
      </div>

      <div className='game-selector'>
        <Link
          href={{
            pathname: "/twoplayer",
            query: {gamemode: "normal"}
        }}
        >
          <h2>
            Two Player{' '}
            <span>
              -&gt;
            </span>
          </h2>
          <p>
            Play locally against another person.
          </p>
        </Link>
      </div>

      <div className='game-selector'>
        <Link
          href={{
            pathname: "/oneplayer",
            query: {gamemode: "salvo"}
        }}>
          <h2>
            Player vs Computer (Salvo){' '}
            <span>
              -&gt;
            </span>
          </h2>
          <p>
            Play against a computer-generated opponent in Salvo mode.
          </p>
        </Link>
      </div>

      <div className='game-selector'>
        <Link
          href={{
            pathname: "/twoplayer",
            query: {gamemode: "salvo"}
        }}
        >
          <h2>
            Two Player (Salvo){' '}
            <span>
              -&gt;
            </span>
          </h2>
          <p>
            Play locally against another person in Salvo mode.
          </p>
        </Link>
      </div>

        <footer>© Asher De Souza 2023</footer>
      </div>
    </main>
  )
}
