import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styling/background.css'
import './styling/glass.css'
import './styling/home.css'
import './styling/projects.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
