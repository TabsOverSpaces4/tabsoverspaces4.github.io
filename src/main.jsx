import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Portfolio from './App.jsx'
import AssistAIPage from './pages/AssistAI.jsx'

function AppRouter() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleNav = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handleNav)
    return () => window.removeEventListener('popstate', handleNav)
  }, [])

  if (path === '/projects/assistai') return <AssistAIPage />
  return <Portfolio />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
