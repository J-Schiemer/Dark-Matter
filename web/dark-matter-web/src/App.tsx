import './App.css'
import { useTheme } from './providers/theme-provider'

function App() {

  const toggle = useTheme();

  return (
    <>
      <button className='button is-primary' onClick={() => {toggle.toggle();}}>aaaa</button>
    </>
  )
}

export default App
