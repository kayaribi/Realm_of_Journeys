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
  const [pagination, setPagination] = useState({});
  const [bannerChange, setBannerChange] = useState(productPageBanner);
  // (Api沒提供，所以自己撰寫) 篩選用資料
  const [selected, setSelected] = useState("全部");
  const [initialAllProducts, setInitialAllProducts] = useState({}); // 儲存最初的50筆物件資料
  const [filteredProductData, setFilteredProductData] = useState([]); // 儲存篩選後的陣列資料
  const [isFilterProducts, setIsFilterProducts] = useState(false);
  const [cusCurrentPage, setCusCurrentPage] = useState(1);
  const [cusTotalPages, setCusTotalPages] = useState(1);
  const [cusHasPre, setCusHasPre] = useState(false);
  const [cusHasNext, setCusHasNext] = useState(true);
  const itemsPerPage = 10;

  // (Api沒提供，所以自己撰寫) 計算篩選後的當前頁面要顯示的資料
  const paginatedData = filteredProductData.slice(
    (cusCurrentPage - 1) * itemsPerPage,
    cusCurrentPage * itemsPerPage
  );

  // (Api沒提供，所以自己撰寫) 若總頁數為 1 時，上一頁、下一頁皆不能點選
  useEffect(() => {
    if (cusTotalPages === 1) {
      setCusHasPre(false);
      setCusHasNext(false);
    } else {
      setCusHasPre(false);
      setCusHasNext(true);
    }
  }, [cusTotalPages]);

  // (Api沒提供，所以自己撰寫) 變更點擊頁碼後的相關效果 (是否可點擊上一頁、下一頁)
  const handleCusPageChange = (page) => {
    if (page >= 1 && page <= cusTotalPages) {
      setCusCurrentPage(page);
    }

    if (cusTotalPages === 1) {
      return;
    }

    if (page === 1) {
      setCusHasPre(false);
      setCusHasNext(true);
    } else if (page > 1 && page < cusTotalPages) {
      setCusHasPre(true);
      setCusHasNext(true);
    } else if (page === cusTotalPages) {
      setCusHasPre(true);
      setCusHasNext(false);
    }
  };

  // (Api沒提供，所以自己撰寫) 備份初始資料功能
  const copyInitialAllProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products/all`
      );

      if (Object.keys(initialAllProducts).length === 0) {
        setInitialAllProducts(res.data.products);
      }
    } catch (error) {
      console.error(error); // 處理錯誤
    }
  };

  // (Api沒提供，所以自己撰寫) 初始資料備份完成時執行
  useEffect(() => {
    if (Object.keys(initialAllProducts).length !== 0) {
      // 50筆原始物件資料轉陣列
      setFilteredProductData(Object.values(initialAllProducts));
    }
  }, [initialAllProducts]);

  // (Api沒提供，所以自己撰寫) 篩選資料、變更 banner 圖片、重置分頁相關參數
  const handleFilterProducts = async (e, category) => {
    e.preventDefault();
    setSelected(category);

    if (category === "全部") {
      setBannerChange(productPageBanner);
      await getProduct();
      setIsFilterProducts(false);
      return;
    }

    setIsFilterProducts(true);
    let filteredProductsList = [];

    if (category === "亞洲") {
      setBannerChange(productPageBanner2);

      filteredProductsList = Object.values(initialAllProducts).filter((item) =>
        item.category.includes("亞洲")
      );
    } else if (category === "歐洲") {
      setBannerChange(productPageBanner3);

      filteredProductsList = Object.values(initialAllProducts).filter((item) =>
        item.category.includes("歐洲")
      );
    } else if (category === "中東") {
      setBannerChange(productPageBanner4);

      filteredProductsList = Object.values(initialAllProducts).filter((item) =>
        item.category.includes("中東")
      );
    }

    setCusCurrentPage(1);
    setCusHasPre(false);
    setCusHasNext(true);
    setFilteredProductData(filteredProductsList);
  };

  // (Api沒提供，所以自己撰寫) 根據篩選出來的資料設定總頁數
  useEffect(() => {
    setCusTotalPages(Math.ceil(filteredProductData.length / itemsPerPage));
  }, [filteredProductData]);

  // 登入功能
  const signIn = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, {
        username: "RealmOfJourneys@gmail.com",
        password: "RealmOfJourneys",
      });

      const { token, expired } = res.data;
      // document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;

      copyInitialAllProducts();
      getProduct();
      // getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  // 執行登入以及備份初始資料
  useEffect(() => {
    signIn();
  }, []);

  // 取得產品資料
  const getProduct = async (page = 1) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      const { products, pagination } = res.data;

      setProductList(products);
      setPagination(pagination);
    } catch (error) {
      console.log(error);
    }
  };

  // const [firstHalf, setFirstHalf] = useState(1);
  // const [secondHalf, setSecondHalf] = useState("");

  // let firstHalf = 1;
  // let secondHalf = 5;
  // let half = 3;

  // const filterProducts = async (page, filteredProductsList) => {
  //   const startIdx = (page - 1) * 10;
  //   const endIdx = page * 10;
  //   const filteredProducts = filteredProductsList.slice(startIdx, endIdx);

  //   // setProductList(filteredProducts);

  //   //  根據篩選後的數量，手動更新 pagination
  //   // setPagination({
  //   //   total_pages: Math.ceil(filteredProductsList.length / 10), // 每頁 10 筆
  //   //   current_page: 1, // 預設從第 1 頁開始
  //   //   has_pre: page > 1,
  //   //   has_next: page < Math.ceil(filteredProductsList.length / 10),
  //   //   category: "",
  //   // });

  //   // console.log(page, filteredProducts);
  // };

  // useEffect(() => {
  //   if (pagination.total_pages) {
  //     setSecondHalf(pagination.total_pages);
  //   }

  //   // console.log(firstHalf, secondHalf);
  // }, [pagination]);

  // useEffect(() => {
  //   if (secondHalf) {
  //     console.log(secondHalf);
  //   }

  //   // console.log(firstHalf, secondHalf);
  // }, [secondHalf]);

  // const handlePaginationProduct = async () => {
  //   const res = await axios.get(
  //     `${BASE_URL}/v2/api/${API_PATH}/admin/products`
  //   );

  //   const { total_pages } = res.data.pagination;

  //   // 點擊分頁標籤後 根據 index去執行相對應的　api pages

  //   console.log(res);
  //   console.log(total_pages);
  //   console.log(
  //     productList.map((item) => {
  //       return item.title;
  //     })
  //   );
  // };

  // handlePaginationProduct();

  // if (
  //   pagination.current_page === firstHalf ||
  //   pagination.current_page === secondHalf
  // ) {
  //   // return 陣列長度為3的 firstHalf 以及 ... 以及 secondHalf 的頁碼li
  // } else if (
  //   pagination.current_page > firstHalf &&
  //   pagination.current_page < half
  // ) {
  //   if (secondHalf - pagination.current_page >= 3) {
  //     //  return 陣列長度為4 且為 firstHalf 到 current_page 的所有li 以及 ... 和 secondHalf 的頁碼li
  //   }
  // } else if (pagination.current_page === half) {
  //   //  return 陣列長度為5的所有li
  // } else if (
  //   pagination.current_page > half &&
  //   pagination.current_page < secondHalf
  // ) {
  //   if (pagination.current_page - firstHalf >= 3) {
  //     //  return 陣列長度為4 且為 firstHalf的頁碼li 以及 ... 和 current_page 到 secondHalf 的所有li
  //   }
  // }

  return (
    <>
      {/* banner */}
      <div
        className="travelSpotsBanner"
        style={{
          backgroundImage: `url(${bannerChange})`,
        }} id="header"
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
                    className={`text-white fw-bold  travelSpotsSelectbutton ${
                      selected === "全部" ? "bg-primary-500" : ""
                    } text-nowrap py-xl-4 py-md-3 py-2`}
                    href=""
                    onClick={(e) => {
                      handleFilterProducts(e, "全部");
                    }}
                  >
                    全部
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className={`text-white fw-bold ${
                      selected === "亞洲" ? "bg-primary-500" : ""
                    } travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2`}
                    href=""
                    onClick={(e) => {
                      handleFilterProducts(e, "亞洲");
                    }}
                  >
                    亞洲
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className={`text-white fw-bold ${
                      selected === "歐洲" ? "bg-primary-500" : ""
                    } travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2`}
                    href=""
                    onClick={(e) => {
                      handleFilterProducts(e, "歐洲");
                    }}
                  >
                    歐洲
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className={`text-white fw-bold ${
                      selected === "中東" ? "bg-primary-500" : ""
                    } travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2`}
                    href=""
                    onClick={(e) => {
                      handleFilterProducts(e, "中東");
                    }}
                  >
                    中東
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* 產品列表 */}
          <div className="row row-cols-sm-2 row-cols-1 productListTranslate">
            {isFilterProducts ? (
              <>
                {/* (Api沒提供，所以自己撰寫) 篩選後的資料渲染畫面 */}
                {paginatedData.map((filterProduct) => {
                  return (
                    <div key={filterProduct.id} className={`col`}>
                      <a style={{ display: "block", height: "100%" }} href="">
                        <div className="d-flex flex-column px-xl-6 px-lg-4 px-md-2 px-0 h-100">
                          {/* 上方圖片區域 */}
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
                          {/* 下方文字區域 */}
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
                              .map((des, index) => {
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
                      </a>
                    </div>
                  );
                })}
              </>
            ) : (
              // 原始 Api 的資料渲染畫面
              productList.map((product) => {
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
              })
            )}
          </div>
          {/* 分頁元件 */}
          <div className="row my-15">
            <div className="col">
              <div className="d-flex justify-content-center">
                <ul className="list-unstyled mb-0 d-flex align-items-center">
                  {isFilterProducts ? (
                    <>
                      {/* (Api沒提供，所以自己撰寫) 篩選後的分頁功能 */}
                      <li>
                        <a
                          className={`leftArrow ${
                            cusHasPre ? "" : "disabled"
                          }  `}
                          onClick={(e) => {
                            e.preventDefault();
                            handleCusPageChange(cusCurrentPage - 1);
                          }}
                        ></a>
                      </li>
                      {[...new Array(cusTotalPages)].map((_, index) => {
                        return (
                          <li
                            className={`${
                              index === 0 ? "" : "paginationNumbersMargin"
                            }`}
                            key={`${index}_page`}
                          >
                            <a
                              className={`fw-bold paginationNumbers ${
                                index + 1 === cusCurrentPage
                                  ? "paginationActive"
                                  : ""
                              }`}
                              style={{
                                padding: "4px 10px",
                                fontSize: "20px",
                                lineHeight: "1.2",
                                borderRadius: "100px",
                                cursor: "pointer",
                                display: "block",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleCusPageChange(index + 1);
                              }}
                              href=""
                            >
                              {index + 1}
                            </a>
                          </li>
                        );
                      })}
                      <li>
                        <a
                          className={`rightArrow ${
                            cusHasNext ? "" : "disabled"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleCusPageChange(cusCurrentPage + 1);
                          }}
                        ></a>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* 原始 Api 提供的分頁功能 */}
                      <li>
                        <a
                          className={`leftArrow ${
                            pagination.has_pre ? "" : "disabled"
                          }  `}
                          onClick={(e) => {
                            e.preventDefault();
                            getProduct(pagination.current_page - 1);
                          }}
                        ></a>
                      </li>
                      {[...new Array(pagination.total_pages)].map(
                        (_, index) => {
                          return (
                            <li
                              className={`${
                                index === 0 ? "" : "paginationNumbersMargin"
                              }`}
                              key={`${index}_page`}
                            >
                              <a
                                className={`fw-bold paginationNumbers ${
                                  index + 1 === pagination.current_page
                                    ? "paginationActive"
                                    : ""
                                }`}
                                style={{
                                  padding: "4px 10px",
                                  fontSize: "20px",
                                  lineHeight: "1.2",
                                  borderRadius: "100px",
                                  cursor: "pointer",
                                  display: "block",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  getProduct(index + 1);
                                }}
                                href=""
                              >
                                {index + 1}
                              </a>
                            </li>
                          );
                        }
                      )}
                      <li>
                        <a
                          className={`rightArrow ${
                            pagination.has_next ? "" : "disabled"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            getProduct(pagination.current_page + 1);
                          }}
                        ></a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
