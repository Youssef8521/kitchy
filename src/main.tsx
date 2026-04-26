import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProfileProvider } from './profile/ProfileContext'
import { ThemeProvider } from './theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </ThemeProvider>
  </StrictMode>,
)
