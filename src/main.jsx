import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap'
import './assets/all.scss'
import { HashRouter } from 'react-router-dom' //路由

createRoot(document.getElementById('root')).render(

  <HashRouter>
    <App />
  </HashRouter>,
)
