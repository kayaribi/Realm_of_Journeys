import { useState, useEffect, useRef, createRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import axios from "axios";
import WOW from "wow.js";
import "animate.css";
import featuredData from "../featuredData";
import featuredTitleIcon from "../../public/images/icon/shiny_48px.svg";
import FeaturedCard from "../components/FeaturedCard";
import { Evaluate, FAQ } from "../components";




const BASE_URL = import.meta.env.VITE_BASE_URL;
const images = [
  "images/banner_img_01.jpg",
  "images/banner_img_02.jpg",
  "images/banner_img_03.jpg",
  "images/banner_img_04.jpg",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRefs = useRef(images.map(() => createRef()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const signIn = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/admin/signin`, {
        username: "RealmOfJourneys@gmail.com",
        password: "RealmOfJourneys",
      });
    } catch (error) {
      console.error("登入錯誤:", error);
    }
  };
  useEffect(() => {
    signIn();
  }, []);

  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  return (
    <>

      {/* --------------------- header - Hailey --------------------- */}
      <header id="header" className="position-relative slideshow-container">
        {images.map((image, index) => (
          <CSSTransition
            key={index}
            in={currentImageIndex === index}
            timeout={2500}
            classNames={{
              appear: `slideshow-image-appear-${index}`,
              appearActive: `slideshow-image-appear-active-${index}`,
              enter: `slideshow-image-enter-${index}`,
              enterActive: `slideshow-image-enter-active-${index}`,
              exit: `slideshow-image-exit-${index}`,
              exitActive: `slideshow-image-exit-active-${index}`,
            }}
            appear={true}
            unmountOnExit
            nodeRef={imageRefs.current[index]}
          >
            <div
              ref={imageRefs.current[index]}
              className="slideshow-image"
              style={{
                backgroundImage: `url(${image})`,
                zIndex: index,
              }}
            />
          </CSSTransition>
        ))}

        {/* 深色遮罩 */}
        <div
          className="position-absolute top-0 end-0 start-0 bottom-0 z-1"
          style={{
            background: "rgba(28, 28, 28, 0.3)",
          }}
        ></div>
        {/* 標題 */}
        <div className="container text-state text-md-center text-white position-relative d-md-flex flex-column justify-content-center h-100 headerPadding">
          <h2
            className="fs-md-1 fs-2 title-family position-relative z-3 py-xl-2"
            style={{
              mixBlendMode: "overlay",
            }}
          >
            Realm <br className="d-md-none" />
            of <br className="d-md-none" />
            Journeys
            <span
              className="fs-5 d-xl-block d-none position-absolute bottom-0 start-50 translate-middle-x text-nowrap"
              style={{
                textShadow: "0 0 10px rgba(23, 70, 117, 1)",
              }}
            >
              探索世界不費心，全包服務伴你行。
            </span>
          </h2>

          <h3
            className="fs-md-5 fs-8 position-relative z-3 d-xl-none d-block mt-8 text-nowrap"
            style={{
              textShadow: "0 0 10px rgba(23, 70, 117, 1)",
            }}
          >
            探索世界不費心，全包服務伴你行。
          </h3>

          {/* 按鈕 - Desktop */}
          <Link to="/travelSpots" className="text-white d-none d-md-block">
            <div
              className="gradient-brown position-absolute z-3 end-0 bottom-0 text-center buttonShadowDesktop"
              style={{
                width: "320px",
                height: "160px",
                borderRadius: "320px 320px 0 0",
              }}
            >
              <p
                className="mb-2 fs-10"
                style={{
                  marginTop: "67px",
                }}
              >
                省時省力，輕鬆出發！
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <h5 className="my-2 me-2 fs-7">尋找行程</h5>
                <img src="images/icon/right-arrow.svg" alt="尋找行程" />
              </div>
            </div>
          </Link>
          {/* 按鈕 - Mobile */}
          <Link to="/travelSpots" className="text-white d-md-none d-block">
            <div
              className="gradient-brown position-absolute z-3 end-0 bottom-0 text-center mb-6 me-6 buttonShadow"
              style={{
                width: "116px",
                height: "116px",
                borderRadius: "50%",
              }}
            >
              <p className="mt-4 mb-2 fs-11">
                省時省力，
                <br />
                輕鬆出發！
              </p>
              <h5 className="fs-9">尋找行程</h5>
              <img src="images/icon/right-arrow.svg" alt="尋找行程" />
            </div>
          </Link>
        </div>
      </header>
      <section className="bg-primary-50">
        <div className="container text-center py-15 py-md-20 animate__slideInUp">
          <h3 className="fs-8 fs-md-5 mb-12 mb-md-10 text-primary-600 title-family wow animate__animated animate__slideInUp">
            選擇我們的好處⋯⋯
          </h3>
          <div className="row wow animate__animated animate__slideInUp">
            <div className="col-lg-4">
              <img src="images/icon/Vector.svg" alt="全包服務，無憂旅程" />
              <h4 className="my-3 my-md-5 gradient-blue fs-8 fs-md-6">
                全包服務，無憂旅程
              </h4>
              <p className="px-6 fs-10 fs-md-9">
                我們提供一站式的全包行程，涵蓋機票、住宿、交通、景點門票等所有細節，讓您省去繁瑣的規劃，輕鬆享受每一刻旅程。
              </p>
            </div>
            <div className="col-lg-4 my-lg-0 my-10">
              <img src="images/icon/Vector-1.svg" alt="精選小團體，靈活自由" />
              <h4 className="my-3 my-md-5 gradient-blue fs-8 fs-md-6">
                精選小團體，靈活自由
              </h4>
              <p className="px-6 fs-10 fs-md-9">
                我們的行程設計避免了大團體的擁擠與不便，提供更高的自由度和更精緻的體驗，讓每次旅行都能夠更加個性化。
              </p>
            </div>
            <div className="col-lg-4">
              <img src="images/icon/Vector-2.svg" alt="快速預定，隨時出發" />
              <h4 className="my-3 my-md-5 gradient-blue fs-8 fs-md-6">
                快速預定，隨時出發
              </h4>
              <p className="px-6 fs-10 fs-md-9">
                網站操作簡單直觀，無論規劃還是預訂，都能快速完成。讓您隨時輕鬆進入下一段旅行，無需浪費時間等待。
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*  --------------------- 精選行程 --------------------- */}
      {/* 精選行程 - 倫倫 */}
      <section className="bg-white">
        <div className="container pt-lg-20 pb-lg-20 pt-15 pb-9 ">
          <div className="d-flex align-items-center mb-lg-5 mb-8 wow animate__animated animate__slideInUp">
            <div className="featuredTitleIcon">
              <img
                style={{ width: "100%", height: "100%" }}
                src={featuredTitleIcon}
                alt="精選行程標題icon"
              />
            </div>
            <h2 className="text-primary-600 fs-sm-3 fs-6 ms-sm-4 ms-2 title-family">
              精選行程
            </h2>
          </div>

          <div className="row row-cols-lg-2 row-cols-1">
            {featuredData.map((item, index) => (
              <FeaturedCard key={item.id} featuredItem={item} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Evaluate />
      <FAQ />
    </>
  );
}
