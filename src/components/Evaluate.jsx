import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import evaluateData from '../evaluateData';

/* =====================
  分組資料的工具函式
  將陣列切割成固定大小的多個子陣列
===================== */
const chunkArray = (array, size) => {
  return array.reduce((acc, _, i) => {
    // 每當索引值是 size 的倍數，就切一組子陣列
    if (i % size === 0) acc.push(array.slice(i, i + size));
    return acc;
  }, []);
};

// 根據不同裝置設定不同的分組（桌面版每頁 4 筆、手機版每頁 3 筆）
const groupedPhoneData = chunkArray(evaluateData, 3);
const groupedDesktopData = chunkArray(evaluateData, 4);

/* =====================
  自定義分頁元件
  依據 totalPages 與 currentPage 顯示不同的頁碼
===================== */
const CustomPagination = ({ totalPages, currentPage, onClickPage, swiperInstance }) => {
  let pages = [];

  // 當總頁數小於等於 3 時，直接顯示所有頁碼
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 如果總頁數超過 3，則依照目前的頁碼來顯示部分頁碼與省略號
    if (currentPage === 1) {
      pages = [1, "ellipsis", totalPages];
    } else if (currentPage === 2) {
      pages = [1, 2, "ellipsis", totalPages];
    } else if (currentPage === totalPages) {
      pages = [1, "ellipsis", totalPages - 1, totalPages];
    } else {
      pages = [1, "ellipsis", currentPage, totalPages];
    }
  }

  return (
    <div className="pagination-container">
      {/* 左箭頭按鈕，當在第一頁時禁用 */}
      <button
        className={`pagination-button prev ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => swiperInstance?.slidePrev()}
      >
        <img src="images/icon/chevrons-left.svg" alt="Previous" />
      </button>

      {/* 分頁數字與省略號部分 */}
      <div className="custom-pagination">
        {pages.map((item, idx) => {
          if (item === "ellipsis") {
            // 顯示省略號
            return (
              <span key={idx} className="pagination-ellipsis">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            );
          } else {
            // 顯示數字按鈕，並在點擊時觸發 onClickPage 方法
            return (
              <span
                key={idx}
                onClick={() => onClickPage(item)}
                className={`pagination-bullet ${item === currentPage ? "active" : ""}`}
              >
                {item}
              </span>
            );
          }
        })}
      </div>

      {/* 右箭頭按鈕，當在最後一頁時禁用 */}
      <button
        className={`pagination-button next ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => swiperInstance?.slideNext()}
      >
        <img src="images/icon/chevrons-right.svg" alt="Next" />
      </button>
    </div>
  );
};

/* =====================
  Evaluate 主元件
  根據裝置寬度顯示桌面版或手機版的 Swiper 評價區塊，並整合自定義分頁元件
===================== */
function Evaluate() {
  // 判斷是否為桌面版 (window.innerWidth >= 992 為桌面)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  // 使用 Ref 儲存目前視窗寬度 (方便在事件監聽中使用)
  const widthRef = useRef(window.innerWidth);
  // Swiper 的實例，用來操作 Swiper API
  const [swiperInstance, setSwiperInstance] = useState(null);
  // 總頁數與目前頁碼的狀態
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------------
    當 Swiper 初始化後：
    - 計算總頁數
    - 設定目前頁碼
    - 監聽 Swiper 的 slideChange 事件，更新目前頁碼
  --------------------- */
  useEffect(() => {
    if (swiperInstance) {
      const total = Math.ceil((swiperInstance?.slides?.length || 1) / 1);
      setTotalPages(total);
      setCurrentPage(swiperInstance.realIndex + 1);

      swiperInstance.on("slideChange", () => {
        setCurrentPage(swiperInstance.realIndex + 1);
      });
    }
  }, [swiperInstance]);

  /* ---------------------
    點擊自定義分頁的數字時，切換到對應的頁面
  --------------------- */
  const handlePaginationClick = (page) => {
    if (swiperInstance) {
      swiperInstance.slideTo(page - 1);
    }
  };

  /* ---------------------
    當裝置版型切換（手機版 ↔ 桌面版）時：
      - 將 Swiper 切換回第一頁
      - 重設目前頁碼為 1
      - 重新計算總頁數
  --------------------- */
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(0);
      setCurrentPage(1);
      setTotalPages(Math.ceil((swiperInstance?.slides?.length || 1) / 1));
    }
  }, [isDesktop]);

  /* ---------------------
    監聽視窗大小改變事件，動態更新是否為桌面版
  --------------------- */
  useEffect(() => {
    const handleResize = () => {
      widthRef.current = window.innerWidth;
      setIsDesktop(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    // 清除事件監聽器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 根據裝置不同，設定背景圖片與大小 */}
      <div
        style={isDesktop
          ? {
            backgroundImage: "url(images/message-bgc.png)",
            backgroundSize: "100% 136%",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            height: "642px"
          }
          : {
            backgroundImage: "url(images/message-bgc.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "812px"
          }
        }
      >
        <div className="container evaluate">
          {/* 主標題 */}
          <div className="title-family h1 text-white text-center pt-10 pt-lg-20 pb-8 pb-lg-15 fs-lg-3">
            我們的旅程，由您見證
          </div>

          {isDesktop ? (
            // 桌面版 Swiper (使用 groupedDesktopData，每頁顯示 4 筆資料)
            <Swiper
              onSwiper={setSwiperInstance}
              slidesPerView={1}
              spaceBetween={24}
              mousewheel={true}
              keyboard={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            >
              {groupedDesktopData.map((group, index) => (
                <SwiperSlide key={index}>
                  <div className="d-flex gap-6">
                    {group.map((review) => (
                      <div key={review.id} className="card card-custom p-6">
                        {/* 顯示評分星星 */}
                        <div className="d-flex gap-2 pb-4">
                          {[...Array(review.star)].map((_, i) => (
                            <img
                              key={i}
                              src="images/icon/star.svg"
                              style={{ width: "24px", height: "24px" }}
                              alt="star"
                            />
                          ))}
                        </div>
                        {/* 顯示評論內容 */}
                        <p className="fs-9 text-neutral-black">
                          {review.comment}
                        </p>
                        {/* 顯示分隔線與評論日期 */}
                        <div className="mt-auto">
                          <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-4">
                            <div
                              style={{
                                flexGrow: "1",
                                borderBottom: "1px solid #878787",
                                marginRight: "10px"
                              }}
                            ></div>
                            <div className="text-neutral-200 fs-10">{review.date}</div>
                          </div>
                          {/* 顯示評論者資訊 */}
                          <div className="d-flex gap-2 align-items-center">
                            <img
                              src={review.customer}
                              style={{ width: "40px", height: "40px" }}
                              alt="customer_01"
                            />
                            <div>
                              <p className="fs-10 text-neutral-300">{review.name}</p>
                              <p className="fs-10 text-neutral-200">{review.vacation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // 手機版 Swiper (使用 groupedPhoneData，每頁顯示 3 筆資料)
            <Swiper
              onSwiper={setSwiperInstance}
              slidesPerView={1}
              spaceBetween={12} // 卡片間距
              mousewheel={true}
              keyboard={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            >
              {groupedPhoneData.map((group, index) => (
                <SwiperSlide key={index}>
                  <div className="d-flex flex-column gap-6">
                    {group.map((review) => (
                      <div key={review.id} className="card card-custom px-6 py-4">
                        {/* 顯示評分星星 */}
                        <div className="d-flex gap-1 pb-2">
                          {[...Array(review.star)].map((_, i) => (
                            <img
                              key={i}
                              src="images/icon/star.svg"
                              style={{ width: "16px", height: "16px" }}
                              alt="star"
                            />
                          ))}
                        </div>
                        {/* 顯示評論內容 */}
                        <div className="pb-2">
                          <p className="fs-10 text-neutral-black">
                            {review.comment}
                          </p>
                        </div>
                        {/* 顯示分隔線與評論日期 */}
                        <div className="mt-auto">
                          <div className="position-relative d-flex align-items-center justify-content-between w-100 pb-2">
                            <div
                              style={{
                                flexGrow: "1",
                                borderBottom: "1px solid #878787",
                                marginRight: "10px"
                              }}
                            ></div>
                            <div className="text-neutral-200 fs-11">{review.date}</div>
                          </div>
                          {/* 顯示評論者資訊 */}
                          <div className="d-flex gap-1 align-items-center">
                            <img
                              src={review.customer}
                              style={{ width: "32px", height: "32px" }}
                              alt={review.name}
                            />
                            <div>
                              <p className="fs-11 text-neutral-300">{review.name}</p>
                              <p className="fs-11 text-neutral-200">{review.vacation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {/* 自定義分頁元件，傳入目前頁碼、總頁數、分頁點擊事件以及 swiper 實例 */}
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onClickPage={handlePaginationClick}
            swiperInstance={swiperInstance}
          />
        </div>
      </div>
    </>
  );
}

export default Evaluate;
