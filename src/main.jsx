import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './scss/all.scss'
import App from './App.jsx'
import 'bootstrap'


createRoot(document.getElementById('root')).render(

  <HashRouter>
      <App />
  </HashRouter>,
)
