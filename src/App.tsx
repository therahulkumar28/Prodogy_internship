
import Appbar from './component/Appbar'
import Stopwatch from './component/Stopwatch'
import TicTacToe from './component/Tictactoe'
import Weather from './component/Weatherapp'


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
