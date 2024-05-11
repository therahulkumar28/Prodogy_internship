import dotenv from 'dotenv'
import Appbar from './component/Appbar'
import Stopwatch from './component/Stopwatch'
import TicTacToe from './component/Tictactoe'
import Weather from './component/Weatherapp'

dotenv.config()
function App() {

  return (
    <>
     <Appbar/>
     <div className="container mx-auto">

      <Stopwatch />
      <TicTacToe/>
      <Weather/>
    </div>
    </>
  )
}

export default App
