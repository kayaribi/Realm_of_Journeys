import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer';
import {Route,Routes} from 'react-router-dom';
import {Home,About,Guide,TouristSpots,Cart,Account,TouristIndex} from './pages';
import BackTopBtn from './component/BackTopBtn';


function App() {

  return (
    <div>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>                    {/* 首頁 */}
          <Route path='/about' element={<About/>}></Route>               {/* 關於我們 */}
          <Route path='/touristSpots' element={<TouristSpots/>}>         {/* 旅遊景點 */}
            <Route index element={<TouristIndex/>}></Route>                 {/* ---商品-呈現 */}
          </Route>
          <Route path='/guide' element={<Guide/>}></Route>               {/* 攻略指南 */}
          <Route path='/cart' element={<Cart/>}></Route>                 {/* 購物車 */}
          <Route path='/account' element={<Account/>}></Route>           {/* 登入註冊 */}
        </Routes>
        <BackTopBtn />
      <Footer/>
    </div>
    )
  }

  export default App

// const [count, setCount] = useState(0)
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button className='gradient-brown' onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//           <br />
//           <h0 className="shadow-banner-text">全包服務，無憂旅程</h0>
//           <br />
//           <button className='btn btn-outline-primary-600'>測試</button>
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//       <nav aria-label="...">
//       <ul className="pagination">
//         <li className="page-item disabled">
//           <a className="page-link page-link-custom">Previous</a>
//         </li>
//         <li className="page-item"><a className="page-link" href="#">1</a></li>
//         <li className="page-item active" aria-current="page">
//           <a className="page-link page-link-custom" href="#">2</a>
//         </li>
//         <li className="page-item"><a className="page-link" href="#">3</a></li>
//         <li className="page-item">
//           <a className="page-link page-link-custom" href="#">Next</a>
//         </li>
//       </ul>
// </nav>
    // <div className="card card-custom">
    //    <img src="..." className="card-img-top" alt="..." /> 
    //    <div className="card-body">
    //     <h5 className="card-title">Card title</h5>
    //     <p className="card-text">Some quick example text to build on the card title and content.</p>
    //     <a href="#" className="btn btn-primary-600">Go somewhere</a>
    //   </div>
    // </div> 

