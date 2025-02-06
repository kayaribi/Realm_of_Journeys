import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../scss/pages/evaluate.scss';

const EvaluateData = [
  {
    id: 1,
    name: "Emma L.",
    customer: "images/people_05.png",
    vacation: "參加 法國義大利經典雙城八日",
    date: "2024/12/01",
    comment: "這趟旅程很棒，行程安排很周到，小缺點是導遊的講解還可以更詳細些，其他都很滿意。",
    star: 5
  },
  {
    id: 2,
    name: "James T",
    customer: "images/people_04.png",
    vacation: "參加 法國義大利經典雙城八日",
    date: "2024/11/30",
    comment: "非常方便的全包服務，不用煩惱任何細節，一切都安排得妥妥的，下次旅行還會選擇你們！",
    star: 5
  },
  {
    id: 3,
    name: "陳佳君",
    customer: "images/people_03.png",
    vacation: "參加 捷克匈牙利多瑙河之旅六日",
    date: "2024/11/28",
    comment: "這次的行程讓我們全家都很開心，特別喜歡自由活動的時間，希望能有更多選項可以選擇。",
    star: 5
  },
  {
    id: 4,
    name: "Sophia W.",
    // customer: customer_01,
    vacation: "參加 日本京都奈良賞楓五日",
    date: "2024/11/25",
    comment: "行程規劃得很棒，賞楓的景點很美，導遊也很貼心，推薦給喜歡秋季旅行的朋友！",
    star: 5
  },
  {
    id: 5,
    name: "David H.",
    // customer: customer_02,
    vacation: "參加 美國西岸黃石公園十日",
    date: "2024/11/20",
    comment: "壯麗的自然風景令人驚嘆，住宿安排也很不錯，唯一希望是每天的行程時間可以再放鬆一些。",
    star: 4
  },
  {
    id: 6,
    name: "林美玲",
    // customer: customer_03,
    vacation: "參加 韓國首爾美食文化五日",
    date: "2024/11/18",
    comment: "吃遍了各種韓國特色美食，韓服體驗也很有趣！不過購物行程稍多了一點。",
    star: 4
  },

]


function Evaluate() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  const widthRef = useRef(window.innerWidth);

  // 監聽視窗變更
  useEffect(() => {
    const handleResize = () => {
      widthRef.current = window.innerWidth;
      console.log("視窗寬度變更：", widthRef.current);
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <>
      <div
        style={isDesktop
          ? {
            backgroundImage: "url(images/message-bgc.png)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "642px"
          }
          : {
            backgroundImage: "url(images/message-bgc.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "812px",
          }
        }
      >
        <div className="container">
          <div className="title-family h1 text-white text-center pt-10 pb-8">我們的旅程，由您見證</div>
          {isDesktop ? (
            //桌面版
            <Swiper
              slidesPerView={4}
              spaceBetween={24}
              navigation={true}
              mousewheel={true}
              keyboard={true}
              pagination={pagination}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            // modules={[Pagination]}
            >
              {EvaluateData.map((evaluate) => {
                return (
                  <SwiperSlide key={evaluate.id}>
                    <div className="d-flex flex-column align-items-stretch h-100">
                      <div className="card card-custom px-6 py-4">
                        <div className="d-flex gap-1 pb-2">
                          {[...Array(evaluate.star)].map((_, i) => (
                            <img key={i} src="images/icon/star.svg" style={{ width: "16px", height: "15px" }} alt="star" />
                          ))}
                        </div>
                        <p className="fs-10 mb-auto text-neutral-black">
                          {evaluate.comment}
                        </p>
                        <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                          <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                          <div className="text-neutral-200 fs-11">{evaluate.date}</div>
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                          <img src={evaluate.customer} style={{ width: "32px", height: "32px" }} alt="customer_01" />
                          <div>
                            <p className="fs-11 text-neutral-300">{evaluate.name}</p>
                            <p className="fs-11 text-neutral-200">{evaluate.vacation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
              {/* <SwiperSlide>
                <div className="card card-custom px-6 py-4">
                  <div className="d-flex gap-1 pb-2">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={star} style={{ width: "16px", height: "15px" }} alt="star" />
                    ))}
                  </div>
                  <p className="fs-10 pb-2 text-neutral-black pb-5">
                    這趟旅程很棒，行程安排很周到，小缺點是導遊的講解還可以更詳細些，其他都很滿意。
                  </p>
                  <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                    <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                    <div className="text-neutral-200 fs-11">2024/12/01</div>
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    <img src={customer_01} style={{ width: "32px", height: "32px" }} alt="customer_01" />
                    <div>
                      <p className="fs-11 text-neutral-300">Emma L.</p>
                      <p className="fs-11 text-neutral-200">參加 法國義大利經典雙城八日</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card card-custom px-6 py-4">
                  <div className="d-flex gap-1 pb-2">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={star} style={{ width: "16px", height: "15px" }} alt="star" />
                    ))}
                  </div>
                  <p className="fs-10 pb-2 text-neutral-black pb-5">
                    非常方便的全包服務，不用煩惱任何細節，一切都安排得妥妥的，下次旅行還會選擇你們！
                  </p>
                  <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                    <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                    <div className="text-neutral-200 fs-11">2024/11/30</div>
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    <img src={customer_02} style={{ width: "32px", height: "32px" }} alt="customer_02" />
                    <div>
                      <p className="fs-11 text-neutral-300">James T.</p>
                      <p className="fs-11 text-neutral-200">參加 法國義大利經典雙城八日</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card card-custom px-6 py-4">
                  <div className="d-flex gap-1 pb-2">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={star} style={{ width: "16px", height: "15px" }} alt="star" />
                    ))}
                  </div>
                  <p className="fs-10 pb-2 text-neutral-black pb-5">
                    這次的行程讓我們全家都很開心，特別喜歡自由活動的時間，希望能有更多選項可以選擇。
                  </p>
                  <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                    <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                    <div className="text-neutral-200 fs-11">2024/11/28</div>
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    <img src={customer_03} style={{ width: "32px", height: "32px" }} alt="customer_03" />
                    <div>
                      <p className="fs-11 text-neutral-300">陳佳君</p>
                      <p className="fs-11 text-neutral-200">參加 捷克匈牙利多瑙河之旅六日</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card card-custom px-6 py-4">
                  <div className="d-flex gap-1 pb-2">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={star} style={{ width: "16px", height: "15px" }} alt="star" />
                    ))}
                  </div>
                  <p className="fs-10 pb-2 text-neutral-black pb-5">
                    這次的行程讓我們全家都很開心，特別喜歡自由活動的時間，希望能有更多選項可以選擇。
                  </p>
                  <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                    <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                    <div className="text-neutral-200 fs-11">2024/11/28</div>
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    <img src={customer_03} style={{ width: "32px", height: "32px" }} alt="customer_03" />
                    <div>
                      <p className="fs-11 text-neutral-300">陳佳君</p>
                      <p className="fs-11 text-neutral-200">參加 捷克匈牙利多瑙河之旅六日</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card card-custom px-6 py-4">
                  <div className="d-flex gap-1 pb-2">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={star} style={{ width: "16px", height: "15px" }} alt="star" />
                    ))}
                  </div>
                  <p className="fs-10 pb-2 text-neutral-black pb-5">
                    這次的行程讓我們全家都很開心，特別喜歡自由活動的時間，希望能有更多選項可以選擇。
                  </p>
                  <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                    <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                    <div className="text-neutral-200 fs-11">2024/11/28</div>
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    <img src={customer_03} style={{ width: "32px", height: "32px" }} alt="customer_03" />
                    <div>
                      <p className="fs-11 text-neutral-300">陳佳君</p>
                      <p className="fs-11 text-neutral-200">參加 捷克匈牙利多瑙河之旅六日</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide> */}
            </Swiper>) : (
            //手機版
            <Swiper
              slidesPerView={1}
              spaceBetween={12} // 卡片間距
              navigation={true}
              mousewheel={true}
              keyboard={true}
              pagination={pagination}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            // direction="horizontal" // 手機版向左滑動換頁
            // direction="vertical"
            // className="swiper-vertical"
            >
              <SwiperSlide>
                <div className="d-flex flex-column gap-6">
                  <div className="card card-custom px-6 py-4">
                    <div className="d-flex gap-1 pb-2">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src="" style={{ width: "16px", height: "15px" }} alt="star" />
                      ))}
                    </div>
                    <p className="fs-10 pb-2 text-neutral-black pb-5">
                      這趟旅程很棒，行程安排很周到，小缺點是導遊的講解還可以更詳細些，其他都很滿意。
                    </p>
                    <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                      <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                      <div className="text-neutral-200 fs-11">2024/12/01</div>
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <img src="./public/images/people_05.png" style={{ width: "32px", height: "32px" }} alt="customer_01" />
                      <div>
                        <p className="fs-11 text-neutral-300">Emma L.</p>
                        <p className="fs-11 text-neutral-200">參加 法國義大利經典雙城八日</p>
                      </div>
                    </div>
                  </div>
                  <div className="card card-custom px-6 py-4">
                    <div className="d-flex gap-1 pb-2">
                      {[...Array(4)].map((_, i) => (
                        <img key={i} src="" style={{ width: "16px", height: "15px" }} alt="star" />
                      ))}
                    </div>
                    <p className="fs-10 pb-2 text-neutral-black pb-5">
                      非常方便的全包服務，不用煩惱任何細節，一切都安排得妥妥的，下次旅行還會選擇你們！
                    </p>
                    <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                      <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                      <div className="text-neutral-200 fs-11">2024/11/30</div>
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <img src="./public/images/people_04.png" style={{ width: "32px", height: "32px" }} alt="customer_02" />
                      <div>
                        <p className="fs-11 text-neutral-300">James T.</p>
                        <p className="fs-11 text-neutral-200">參加 法國義大利經典雙城八日</p>
                      </div>
                    </div>
                  </div>
                  <div className="card card-custom px-6 py-4">
                    <div className="d-flex gap-1 pb-2">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src="" style={{ width: "16px", height: "15px" }} alt="star" />
                      ))}
                    </div>
                    <p className="fs-10 pb-2 text-neutral-black pb-5">
                      這次的行程讓我們全家都很開心，特別喜歡自由活動的時間，希望能有更多選項可以選擇。
                    </p>
                    <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                      <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                      <div className="text-neutral-200 fs-11">2024/11/28</div>
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <img src="./public/images/people_03.png" style={{ width: "32px", height: "32px" }} alt="customer_03" />
                      <div>
                        <p className="fs-11 text-neutral-300">陳佳君</p>
                        <p className="fs-11 text-neutral-200">參加 捷克匈牙利多瑙河之旅六日</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="d-flex flex-column flex-xl-row gap-6">
                  <div className="card card-custom px-6 py-4">
                    <div className="d-flex gap-1 pb-2">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src="" style={{ width: "16px", height: "15px" }} alt="star" />
                      ))}
                    </div>
                    <p className="fs-10 pb-2 text-neutral-black pb-5">
                      這趟旅程很棒，行程安排很周到，小缺點是導遊的講解還可以更詳細些，其他都很滿意。
                    </p>
                    <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                      <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                      <div className="text-neutral-200 fs-11">2024/12/01</div>
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <img src="" style={{ width: "32px", height: "32px" }} alt="customer_01" />
                      <div>
                        <p className="fs-11 text-neutral-300">Emma L.</p>
                        <p className="fs-11 text-neutral-200">參加 法國義大利經典雙城八日</p>
                      </div>
                    </div>
                  </div>
                  <div className="card card-custom px-6 py-4">
                    <div className="d-flex gap-1 pb-2">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src="" style={{ width: "16px", height: "15px" }} alt="star" />
                      ))}
                    </div>
                    <p className="fs-10 pb-2 text-neutral-black pb-5">
                      非常方便的全包服務，不用煩惱任何細節，一切都安排得妥妥的，下次旅行還會選擇你們！
                    </p>
                    <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                      <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                      <div className="text-neutral-200 fs-11">2024/11/30</div>
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <img src="" style={{ width: "32px", height: "32px" }} alt="customer_02" />
                      <div>
                        <p className="fs-11 text-neutral-300">James T.</p>
                        <p className="fs-11 text-neutral-200">參加 法國義大利經典雙城八日</p>
                      </div>
                    </div>
                  </div>
                  <div className="card card-custom px-6 py-4">
                    <div className="d-flex gap-1 pb-2">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src="" style={{ width: "16px", height: "15px" }} alt="star" />
                      ))}
                    </div>
                    <p className="fs-10 pb-2 text-neutral-black pb-5">
                      這次的行程讓我們全家都很開心，特別喜歡自由活動的時間，希望能有更多選項可以選擇。
                    </p>
                    <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                      <div style={{ flexGrow: "1", borderBottom: "1px solid #878787", marginRight: "10px" }}></div>
                      <div className="text-neutral-200 fs-11">2024/11/28</div>
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <img src="" style={{ width: "32px", height: "32px" }} alt="customer_03" />
                      <div>
                        <p className="fs-11 text-neutral-300">陳佳君</p>
                        <p className="fs-11 text-neutral-200">參加 捷克匈牙利多瑙河之旅六日</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          )}
        </div>
        {/* 自訂分頁按鈕 */}
        {/* <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item"><button type="button" className="page-link page-link-custom"><FontAwesomeIcon icon={faAnglesLeft} style={{ color: "white", fontSize: "24px" }} /></button></li>
            <li className="page-item active"><button className="page-link" href="#">1</button></li>
            <li className="page-item" aria-current="page"><button type="button" className="page-link page-link-custom" href="#">2</button></li>
            <li className="page-item"><button type="button" className="page-link" href="#">3</button></li>
            <li className="page-item">
              <button type="button" className="page-link page-link-custom">
                <FontAwesomeIcon icon={faAnglesRight} style={{ color: "white", fontSize: "24px" }} />
              </button>
            </li>
          </ul>
        </nav> */}
      </div >
    </>
  );
}

export default Evaluate;