import { Countdown } from './components/Countdown'
import { Timer } from './components/Timer'
import { LabelFrame } from './components/LabelFrame'

function App() {

  return (
    <>
      <LabelFrame >
        <Timer />
      </LabelFrame>
      <LabelFrame defaultLabel="Countdown">
        <Countdown />
      </LabelFrame>
    </>
  )
}

export default App
