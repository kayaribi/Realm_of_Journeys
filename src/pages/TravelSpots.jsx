import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DepartureTimeDecoration from "../components/DepartureTimeDecoration";
import productPageBanner from "../../public/images/icon/productPageBanner.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function TravelSpots() {
  const [productList, setProductList] = useState([]);

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

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products`
      );
      const { products } = res.data;
      setProductList(products);
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
          backgroundImage: `url(${productPageBanner})`,
        }}
      >
        <div className="travelSpotsBannerBackDrop"></div>
        <h2 className="notoSerifTC  text-white travelSpotsBannerText">
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
                  >
                    全部
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                  >
                    亞洲
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                  >
                    歐洲
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                  >
                    中東
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* 產品列表 */}
          <div className="row row-cols-sm-2 row-cols-1 productListTranslate">
            {productList.map((product, index) => {
              return (
                <div
                  key={product.id}
                  className={`col ${
                    index === 0 || index === 1 ? "mt-0" : "mt-8"
                  }`}
                >
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
                          className="notoSerifTC travelSpotCardTitle text-neutral-black"
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
        </div>
      </section>
    </>
  );
}
