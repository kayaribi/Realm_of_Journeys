import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const TravelSpotsItem = () => {
    const { id } = useParams(); // 取得網址中的產品 ID
    const [product, setProduct] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [quantity, setQuantity] = useState(1); // 預設數量為 1

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    useEffect(() => {
        const fetchSpot = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);
                if (response.data.success) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.error("請求失敗", error);
            }
        };

        fetchSpot();

    }, [id]);

    if (!product) return <p>載入中...</p>;

    return (
        <div className="container product mt-16">
            <div className="py-6">
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    thumbs={{ swiper: thumbsSwiper }}
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
                    {product.imagesUrl.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
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
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={product.imageUrl} />
                    </SwiperSlide>
                    {product.imagesUrl.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div>
                <div className="pb-2" style={{ borderBottom: "1px solid #C2DCF5" }}>
                    <h3 className="title-family">{product.title}</h3>
                </div>
                <div className="pt-2">
                    <div className="pb-4">
                        <div className="d-flex align-items-center pb-2">
                            <img src="/images/icon/calendar.svg" width={24} height={24} alt="行程圖片" />
                            <span className="fs-10">出發日期:</span>
                        </div>
                        <h5 className="text-primary-500">2025/{product.travelDate}</h5>
                    </div>
                    <div className="pb-4">
                        <div className="d-flex align-items-center pb-2">
                            <img src="/images/icon/city.svg" width={24} height={24} alt="城市圖片" />
                            <span className="fs-10">出發城市：</span>
                        </div>
                        <h5 className="text-primary-500">{product.departureCity}</h5>
                    </div>
                    <div className="pb-4">
                        <div className="d-flex align-items-center pb-2">
                            <img src="/images/icon/People.svg" width={24} height={24} alt="成團圖片" />
                            <span className="fs-10">成團人數：</span>
                        </div>
                        <h5 className="text-primary-500">{product.leastPeopleNum}</h5>
                    </div>
                    <div className="pb-4">
                        <div className="d-flex align-items-center gap-1 pb-2">
                            <img src="/images/icon/food.svg" width={24} height={24} alt="餐食圖片" />
                            <span className="fs-10">餐食：</span>
                        </div>
                        <h5 className="text-primary-500">自理</h5>
                    </div>
                    <div className="d-flex flex-column pb-4">
                        <div className="d-flex align-items-center gap-1 pb-2">
                            <img src="/images/icon/price.svg" width={24} height={24} alt="金錢圖片" />
                            <span className="fs-10">價格/人數：</span>
                        </div>
                        <div className="quantity-wrapper">
                            <button type="button"
                                className="quantity-btn minus"
                                onClick={handleDecrease}
                                disabled={quantity <= 1}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19" stroke="#ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <span className="quantity">{quantity}</span>
                            <button type="button" className="quantity-btn plus" onClick={handleIncrease}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19" stroke="#1B67AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 12H19" stroke="#1B67AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="pb-4">
                        <p className="text-neutral-200 text-decoration-line-through pb-1 fs-10">原價 NT {(product.origin_price * quantity).toLocaleString()}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="text-neutral-300 fs-10">優惠價</p>
                            <h4 className="text-primary-500">NT {(product.price * quantity).toLocaleString()}/人</h4>
                        </div>
                    </div>
                    <div className="d-flex gap-6 justify-content-between pb-6">
                        <button type="button" className="btn btn-secondary-200 custom-btn-secondary-200 w-100">直接購買</button>
                        <button type="button" className="btn btn-outline-secondary-200 custom-btn-outline-secondary-200 w-100">加入購物車</button>
                    </div>
                </div>
            </div>

            {/* <img src={product.imageUrl} alt={product.title} width="300" />
            <p>價格: {product.price} 元</p>
            <p>描述: {product.description}</p> */}
        </div>
    );
};

export default TravelSpotsItem;
