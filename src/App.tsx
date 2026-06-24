import { Countdown } from './components/Countdown'
import { Timer } from './components/Timer'
import { LabelFrame } from './components/LabelFrame'
import { ScreenManager } from './components/ScreenManager'

function App() {
  return (
    <ScreenManager>
      <LabelFrame>
        <Timer />
      </LabelFrame>
      <LabelFrame defaultLabel="Countdown">
        <Countdown />
      </LabelFrame>
    </ScreenManager>
  )
}

export default App
