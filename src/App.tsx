import { Countdown } from './components/Countdown'
import { Timer } from './components/Timer'
import { LabelFrame } from './components/LabelFrame'
import { ScreenManager } from './components/ScreenManager'
import data from './timersData.json'

function App() {
  const timers = data.map((timer, index) => {
    return (
      <LabelFrame key={index} defaultLabel={timer.name}>
        {timer.type === 'timer' ? <Timer initialSeconds={timer.value} /> : <Countdown initialSeconds={timer.value} />}
      </LabelFrame>
    )
  });

  return (
    <ScreenManager>
      {timers}
    </ScreenManager>
  )
}

export default App
