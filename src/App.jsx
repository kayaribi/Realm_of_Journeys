import { useState } from 'react'
import axios from 'axios'

import {Route,Routes} from 'react-router-dom';
import {Home,About,TravelGuide,TouristSpots,Cart,Account,TouristIndex} from './pages';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackTopBtn from './components/BackTopBtn';

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
          <Route path='/guide' element={<TravelGuide/>}></Route>               {/* 攻略指南 */}
          <Route path='/cart' element={<Cart/>}></Route>                 {/* 購物車 */}
          <Route path='/account' element={<Account/>}></Route>           {/* 登入註冊 */}
        </Routes>
        <BackTopBtn />
      <Footer/>
    </div>
    )
  }

  export default App