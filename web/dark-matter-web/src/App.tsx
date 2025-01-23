import './App.css'
import { useTheme } from './providers/theme-provider'

function App() {

  const toggle = useTheme();

  return (
    <div className='bg-gray-50 dark:bg-gray-900 wrapper w-full h-full'>
      <button className='button is-primary' onClick={() => {toggle.toggle();}}>aaaa</button>
    </div>
  )
}

export default App
