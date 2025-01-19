import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bulma/css/bulma.min.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
