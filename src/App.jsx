import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import Navbar from './assets/components/Navbar';
import Home from './pages/Home'
import About from './pages/About'
import TravelSpots from './pages/TravelSpots'
import TravelGuide from './pages/TravelGuide'
import AnimateGo from './assets/components/AnimateGo';


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    Swal.fire({
      title: "Drag me!",
      icon: "success",
      draggable: true
    });
  };

  return (
    <>
      <Navbar />
      <div className="mt-3">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/travelspots' element={<TravelSpots />}></Route>
          <Route path='/travelguide' element={<TravelGuide />}></Route>
        </Routes>
      </div>
      
    </>
  )
}

export default App
