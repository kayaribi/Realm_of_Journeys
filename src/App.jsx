import { useState } from 'react'
import axios from 'axios'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button className='gradient-brown' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
          <br />
          <h0 className="shadow-banner-text">全包服務，無憂旅程</h0>
          <br />
          <button className='btn btn-outline-primary-600'>測試</button>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item disabled">
          <a className="page-link page-link-custom">Previous</a>
        </li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item active" aria-current="page">
          <a className="page-link page-link-custom" href="#">2</a>
        </li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item">
          <a className="page-link page-link-custom" href="#">Next</a>
        </li>
      </ul>
</nav>
    <div className="card card-custom">
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and content.</p>
        <a href="#" className="btn btn-primary-600">Go somewhere</a>
      </div>
    </div>
    </>
  )
}

export default App
