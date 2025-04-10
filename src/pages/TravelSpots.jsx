import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import DepartureTimeDecoration from "../components/DepartureTimeDecoration";
import productPageBanner from "../../public/images/icon/productPageBanner.svg";
import productPageBanner2 from "../../public/images/icon/productPageBanner2.png";
import productPageBanner3 from "../../public/images/icon/productPageBanner3.png";
import productPageBanner4 from "../../public/images/icon/productPageBanner4.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function TravelSpots() {
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [bannerChange, setBannerChange] = useState(productPageBanner);
  const [selected, setSelected] = useState("");
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isDotPagination, setIsDotPagination] = useState(true);
  const [dotPaginationDirection, setDotPaginationDirection] = useState("rightDotStyleMargin");
  const initialWindowWidthRef = useRef(window.innerWidth <= 575);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth <= 575);
  const isScrollLoadingRef = useRef(false);
  const initialSwitchRef = useRef(false);
  const listRef = useRef(null);
  const [isSignIn, setIsSignIn] = useState(false);
  const paginationCurrentPageRef = useRef(null);
  const paginationTotalPageRef = useRef(null);
  const categoryRef = useRef("");

  const selectBarRef = useRef(null);
  const waitSelectHeight = useRef(false);
  const initialWaitRef = useRef(false);

  useEffect(() => {
    if (windowWidth) {
      paginationCurrentPageRef.current = pagination.current_page;
      paginationTotalPageRef.current = pagination.total_pages;
    }
  }, [pagination, windowWidth]);

  const handleDotStylePagination = useCallback((currentPage) => {
    if (currentPage < 3) {
      setIsDotPagination(true);
      setDotPaginationDirection("rightDotStyleMargin");
    } else if (currentPage === 3) {
      setIsDotPagination(false);
    } else if (currentPage > 3) {
      setIsDotPagination(true);
      setDotPaginationDirection("leftDotStyleMargin");
    }
  }, []);

  const getProduct = useCallback(async (page = 1, category = "") => {
    setIsScreenLoading(true);
    try {
      setTimeout(() => {
        initialWaitRef.current = true;
      }, 5000);

      isScrollLoadingRef.current = true;
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products?page=${page}&category=${category}`
      );
      const { products, pagination } = res.data;
      setPagination(pagination);
      handleDotStylePagination(page);
      initialSwitchRef.current = true;

      if (windowWidth) {
        setProductList((prev) => [...prev, ...products]);
      } else {
        setProductList(products);
      }

      setTimeout(() => {
        isScrollLoadingRef.current = false;
        if (paginationCurrentPageRef.current === paginationTotalPageRef.current) {
          waitSelectHeight.current = true;
        }
      }, 1000);
      setIsScreenLoading(false);
    } catch {
      alert("資料抓取失敗");
    }
  }, [windowWidth, handleDotStylePagination]);

  const handleScroll = useCallback(() => {
    const height = listRef.current.offsetHeight + listRef.current.offsetTop - 715;
    const currentTop = parseInt(selectBarRef.current.style.top, 10) || 0;

    if (paginationCurrentPageRef.current === paginationTotalPageRef.current) {
      if (waitSelectHeight.current && window.scrollY >= height + 100) {
        selectBarRef.current.style.position = "absolute";
        selectBarRef.current.style.top = `${height + 695}px`;
        selectBarRef.current.style.bottom = "auto";
      }

      if (currentTop === height + 695 && window.scrollY <= height + 100) {
        selectBarRef.current.style.position = "fixed";
        selectBarRef.current.style.top = "auto";
        selectBarRef.current.style.bottom = "32px";
      }
    }

    if (
      !isScrollLoadingRef.current &&
      window.scrollY >= height &&
      paginationCurrentPageRef.current < paginationTotalPageRef.current
    ) {
      paginationCurrentPageRef.current += 1;
      getProduct(paginationCurrentPageRef.current, categoryRef.current);
    }
  }, [getProduct]);

  useEffect(() => {
    const debounceScroll = debounce(handleScroll, 0);

    if (initialSwitchRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (windowWidth) {
        window.addEventListener("scroll", debounceScroll);
        setProductList([]);
        getProduct(1, categoryRef.current);
        selectBarRef.current.style.position = "fixed";
        selectBarRef.current.style.top = "auto";
        selectBarRef.current.style.bottom = "32px";
      } else {
        window.removeEventListener("scroll", debounceScroll);
        setProductList([]);
        getProduct(1, categoryRef.current);
        selectBarRef.current.style.position = "absolute";
        selectBarRef.current.style.top = "auto";
        selectBarRef.current.style.bottom = "auto";
      }
    } else {
      if (initialWindowWidthRef.current) {
        window.addEventListener("scroll", debounceScroll);
      }
    }

    return () => {
      window.removeEventListener("scroll", debounceScroll);
    };
  }, [windowWidth, getProduct, handleScroll]);

  const handleFilterProducts = async (e, category) => {
    e.preventDefault();

    waitSelectHeight.current = false;
    setSelected(category);
    categoryRef.current = category;

    if (category === "") {
      setBannerChange(productPageBanner);
    } else if (category === "亞洲") {
      setBannerChange(productPageBanner2);
    } else if (category === "歐洲") {
      setBannerChange(productPageBanner3);
    } else if (category === "中東") {
      setBannerChange(productPageBanner4);
    }

    if (windowWidth) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (!e.target.className.includes("bg-primary-500")) {
        setProductList([]);
        getProduct(1, category);
      }
      selectBarRef.current.style.position = "fixed";
      selectBarRef.current.style.top = "auto";
      selectBarRef.current.style.bottom = "32px";
    } else {
      if (!e.target.className.includes("bg-primary-500")) {
        setProductList([]);
        getProduct(1, category);
      }
    }
  };

  const signIn = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, {
        username: "RealmOfJourneys@gmail.com",
        password: "RealmOfJourneys",
      });

      const { token } = res.data;
      axios.defaults.headers.common["Authorization"] = token;
      setIsSignIn(true);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    signIn();
  }, []);

  useEffect(() => {
    if (isSignIn) {
      getProduct();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSignIn, getProduct]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth <= 575);
    };

    const debounceResize = debounce(handleResize, 200);
    window.addEventListener("resize", debounceResize);

    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* banner */}
      <div
        className="travelSpotsBanner"
        style={{
          backgroundImage: `url(${bannerChange})`,
        }}
        id="header"
      >
        <div className="travelSpotsBannerBackDrop" ></div>
        <h2 className="title-family  text-white travelSpotsBannerText z-3">
          精選旅遊行程，開啟你的夢想旅途
        </h2>
      </div>

      <section>
        <div className="container position-relative ">
          {/* 切換國家地區 */}
          <div ref={selectBarRef} className="row travelSpotsSelectWrapPosition">
            <div className="col-lg-8 col-md-10  mx-auto ">
              <ul className="list-unstyled mb-0 travelSpotsSelectWrap p-1">
                <li className="travelSpotsSelectbuttonWrap  ">
                  <a
                    className={`filterTagRefs text-white fw-bold travelSpotsSelectbutton ${selected === "" ? "bg-primary-500" : ""
                      } text-nowrap py-xl-4 py-md-3 py-2`}
                    href=""
                    onClick={(e) => {
                      handleFilterProducts(e, "");
                    }}
                  >
                    全部
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className={`filterTagRefs text-white fw-bold ${selected === "亞洲" ? "bg-primary-500" : ""
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
                    className={`filterTagRefs text-white fw-bold ${selected === "歐洲" ? "bg-primary-500" : ""
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
                    className={`filterTagRefs text-white fw-bold ${selected === "中東" ? "bg-primary-500" : ""
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
          <div
            ref={listRef}
            className="row row-cols-sm-2 row-cols-1 productListTranslate"
          >
            {/*原始 Api 的資料渲染畫面*/}
            {productList.map((product) => {
              return (
                <div key={product.id} className={`col`}>
                  <Link
                    to={`/travelSpots/${product.id}`}
                    style={{ display: "block", height: "100%" }}
                  >
                    {/* <a style={{ display: "block", height: "100%" }} href=""> */}
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
                              className={`${index === 0 ? "mb-sm-0 mb-2" : ""
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
                  </Link>
                </div>
              );
            })}
          </div>
          {/* 分頁元件 */}
          <div className="row my-15 d-sm-block d-none">
            <div className="col">
              <div className="d-flex justify-content-center">
                <ul className="list-unstyled mb-0 d-flex align-items-center ">
                  {pagination.total_pages <= 3 ? (
                    <>
                      {/* 總頁數小於等於 3 */}
                      <li>
                        <a
                          className={`leftArrow ${pagination.has_pre ? "" : "disabled"
                            }  `}
                          onClick={(e) => {
                            e.preventDefault();
                            getProduct(pagination.current_page - 1, selected);
                            goToTop();
                          }}
                        ></a>
                      </li>
                      {[...new Array(pagination.total_pages)].map(
                        (_, index) => {
                          return (
                            <li
                              className={`cusDotStylePagination ${index === 0 ? "" : "paginationNumbersMargin"
                                } ${index + 1 === pagination.current_page
                                  ? "paginationActive"
                                  : ""
                                }`}
                              key={`${index}_page`}
                            >
                              <a
                                className={`fw-bold paginationNumbers paginationStyle`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  getProduct(index + 1, selected);
                                  goToTop();
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
                          className={`rightArrow ${pagination.has_next ? "" : "disabled"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            getProduct(pagination.current_page + 1, selected);
                            goToTop();
                          }}
                        ></a>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* 總頁數大於 3 */}
                      <li>
                        <a
                          className={`leftArrow ${pagination.has_pre ? "" : "disabled"
                            }  `}
                          onClick={(e) => {
                            e.preventDefault();
                            getProduct(pagination.current_page - 1, selected);
                            goToTop();
                          }}
                        ></a>
                      </li>
                      {[...new Array(pagination.total_pages)].map(
                        (_, index) => {
                          return (
                            <li
                              className={`cusDotStylePagination ${index === 0 ? "" : "paginationNumbersMargin"
                                } 

                              ${isDotPagination &&
                                index !== 0 &&
                                index !== pagination.total_pages - 1 &&
                                "dotDisplayNone"
                                } 
                              
                             ${isDotPagination &&
                                index + 1 === pagination.current_page &&
                                dotPaginationDirection
                                }
 
                                ${index + 1 === pagination.current_page
                                  ? "paginationActive"
                                  : ""
                                }
                              `}
                              key={`${index}_page`}
                            >
                              <a
                                className={`fw-bold paginationNumbers paginationStyle`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  getProduct(index + 1, selected);
                                  goToTop();
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
                          className={`rightArrow ${pagination.has_next ? "" : "disabled"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            getProduct(pagination.current_page + 1, selected);
                            goToTop();
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
      {isScreenLoading && (
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
      )}
    </>
  );
}
