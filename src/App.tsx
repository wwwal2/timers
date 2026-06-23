import { Countdown } from './components/Countdown'
import { Timer } from './components/Timer'
import { LabelFrame } from './components/LabelFrame'
import { Box } from '@mui/material'

function App() {

  return (
    <Box sx={{ display: 'flex', gap: 2, p: 4 }}>
      <LabelFrame >
        <Timer />
      </LabelFrame>
      <LabelFrame defaultLabel="Countdown">
        <Countdown />
      </LabelFrame>
    </Box>
  )
}

export default App
