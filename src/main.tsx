import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// — Trocar entre as três versões da apresentação:
//   App        → versão "Editorial Tech" (verde + cyan + glow + grid)
//   AppMinimal → versão "Apple-style" (preto puro, monocromático, clean)
//   AppHero    → versão "Wave Hero" (Three.js wave bg + glassmorphism + #1f3dbc)
import App from './AppHero.tsx'
// import App from './AppMinimal.tsx'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
