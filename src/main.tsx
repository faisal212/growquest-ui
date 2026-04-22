import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

window.__TWEAKS = {
  theme: 'dark',
  accent: 'amber',
  tileLayout: 'stack',
  xpStyle: 'notched',
  tileDensity: 'comfortable',
  heroStyle: 'grid-poster',
  rewardsLayout: 'side-by-side',
  rewardsRatio: 'missions-heavy',
  mobileNav: 'top',
  mobileDensity: 'comfortable',
  mobileHero: 'show',
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
