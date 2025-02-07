import Evaluate from "./pages/Evaluate";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./styles.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import TravelSpots from "./pages/TravelSpots";
import TravelGuide from "./pages/TravelGuide";
import AnimateGo from "./components/AnimateGo";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const handleClick = () => {
    Swal.fire({
      title: "Drag me!",
      icon: "success",
      draggable: true,
    });
  };

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/travelspots" element={<TravelSpots />}></Route>
          <Route path="/travelguide" element={<TravelGuide />}></Route>
        </Routes>
      </div>
      <Evaluate />
    </>
  );
}

export default App;
