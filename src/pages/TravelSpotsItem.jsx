import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
import DepartureTimeDecoration from "../components/DepartureTimeDecoration";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { CartContext } from "../store/CartContext.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const TravelSpotsItem = () => {
  const { id } = useParams(); // 取得網址中的產品 ID
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  const [quantity, setQuantity] = useState(1); // 預設數量為 1
  const { addCartItem } = useContext(CartContext); // 加入購物車

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    const fetchSpot = async () => {
      setIsScreenLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/v2/api/${API_PATH}/product/${id}`
        );
        if (response.data.success) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.error("請求失敗", error);
      } finally {
        setIsScreenLoading(false); // ✅ 確保請求完成後關閉 Loading
      }
    };
    fetchSpot();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/v2/api/${API_PATH}/products`
        );
        let allProducts = response.data.products; // 取得產品列表

        // 🔹 過濾掉當前產品
        allProducts = allProducts.filter((item) => item.id !== id);

        // 🔹 每次點選時重新隨機排序並選擇四個
        setRandomProducts(
          allProducts.sort(() => Math.random() - 0.5).slice(0, 4)
        );

      } catch (error) {
        console.error("請求失敗", error);
      }
    };

    fetchProducts();
  }, [id]); // 🔥 監聽 `id`，當 `id` 變更時重新執行

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleBuyNow = async () => {
    try {
      await addCartItem(id, quantity); // 確保購物車資料更新
      navigate("/cart"); // 更新完成後再跳轉
    } catch (error) {
      console.error("加入購物車失敗", error);
      Swal.fire({
        title: "加入購物車失敗",
        text: "請稍後再試！",
        icon: "error",
      });
    }
  };

  return (
    <div className="container product mt-16 pt-lg-12">
      {isScreenLoading ? (
        // 🟢 載入中時顯示 Loading 畫面
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 999,
          }}
        >
          <ReactLoading
            type="spokes"
            color="black"
            width="4rem"
            height="4rem"
          />
        </div>
      ) : product ? (
        // 🟢 載入完成，顯示內容
        <>
          <div className="row pb-lg-12">
            <div className="col-lg-6">
              <div className="py-6 py-lg-0">
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Thumbs, Autoplay]}
                  className="mySwiper2"
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                >
                  <SwiperSlide>
                    <img src={product.imageUrl} />
                  </SwiperSlide>
                  {product.imagesUrl?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={(swiper) => setThumbsSwiper(swiper)}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs, Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    992: {
                      spaceBetween: 24,
                    },
                  }}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src={product.imageUrl} />
                  </SwiperSlide>
                  {product.imagesUrl?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-detail pb-6 pb-lg-0">
                <div
                  className="pb-2 pb-lg-4"
                  style={{ borderBottom: "1px solid #C2DCF5" }}
                >
                  <h3 className="title-family fs-lg-5">{product.title}</h3>
                </div>
                <div className="pt-2 pt-lg-4">
                  <div className="pb-4 pb-lg-8">
                    <div className="d-flex align-items-center gap-1 pb-1 pb-lg-2">
                      <img
                        src="images/icon/calendar-black.svg"
                        width={24}
                        height={24}
                        alt="行程圖片"
                      />
                      <span className="fs-10 fs-lg-9">行程日期:</span>
                    </div>
                    <h5 className="text-primary-500 fs-lg-7">
                      2025/{product.travelDate}
                    </h5>
                  </div>
                  <div className="pb-4 pb-lg-8">
                    <div className="d-flex align-items-center gap-1 pb-1 pb-lg-2">
                      <img
                        src="images/icon/city.svg"
                        width={24}
                        height={24}
                        alt="城市圖片"
                      />
                      <span className="fs-10 fs-lg-9">出發城市：</span>
                    </div>
                    <h5 className="text-primary-500 fs-lg-7">
                      {product.departureCity}
                    </h5>
                  </div>
                  <div className="pb-4 pb-lg-8">
                    <div className="d-flex align-items-center gap-1 pb-1 pb-lg-2">
                      <img
                        src="images/icon/People.svg"
                        width={24}
                        height={24}
                        alt="成團圖片"
                      />
                      <span className="fs-10 fs-lg-9">成團人數：</span>
                    </div>
                    <h5 className="text-primary-500 fs-lg-7">
                      {product.leastPeopleNum}人
                    </h5>
                  </div>
                  <div className="pb-4  pb-lg-8">
                    <div className="d-flex align-items-center gap-1 pb-1 pb-lg-2">
                      <img
                        src="images/icon/food.svg"
                        width={24}
                        height={24}
                        alt="餐食圖片"
                      />
                      <span className="fs-10 fs-lg-9">餐食：</span>
                    </div>
                    <h5 className="text-primary-500 fs-lg-7">自理</h5>
                  </div>
                  <div className="row pb-lg-12">
                    <div className="col-lg-6">
                      <div className="d-flex flex-column pb-4 pb-lg-0">
                        <div className="d-flex align-items-center gap-1 pb-2 pb-lg-3">
                          <img
                            src="images/icon/price.svg"
                            width={24}
                            height={24}
                            alt="金錢圖片"
                          />
                          <span className="fs-10 fs-lg-9">價格/人數：</span>
                        </div>
                        <div className="quantity-wrapper">
                          <button
                            type="button"
                            className="quantity-btn minus"
                            onClick={handleDecrease}
                            disabled={quantity <= 1}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19"
                                stroke="#ffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span className="quantity">{quantity}</span>
                          <button
                            type="button"
                            className="quantity-btn plus"
                            disabled={quantity >= 10}
                            onClick={handleIncrease}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 5V19"
                                stroke="#1B67AE"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 12H19"
                                stroke="#1B67AE"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="pb-4 pb-lg-0">
                        <p className="text-neutral-200 text-decoration-line-through pb-1 pb-lg-2 fs-10 fs-lg-9">
                          原價 NT${" "}
                          {(product.origin_price * quantity).toLocaleString()}
                        </p>
                        <div className="d-flex justify-content-between flex-lg-column align-items-center align-items-lg-start">
                          <p className="text-neutral-300 fs-10 fs-lg-9">
                            優惠價
                          </p>
                          <h4 className="text-primary-500">
                            NT$ {(product.price * quantity).toLocaleString()}/人
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-6 justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary-200 w-100 py-lg-3 px-0"
                      onClick={handleBuyNow}
                    >
                      直接購買
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary-200 custom-btn-outline-secondary-200 w-100 py-lg-3 px-0"
                      onClick={() => {
                        addCartItem(id, quantity);
                      }}
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-info pt-12 pt-lg-14 pb-8 pb-lg-15">
            {/* 行程特色 */}
            <section className="pb-8 pb-lg-15">
              <div
                className="pb-4"
                style={{ borderBottom: "1px solid #C2DCF5" }}
              >
                <h3 className="title-family fs-lg-5">行程特色</h3>
              </div>
              <div className="pt-4 d-flex flex-column gap-6">
                {product.contents.map((item, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <h5 className="text-primary-600 pb-2 fs-lg-7">
                          {item.title}
                        </h5>
                        <p className="neutral-300">
                          {item.content.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <section
              className="bg-primary-50 py-4 py-lg-10"
              style={{ border: "1px solid #1B67AE", borderRadius: "24px" }}
            >
              <div className="px-3 px-lg-8 pb-lg-12">
                <h3 className="title-family pt-4 pt-lg-0 fs-lg-5">注意事項</h3>
                <ul className="pt-3 pt-lg-6 pb-4 pb-lg-0 ps-5 m-0">
                  <li className="fs-10 fs-lg-9">
                    請確認您的護照有效期限至少為六個月
                  </li>
                  <li className="fs-10 fs-lg-9">
                    請提前查詢目的地的天氣狀況，並攜帶適合當地氣候的衣物和配件（如雨具或防寒衣物）。
                  </li>
                  <li className="fs-10 fs-lg-9">
                    攜帶常用藥品、處方藥以及基本急救用品，特別是針對可能的水土不服或長途旅行的不適。
                  </li>
                  <li className="fs-10 fs-lg-9">
                    建議購買涵蓋醫療、行李遺失、意外等內容的旅行保險，以應對突發狀況。
                  </li>
                  <li className="fs-10 fs-lg-9">
                    了解並尊重目的地的文化習俗、宗教禁忌與法律規範，避免不必要的麻煩。
                  </li>
                  <li className="fs-10 fs-lg-9">
                    請攜帶護照影本、行程單、酒店預訂確認書及緊急聯絡電話等文件，以備不時之需。
                  </li>
                  <li className="fs-10 fs-lg-9">
                    確保手機隨時能聯絡，並記錄當地緊急聯絡號碼和領事館資訊。
                  </li>
                  <li className="fs-10 fs-lg-9">
                    請準時參與行程安排的活動，避免影響您的權益。
                  </li>
                </ul>
              </div>
              <div className="px-3 px-lg-8">
                <h3 className="title-family pt-4 pt-lg-0 fs-lg-5">取消政策</h3>
                <ul className="pt-3 pb-4 pt-lg-6 pb-lg-0 ps-5 m-0">
                  <li className="fs-10 fs-lg-9">
                    於所選日期41天（含）之前取消，收取手續費5％
                  </li>
                  <li className="fs-10 fs-lg-9">
                    於所選日期31天～40天之間取消，收取手續費10％
                  </li>
                  <li className="fs-10 fs-lg-9">
                    於所選日期21天～30天之間取消，收取手續費20％
                  </li>
                  <li className="fs-10 fs-lg-9">
                    於所選日期2天～20天之間取消，收取手續費30％
                  </li>
                  <li className="fs-10 fs-lg-9">
                    於所選日期24小時（含）之前取消，收取手續費50％
                  </li>
                  <li className="fs-10 fs-lg-9">
                    所選日期當天不可取消、更改訂單，亦不得請求退款
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div className="product-card pb-8 pb-lg-14">
            <h3 className="title-family fs-lg-5 py-4 pb-lg-8">
              您可能會喜歡⋯⋯
            </h3>
            {isLargeScreen ? (
              // 🟢 992px 以上，使用 Swiper 滑動
              <Swiper
                loop={true}
                spaceBetween={24}
                slidesPerView={"auto"} // 🔹 讓 Swiper 按照 CSS 設定寬度
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
              >
                {randomProducts.map((filterProduct) => (
                  <SwiperSlide
                    key={filterProduct.id}
                    style={{ width: "636px" }}
                  >
                    <Link
                      to={`/travelSpots/${filterProduct.id}`}
                      style={{ height: "100%" }}
                    >
                      <div
                        className="px-lg-4 d-lg-flex flex-lg-column"
                        style={{ height: "525px" }}
                      >
                        <div className="productListImgWrap overflow-hidden position-relative">
                          <img
                            className="productListImg"
                            src={filterProduct.imageUrl}
                            alt={filterProduct.title}
                          />
                          <div className="px-lg-3 py-lg-1 d-lg-flex position-absolute bottom-0 end-0 bg-primary-500">
                            <img
                              src="images/icon/calendar-white.svg"
                              alt="行程圖片"
                              style={{
                                marginRight: "10px",
                                width: "24px",
                                height: "24px",
                              }}
                            />
                            <p className="text-white">
                              {filterProduct.travelDate}
                            </p>
                          </div>
                        </div>
                        <div className="pt-4 pb-2">
                          <h3
                            className="title-family travelSpotCardTitle text-neutral-black"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {filterProduct.title}
                          </h3>
                        </div>
                        <div className="pb-2">
                          {filterProduct.description
                            .split("\n")
                            .map((des, index) => (
                              <p
                                key={index}
                                className={`${index === 0 ? "mb-sm-0 mb-2" : ""
                                  } text-neutral-300 travelSpotCardDescription`}
                              >
                                {des}
                              </p>
                            ))}
                        </div>
                        <div className="mt-auto">
                          <p
                            style={{ fontSize: "14px" }}
                            className="text-decoration-line-through text-neutral-200"
                          >
                            原價 NT{" "}
                            {filterProduct.origin_price.toLocaleString()}
                          </p>
                          <p
                            style={{ lineHeight: "1.2" }}
                            className="text-secondary-200 travelSpotCardDiscountPrice fw-bold"
                          >
                            優惠價 NT {filterProduct.price.toLocaleString()}/
                            {filterProduct.unit}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              // 🟠 992px 以下，維持 flex-column 排列
              <div className="d-flex flex-column gap-8">
                {randomProducts.map((filterProduct) => (
                  <div key={filterProduct.id}>
                    <Link
                      to={`/travelSpots/${filterProduct.id}`}
                      style={{ height: "100%" }}
                    >
                      <div className="d-flex flex-column">
                        <div className="productListImgWrap overflow-hidden position-relative">
                          <img
                            className="productListImg"
                            src={filterProduct.imageUrl}
                            alt={filterProduct.title}
                          />
                          <DepartureTimeDecoration
                            featuredItem={filterProduct}
                          />
                        </div>
                        <div className="mt-4 mb-2">
                          <h3
                            className="title-family travelSpotCardTitle text-neutral-black"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {filterProduct.title}
                          </h3>
                        </div>
                        <div className="mb-3">
                          {filterProduct.description
                            .split("\n")
                            .map((des, index) => (
                              <p
                                key={index}
                                className={`${index === 0 ? "mb-sm-0 mb-2" : ""
                                  } text-neutral-300 travelSpotCardDescription`}
                              >
                                {des}
                              </p>
                            ))}
                        </div>
                        <div className="mt-auto">
                          <p
                            style={{ fontSize: "14px" }}
                            className="text-decoration-line-through text-neutral-200"
                          >
                            原價 NT{" "}
                            {filterProduct.origin_price.toLocaleString()}
                          </p>
                          <p
                            style={{ lineHeight: "1.2" }}
                            className="text-secondary-200 travelSpotCardDiscountPrice fw-bold"
                          >
                            優惠價 NT {filterProduct.price.toLocaleString()}/
                            {filterProduct.unit}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TravelSpotsItem;
