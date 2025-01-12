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
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
      <div className="">
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <div>
          <button onClick={handleClick} className="btn btn-primary">
            顯示成功彈窗
          </button>
        </div>
        <h1>Vite + React</h1>
        <button className='gradient-brown' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div className="card">
          <p className="gradient-blue h0">全包服務，無憂旅程</p>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
            <br />
            <br />
            <button className='btn btn-secondary-200'>測試</button>
            <button className='btn btn-outline-secondary-200'>測試</button>
            <button className='btn btn-outline-secondary-200' disabled>測試</button>
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
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Default checkbox
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" disabled />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Default radio
          </label>
        </div>
        <AnimateGo animation="animate__slideInRight">
          <h2>
            測試
          </h2>
        </AnimateGo>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
      </div>
    </>
  )
}

export default App
