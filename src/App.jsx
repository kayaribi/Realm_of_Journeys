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
import "./styles.css";
import Navbar from "./assets/components/Navbar";
import FeaturedCard from "./assets/components/FeaturedCard";
import Home from "./pages/Home";
import About from "./pages/About";
import TravelSpots from "./pages/TravelSpots";
import TravelGuide from "./pages/TravelGuide";
import AnimateGo from "./assets/components/AnimateGo";

import featuredData from "./featuredData";

import featuredTitleIcon from "./assets/shiny_48px.svg";

import featuredImgIcon from "./assets/calendar.svg";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

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

  const signIn = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, {
        username: "RealmOfJourneys@gmail.com",
        password: "RealmOfJourneys",
      });

      const { token } = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    signIn();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-3">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/travelspots" element={<TravelSpots />}></Route>
          <Route path="/travelguide" element={<TravelGuide />}></Route>
        </Routes>
      </div>

      {/* 精選行程 - 倫倫 */}
      <div className="container py-20">
        <div className="d-flex align-items-center mb-5">
          <img src={featuredTitleIcon} alt="" />
          <h2 className="text-primary-600 fs-12 ms-4">精選行程</h2>
        </div>
        <div className="row row-cols-2">
          {featuredData.map((item, index) => (
            <FeaturedCard
              key={item.id}
              featuredItem={item}
              index={index}
              featuredImgIcon={featuredImgIcon}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
