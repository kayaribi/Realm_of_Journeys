import { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import WOW from "wow.js";
import "animate.css";
import { CartContext } from "../store/store";


export default function About() {
  const [email, setEmail] = useState(""); // 儲存 Email
  const [isValid, setIsValid] = useState(true); // 是否為有效 Email
  const [message, setMessage] = useState(""); // 錯誤訊息
  const [submittedEmail, setSubmittedEmail] = useState(""); // 顯示已輸入的 Email
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  const { showToast } = useContext(CartContext);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 驗證 Email 格式的函式
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email 正規表達式
    return emailRegex.test(email);
  };

  // 當 Email 輸入變更時觸發
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "") {
      setIsValid(true); // 如果輸入是空的，視為有效
      setMessage(""); // 清空錯誤訊息
      setSubmittedEmail(""); // 清空已提交的 Email
    } else if (validateEmail(value)) {
      setIsValid(true); // 如果輸入的是有效 Email
      setMessage(""); // 清空錯誤訊息
      setSubmittedEmail(""); // 清空已提交的 Email
    } else {
      setIsValid(false); // 無效 Email
      setMessage("請輸入有效的 Email"); // 顯示錯誤訊息
      setSubmittedEmail(""); // 清空已提交的 Email
    }
  };
  // 送出 Email 訂閱
  const handleSubmit = () => {
    if (!isValid || email === "") return;

    setSubmittedEmail(email); // 設定已輸入的 Email
    // alert(`訂閱成功！Email: ${email}`); // 彈出提示
    showToast(`訂閱成功！Email: ${email}`, "success");
    setEmail(""); // 清空輸入框
    setMessage(""); // 清空錯誤訊息
    setIsValid(true); // 設定為有效狀態
  };

  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  return (
    <div className="about">
      <header
        className="about-banner position-relative mb-8 mb-lg-20"
        id="header"
      >
        <div className="container about-banner-content translate-middle-y">
          <h3 className="text-white pb-2 fs-lg-4 title-family">關於行旅之境</h3>
          <p className="text-white fs-10 fs-lg-6">
            我們的故事，
            <br />
            來自於對旅行的熱愛與堅持。
          </p>
        </div>
      </header>
      <div className="container">
        <section className="text-lg-center mb-4 mb-lg-20">
          <p className="fs-10 fs-lg-6 mb-4 wow animate__animated animate__slideInUp">
            我們致力於為旅客提供一個高效便捷的平台，
            <br />
            省去繁瑣的行程規劃，打造無憂無慮的旅遊體驗。
          </p>
          <p className="fs-10 fs-lg-6 wow animate__animated animate__slideInUp">
            透過專業的服務與精心設計的全包行程，
            <br />
            讓每一位旅客輕鬆探索世界，留下難忘回憶。
          </p>
        </section>
        <section className="mb-lg-20">
          <div className="content-img-feature mb-4 mb-xl-0"></div>
          <div className="row">
            <div className="col-lg-6 wow animate__animated animate__slideInUp">
              <img
                className="d-none d-xl-block"
                src="images/about_feature_2.jpg"
                alt="about_feature_2"
                style={{
                  maxWidth: "416px",
                  height: "500px",
                  borderRadius: "24px",
                  objectFit: "cover",
                  marginTop: "-86px",
                  marginLeft: "110px",
                }}
              />
            </div>
            <div className="col-xl-6 d-flex flex-column justify-content-center wow animate__animated animate__slideInUp">
              <h3 className="text-black title-family mb-4 fs-lg-5">
                我們的特色
              </h3>
              <div className="mb-5 mb-lg-6">
                <div className="mb-6">
                  <h5 className="text-primary-600 mb-2 fs-lg-7">全包式服務</h5>
                  <p className="fs-10 fs-lg-9">
                    從交通、住宿到活動安排，一站式解決旅遊需求，讓您只需享受旅程。
                  </p>
                </div>
                <div className="mb-6 mb-lg-6">
                  <h5 className="text-primary-600 mb-2 fs-lg-7">
                    專業行程設計
                  </h5>
                  <p className="fs-10 fs-lg-9">
                    根據市場需求打造精緻路線，涵蓋必看景點與特色體驗。
                  </p>
                </div>
                <div>
                  <h5 className="text-primary-600 mb-2 fs-lg-7">
                    省心操作流程
                  </h5>
                  <p className="fs-10 fs-lg-9">
                    友好的網站介面與即時客服支援，為您提供流暢的預訂體驗。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-9 mb-lg-20">
          <div className="d-lg-flex flex-lg-row-reverse align-items-center gap-34">
            <div className="content-img-vision mb-4 wow animate__animated animate__slideInUp"></div>
            <div className="vision-content wow animate__animated animate__slideInUp">
              <h3 className="text-black title-family mb-4 fs-lg-5">
                我們的願景
              </h3>
              <p className="fs-10 fs-lg-9 mb-2 mb-lg-4">
                我們希望透過「一鍵全包」的旅遊服務，讓每位旅人都能輕鬆享受無憂的旅行體驗。無論是首次出國的新人，還是資深的旅行愛好者，都能透過我們的平台找到適合的行程，並免去繁瑣的安排與選擇。
              </p>
              <p className="fs-10 fs-lg-9">
                我們堅持以「省時、省力、安心」為核心理念，打造一個值得信賴的旅遊夥伴，讓旅遊變得簡單、愉快而難忘。
              </p>
            </div>
          </div>
        </section>
        <section className="mb-12 mb-lg-25">
          <h3 className="text-black title-family mb-9 mb-lg-15 fs-lg-5 text-lg-center wow animate__animated animate__slideInUp">
            開發成員介紹
          </h3>
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2, // 1400px 以上顯示 4 個卡片
                spaceBetween: 24,
              },
              992: {
                slidesPerView: 4, // 1400px 以上顯示 4 個卡片
                spaceBetween: 24,
                autoplay: false,
              },
            }}
            modules={[Autoplay]}
            className="wow animate__animated animate__slideInUp"
          >
            <SwiperSlide>
              <a href="https://github.com/Hailey-1025" target="_blank" rel="noopener noreferrer" className="link-animation text-decoration-none">
                <img className="mb-4" src="images/Hailey.jpg" alt="Hailey" />
                <p className="text-black text-center fs-md-6 fs-xl-5">Hailey</p>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="https://github.com/kayaribi" target="_blank" rel="noopener noreferrer" className="link-animation text-decoration-none">
                <img className="mb-4" src="images/Kaya.jpeg" alt="Kaya" />
                <p className="text-black text-center fs-md-6 fs-xl-5">Kaya</p>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="https://github.com/hbill320115" target="_blank" rel="noopener noreferrer" className="link-animation text-decoration-none">
                <img className="mb-4" src="images/star.jpg" alt="star" />
                <p className="text-black text-center fs-md-6 fs-xl-5">蘑菇星星</p>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="https://github.com/D1034422045" target="_blank" rel="noopener noreferrer" className="link-animation text-decoration-none">
                <img className="mb-4" src="images/lunlun.jpeg" alt="lunlun" />
                <p className="text-black text-center fs-md-6 fs-xl-5">倫倫</p>
              </a>
            </SwiperSlide>
          </Swiper>
        </section>
      </div>
      <section>
        <div className="content-img-sub">
          <div className="content-sub-content text-center wow animate__animated animate__slideInUp">
            <h3 className="text-white title-family mb-3 mb-lg-10 fs-lg-5">
              {isLargeScreen ? (
                "帶上行李，輕鬆出發，探索世界從此無負擔！"
              ) : (
                <>
                  帶上行李，輕鬆出發
                  <br />
                  探索世界從此無負擔！
                </>
              )}
            </h3>
            <div className="d-lg-flex justify-content-center align-items-center gap-lg-6">
              <p className="fs-11 fs-lg-6 text-white mb-4 mb-lg-0">
                訂閱我們即可收到更多行程資訊
              </p>
              <div className="px-3 mb-3 mb-lg-0 px-lg-0 ">
                <div className="input-group">
                  <input
                    type="email"
                    className={`form-control ${isValid ? "" : "is-invalid"
                      } fs-lg-9`}
                    placeholder="請輸入您的 Email 訂閱我們接收最新消息"
                    aria-label="請輸入您的 Email 訂閱我們接收最新消息"
                    aria-describedby="button-addon2"
                    value={email}
                    onChange={handleChange}
                    style={{ fontSize: "10px", lineHeight: "1.2" }} // 設定字體大小
                  />
                  <button
                    className="btn btn-secondary-200 rounded-0 fs-lg-9"
                    type="button"
                    id="button-addon2"
                    onClick={handleSubmit}
                    disabled={!isValid || email === ""} // Email 格式錯誤或未輸入時，按鈕無法點擊
                    style={{ fontSize: "10px" }} // 設定字體大小
                  >
                    訂閱
                  </button>
                </div>
                {!isLargeScreen && !isValid && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "10px" }}
                  >
                    {message}
                  </div>
                )}
                {!isLargeScreen && submittedEmail && (
                  <div
                    className="text-success mt-1"
                    style={{ fontSize: "10px" }}
                  >
                    您的 Email: {submittedEmail}
                  </div>
                )}
              </div>
            </div>
            {isLargeScreen && !isValid && (
              <div
                className="text-danger mt-1 fs-lg-7"
                style={{ fontSize: "10px" }}
              >
                {message}
              </div>
            )}
            {isLargeScreen && submittedEmail && (
              <div
                className="text-success mt-1 fs-lg-7"
                style={{ fontSize: "10px" }}
              >
                您的 Email: {submittedEmail}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
