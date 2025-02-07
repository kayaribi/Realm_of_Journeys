import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DepartureTimeDecoration from "../components/DepartureTimeDecoration";
import productPageBanner from "../../public/images/icon/productPageBanner.svg";
import productPageBanner2 from "../../public/images/icon/productPageBanner2.svg";
import productPageBanner3 from "../../public/images/icon/productPageBanner3.svg";
import productPageBanner4 from "../../public/images/icon/productPageBanner4.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function TravelSpots() {
  const [productList, setProductList] = useState([]);
  const [bannerChange, setBannerChange] = useState(productPageBanner);

  const signIn = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, {
        username: "RealmOfJourneys@gmail.com",
        password: "RealmOfJourneys",
      });

      const { token, expired } = res.data;

      // document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

      axios.defaults.headers.common["Authorization"] = token;

      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    signIn();
  }, []);

  const handleBannerBG = (e) => {
    e.preventDefault();
    if (e.target.textContent === "全部") {
      setBannerChange(productPageBanner);
    } else if (e.target.textContent === "亞洲") {
      setBannerChange(productPageBanner2);
    } else if (e.target.textContent === "歐洲") {
      setBannerChange(productPageBanner3);
    } else if (e.target.textContent === "中東") {
      setBannerChange(productPageBanner4);
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products`
      );
      const { products } = res.data;
      setProductList(products);

      // console.log(
      //   products.map((item) => {
      //     return item.category;
      //   })
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div>
        <img
          className=""
          style={{ width: "100%" }}
          src={productPageBanner}
          alt=""
        />
      </div> */}
      {/* banner */}
      <div
        className="travelSpotsBanner"
        style={{
          backgroundImage: `url(${bannerChange})`,
        }}
      >
        <div className="travelSpotsBannerBackDrop"></div>
        <h2 className="title-family  text-white travelSpotsBannerText">
          精選旅遊行程，開啟你的夢想旅途
        </h2>
      </div>

      <section>
        <div className="container position-relative ">
          {/* 切換國家地區 */}
          <div className="row travelSpotsSelectWrapPosition">
            <div className="col-lg-8 col-md-10  mx-auto ">
              <ul className="list-unstyled mb-0 travelSpotsSelectWrap p-1">
                <li className="travelSpotsSelectbuttonWrap  ">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton bg-primary-500 text-nowrap py-xl-4 py-md-3 py-2 "
                    href=""
                    onClick={handleBannerBG}
                  >
                    全部
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                    onClick={handleBannerBG}
                  >
                    亞洲
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                    onClick={handleBannerBG}
                  >
                    歐洲
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                    onClick={handleBannerBG}
                  >
                    中東
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* 產品列表 */}
          <div className="row row-cols-sm-2 row-cols-1 productListTranslate">
            {productList.map((product) => {
              return (
                <div key={product.id} className={`col`}>
                  <a style={{ display: "block", height: "100%" }} href="">
                    <div className="d-flex flex-column px-xl-6 px-lg-4 px-md-2 px-0 h-100">
                      {/* 上方圖片區域 */}
                      <div className="productListImgWrap overflow-hidden position-relative">
                        <img
                          className="productListImg"
                          src={product.imageUrl}
                          alt={product.title}
                        />
                        <DepartureTimeDecoration featuredItem={product} />
                      </div>
                      {/* 下方文字區域 */}
                      <div className="mt-4 mb-2">
                        <h3
                          className="title-family travelSpotCardTitle text-neutral-black"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {product.title}
                        </h3>
                      </div>
                      <div className="mb-3">
                        {product.description.split("\n").map((des, index) => {
                          return (
                            <p
                              key={index}
                              className={`${
                                index === 0 ? "mb-sm-0 mb-2" : ""
                              } text-neutral-300 travelSpotCardDescription`}
                            >
                              {des}
                            </p>
                          );
                        })}
                      </div>
                      <div className="mt-auto">
                        <p
                          style={{ fontSize: "14px" }}
                          className="text-decoration-line-through text-neutral-200"
                        >
                          原價 NT {product.origin_price.toLocaleString()}
                        </p>
                        <p
                          style={{ lineHeight: "1.2" }}
                          className="text-secondary-200 travelSpotCardDiscountPrice fw-bold"
                        >
                          優惠價 NT {product.price.toLocaleString()}/
                          {product.unit}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          {/* 分頁元件 */}
          <div className="row my-15">
            <div className="col">
              <ul className="list-unstyled mb-0 d-flex align-items-center">
                <li className="leftArrow"></li>
                <li
                  className="bg-primary-100 text-primary-500 fw-bold"
                  style={{
                    padding: "4px 10px",
                    fontSize: "20px",
                    lineHeight: "1.2",
                    borderRadius: "100px",
                    cursor: "pointer",
                  }}
                >
                  1
                </li>
                <li
                  className="bg-primary-100 text-primary-500 fw-bold"
                  style={{
                    padding: "4px 10px",
                    fontSize: "20px",
                    lineHeight: "1.2",
                    borderRadius: "100px",
                    cursor: "pointer",
                    margin: "0px 32px",
                  }}
                >
                  2
                </li>
                <li
                  className="bg-primary-100 text-primary-500 fw-bold"
                  style={{
                    padding: "4px 10px",
                    fontSize: "20px",
                    lineHeight: "1.2",
                    borderRadius: "100px",
                    cursor: "pointer",
                  }}
                >
                  3
                </li>
                <li className="rightArrow"></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
