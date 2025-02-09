import {Route,Routes} from 'react-router-dom';
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
// 匯入頁面(pages>index.jsx做匯入喔)
import {Home,About,Cart,Account,TravelGuide,TravelSpots,TouristSpots,TouristIndex} from './pages';
// 匯入元件(去components>index.jsx做匯入喔)
import {AnimateGo,BackTopBtn,DepartureTimeDecoration,FeaturedCard,Footer,Navbar} from './components';
import Evaluate from "./pages/Evaluate";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
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

