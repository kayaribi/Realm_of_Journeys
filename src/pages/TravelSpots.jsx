import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import DepartureTimeDecoration from "../components/DepartureTimeDecoration";
import productPageBanner from "../../public/images/icon/productPageBanner.svg";
import productPageBanner2 from "../../public/images/icon/productPageBanner2.svg";
import productPageBanner3 from "../../public/images/icon/productPageBanner3.svg";
import productPageBanner4 from "../../public/images/icon/productPageBanner4.svg";
import { use } from "react";

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
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const itemsPerPage = 10;
  // 判斷是否啟用 ... 分頁功能
  const [isDotPagination, setIsDotPagination] = useState(true);
  // 改變 ... 的顯示方向
  const [dotPaginationDirection, setDotPaginationDirection] = useState(
    "rightDotStyleMargin"
  );
  // (Api沒提供，所以自己撰寫) 計算篩選後的當前頁面要顯示的資料
  const paginatedData = filteredProductData.slice(
    (cusCurrentPage - 1) * itemsPerPage,
    cusCurrentPage * itemsPerPage
  );

  // 卷軸渲染畫面功能
  const initialWindowWidthRef = useRef(window.innerWidth <= 575);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth <= 575);
  const scrollCurrentPage = useRef(1);
  const isScrollLoadingRef = useRef(false);
  const initialSwitchRef = useRef(false);
  const listRef = useRef(null);
  const [isSignIn, setIsSignIn] = useState(false);
  const paginationTotalPageRef = useRef(null);

  // 測試 使用渲染篩選資料的 Ref 變數
  const cusFilterCurrentPage = useRef(1);
  //應該暫時沒用到
  const [cusFilterTotalPages, setCusFilterTotalPages] = useState(1);
  const cusFilterTotalPagesInitialSwitchRef = useRef(false);
  const switchFilterScrollRender = useRef(false);
  const [handleRenderScrollProduct, setHandleRenderScrollProduct] = useState(
    []
  );
  const [handleFilterRenderProduct, setHandleFilterRenderProduct] = useState(
    []
  );

  const [handleFilterRenderProductSwitch, setHandleFilterRenderProductSwitch] =
    useState(false);

  const [test, setTest] = useState([]);

  const [a, setA] = useState({});

  const testRef = useRef([]);
  const testCurrentPage = useRef(1);
  const testtestRef = useRef(null);
  const filterTotalPageRef = useRef(null);

  // const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    // 做個開關吧 只觸發第一次
    if (!cusFilterTotalPagesInitialSwitchRef) {
      if (pagination.total_pages) {
        console.log(
          "我觸發了paginationTotalPageRef.current = pagination.total_pages，所以數值變5",
          paginationTotalPageRef.current
        );

        paginationTotalPageRef.current = pagination.total_pages;

        cusFilterTotalPagesInitialSwitchRef = false;
      }
    }
  }, [pagination]);

  const handleScroll = () => {
    console.log("執行卷軸功能");

    const height =
      listRef.current.offsetHeight + listRef.current.offsetTop - 715;

    // 需要滾動到下方，且沒有在讀取中以及瀏覽器視窗寬度小於等於575時

    if (switchFilterScrollRender.current) {
      if (
        !isScrollLoadingRef.current &&
        window.scrollY > height &&
        scrollCurrentPage.current < filterTotalPageRef.current
      ) {
        console.log("觸發篩選按鈕");
        // console.log(paginatedData);
        // setCusCurrentPage((pre) => pre++);

        console.log(
          "scrollCurrentPage.current",
          scrollCurrentPage.current,
          "filterTotalPageRef.current",
          filterTotalPageRef.current
        );

        // 這裡或許可以使用getFilferScrollProduct();傳參數
        scrollCurrentPage.current++;
        testCurrentPage.current++;
        getFilferScrollProduct(handleRenderScrollProduct);
        // cusCurrentPage++;
        // getScrollProduct(cusCurrentPage);
      }
    } else {
      if (
        !isScrollLoadingRef.current &&
        window.scrollY > height &&
        scrollCurrentPage.current < paginationTotalPageRef.current
      ) {
        console.log("尚未觸發篩選按鈕");
        scrollCurrentPage.current++;
        getScrollProduct(scrollCurrentPage.current);
      }
    }
  };

  useEffect(() => {
    const debounceScroll = debounce(handleScroll, 200);

    // 登入之後 會執行這一段
    // 假設初始為 小於 575px

    if (initialSwitchRef.current) {
      if (windowWidth) {
        // 小於 575px
        console.log("gpt 視窗寬度畫面變更小於575px，註冊了監聽事件");
        setHandleFilterRenderProductSwitch(true);
        setCusCurrentPage(1);
        scrollCurrentPage.current = 1;
        setProductList([]);
        // getScrollProduct();
        getFilferScrollProduct();
        window.addEventListener("scroll", debounceScroll);
      } else {
        // 大於 575px
        console.log("gpt 視窗寬度畫面變更大於575px，移除了監聽事件");
        setHandleFilterRenderProductSwitch(false);
        window.removeEventListener("scroll", debounceScroll);
        handleCusPageChange(1);
        setProductList([]);
        getProduct();
      }
    } else {
      // 初始加載 會執行這一段
      console.log(
        "初始預設會跑這一段，此時的initialSwitchRef.current為false",
        initialSwitchRef.current
      );

      // 如果初始寬度小於 575 px  就註冊監聽事件
      if (initialWindowWidthRef.current) {
        console.log("因為初始預設寬度小於 575 px 所以執行監聽註冊");
        window.addEventListener("scroll", debounceScroll);
      } else {
        console.log("因為初始預設寬度大於 575 px 所以不執行監聽註冊");
      }
    }

    return () => {
      window.removeEventListener("scroll", debounceScroll);
    };
  }, [windowWidth]);

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
    // getProduct();

    if (category === "全部") {
      setBannerChange(productPageBanner);
      setIsFilterProducts(false);
      setHandleFilterRenderProductSwitch(false);
      switchFilterScrollRender.current = false;
      paginationTotalPageRef.current = 5;
      return;
    }
    switchFilterScrollRender.current = true;
    setIsFilterProducts(true);
    setHandleFilterRenderProductSwitch(true);
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
    // const test = filteredProductsList.slice(
    //   (cusCurrentPage - 1) * itemsPerPage,
    //   cusCurrentPage * itemsPerPage
    // );
    // handleGetProductType(e, category, test);
    // setA({ e, category, filteredProductsList });
    setCusCurrentPage(1);
    setCusHasPre(false);
    setCusHasNext(true);
    setFilteredProductData(filteredProductsList);
    setHandleRenderScrollProduct(filteredProductsList);
  };

  // 參考模板
  // const b = useCallback(() => {
  //   console.log(
  //     "a",
  //     a,
  //     "a.e.target.value",
  //     a.e.target.value,
  //     "a.category",
  //     a.category
  //   );
  // }, [a]);

  // useEffect(() => {
  //   if (Object.keys(a).length !== 0) {
  //     b();
  //   }
  // }, [a]);

  // 測試
  useEffect(() => {
    if (handleRenderScrollProduct.length > 0) {
      console.log("handleRenderScrollProduct", handleRenderScrollProduct);

      // const test = handleRenderScrollProduct.slice(
      //   (cusCurrentPage - 1) * itemsPerPage,
      //   cusCurrentPage * itemsPerPage
      // );

      // const test2 = handleRenderScrollProduct.slice(
      //   (2 - 1) * itemsPerPage,
      //   2 * itemsPerPage
      // );
      // 點擊後要將 test 的資料傳到  getFilferScrollProduct 內
      // setTest(test);

      // testRef.current = handleRenderScrollProduct.slice(
      //   (testCurrentPage.current - 1) * itemsPerPage,
      //   testCurrentPage.current * itemsPerPage
      // );
      // console.log("testRef.current", testRef.current);
      setHandleFilterRenderProduct([]);
      scrollCurrentPage.current = 1;
      testCurrentPage.current = 1;
      testtestRef.current = handleRenderScrollProduct;
      getFilferScrollProduct();

      // setCusTotalPages(Math.ceil(filteredProductData.length / itemsPerPage));
      // paginationTotalPageRef.current = Math.ceil(
      //   filteredProductData.length / itemsPerPage
      // );
    }
  }, [handleRenderScrollProduct]);

  // (Api沒提供，所以自己撰寫) 根據篩選出來的資料設定總頁數
  useEffect(() => {
    if (filteredProductData.length > 0) {
      // console.log(filteredProductData);

      setCusTotalPages(Math.ceil(filteredProductData.length / itemsPerPage));
      paginationTotalPageRef.current = Math.ceil(
        filteredProductData.length / itemsPerPage
      );
      filterTotalPageRef.current = Math.ceil(
        filteredProductData.length / itemsPerPage
      );
    }
  }, [filteredProductData]);

  // 處理分頁 ... 的畫面顯示及功能
  const handleDotStylePagination = (currentPage) => {
    if (currentPage < 3) {
      setIsDotPagination(true);
      setDotPaginationDirection("rightDotStyleMargin");
    } else if (currentPage === 3) {
      setIsDotPagination(false);
    } else if (currentPage > 3) {
      setIsDotPagination(true);
      setDotPaginationDirection("leftDotStyleMargin");
    }
  };

  // 登入功能
  const signIn = async () => {
    try {
      console.log("進入登入function內部");
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, {
        username: "RealmOfJourneys@gmail.com",
        password: "RealmOfJourneys",
      });

      const { token, expired } = res.data;
      // document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;
      // setToken(token);
      copyInitialAllProducts();
      setIsSignIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  // 執行登入以及備份初始資料
  useEffect(() => {
    signIn();
    console.log("登入成功");
  }, []);

  // 取得產品資料
  const getProduct = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      console.log("執行getProduct");
      // isScrollLoadingRef.current = true;
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      const { products, pagination } = res.data;
      setPagination(pagination);
      handleDotStylePagination(page);
      setProductList(products);
    } catch (error) {
      console.log("資料抓取失敗");
      console.log(error);
    }
  };

  // 滾動卷軸取得產品資料
  const getScrollProduct = async (page = 1) => {
    try {
      console.log("執行getScrollProduct");
      isScrollLoadingRef.current = true;
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      const { products, pagination } = res.data;
      setPagination(pagination);
      // handleDotStylePagination(page);
      // setProductList(products);
      setProductList((preProductsList) => {
        console.log("更新卷軸渲染資料");
        return [...preProductsList, ...products];
      });

      setTimeout(() => {
        isScrollLoadingRef.current = false;
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    setIsScreenLoading(false);
  };

  // 滾動卷軸取得篩選後的產品資料
  const getFilferScrollProduct = async () => {
    try {
      console.log("執行getFilferScrollProduct");
      isScrollLoadingRef.current = true;

      //應該用不到
      // const res = await axios.get(
      //   `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      // );
      // const { products, pagination } = res.data;
      // setPagination(pagination);
      // handleDotStylePagination(page);
      // setProductList(products);

      // 這裡丟入的資料應該要是篩選後且分割好的前10筆資料
      // setProductList([]);
      // setProductList([]);
      // console.log(
      //   "我是在getFilferScrollProduct內部要執行setHandleFilterRenderProduct前的handleRenderScrollProduct，看是否有先取得正確資料",
      //   handleRenderScrollProduct
      // );

      console.log(
        "我是在getFilferScrollProduct內部要執行setHandleFilterRenderProduct前的testtestRef.current，看是否有先取得正確資料",
        testtestRef.current
      );

      let testData = [];

      if (testCurrentPage.current === 1) {
        testData = testtestRef.current.slice(
          (testCurrentPage.current - 1) * itemsPerPage,
          testCurrentPage.current * itemsPerPage
        );
      } else {
        testData = testtestRef.current.slice(
          (testCurrentPage.current - 1) * itemsPerPage,
          testCurrentPage.current * itemsPerPage
        );
      }

      console.log(
        "我是在getFilferScrollProduct內部要執行setHandleFilterRenderProduct前的testData",
        testData
      );

      // setHandleFilterRenderProduct((preFilterProductsList) => {
      //   console.log("更新篩選後的卷軸渲染資料");
      //   return [...preFilterProductsList, ...testRef.current];
      // });

      // setHandleFilterRenderProduct(testRef.current);

      // console.log(
      //   "我是在getFilferScrollProduct內部要執行setHandleFilterRenderProduct前的testRef.current",
      //   testRef.current
      // );

      setHandleFilterRenderProduct((preFilterProduct) => {
        console.log("更新卷軸渲染資料");
        return [...preFilterProduct, ...testData];
      });

      setTimeout(() => {
        isScrollLoadingRef.current = false;
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    setIsScreenLoading(false);
  };

  // 優化視窗寬度變化
  useEffect(() => {
    // 處理視窗尺寸變化
    const handleResize = () => {
      setWindowWidth(window.innerWidth <= 575);
    };

    // 使用防抖來限制 resize 事件的處理頻率
    const debounceResize = debounce(handleResize, 200);

    window.addEventListener("resize", debounceResize);

    // 清理副作用
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []); // 只在組件掛載和卸載時執行一次

  // 防抖函數，限制觸發頻率
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout); // 每次觸發時清除之前的計時器
      timeout = setTimeout(() => func(...args), delay); // 設置新的計時器
    };
  };

  // 根據寬度變化判斷要取得哪種資料
  const handleGetProductType = (e, category, test) => {
    e.preventDefault();
    if (windowWidth) {
      if (e.target.className.includes("bg-primary-500")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // 這裡應該還要再做一個判斷 是要執行 getScrollProduct 還是 getFilferScrollProduct

        if (category === "全部") {
          console.log("視窗小於575px且點擊篩選為全部");
          scrollCurrentPage.current = 1;
          setProductList([]);
          getScrollProduct();
        } else {
          console.log("視窗小於575px且點擊篩選為其他");
          scrollCurrentPage.current = 1;
          setProductList([]);
          // getFilferScrollProduct();
          // getScrollProduct();
        }
      }
    } else {
      if (e.target.className.includes("bg-primary-500")) {
        return;
      } else {
        getProduct();
      }
    }
  };

  useEffect(() => {
    if (isSignIn) {
      if (initialWindowWidthRef.current) {
        console.log("我小於575px 所以執行getScrollProduct");
        window.scrollTo({ top: 0, behavior: "smooth" });
        getScrollProduct();
      } else {
        console.log("我大於575px 所以執行正常getProduct");
        window.scrollTo({ top: 0, behavior: "smooth" });
        getProduct();
      }
      initialSwitchRef.current = true;
    }
  }, [isSignIn]);

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
        <div className="travelSpotsBannerBackDrop"></div>
        <h2 className="title-family  text-white travelSpotsBannerText z-3">
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
                      handleGetProductType(e, "全部");
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
                      handleGetProductType(e, "亞洲");
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
                      handleGetProductType(e, "歐洲");
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
                      handleGetProductType(e, "中東");
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
            {isFilterProducts ? (
              <>
                {/* (Api沒提供，所以自己撰寫) 篩選後的資料渲染畫面 */}
                {handleFilterRenderProductSwitch
                  ? handleFilterRenderProduct.map((filterProduct) => {
                      return (
                        <div key={filterProduct.id} className={`col`}>
                          <Link
                            to={`/travelSpots/${filterProduct.id}`}
                            style={{ height: "100%" }}
                          >
                            {/* <a style={{ display: "block", height: "100%" }} href=""> */}
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
                                  {filterProduct.title} 篩選後的測試階段
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
                                  優惠價 NT{" "}
                                  {filterProduct.price.toLocaleString()}/
                                  {filterProduct.unit}
                                </p>
                              </div>
                            </div>
                            {/* </a> */}
                          </Link>
                        </div>
                      );
                    })
                  : paginatedData.map((filterProduct) => {
                      return (
                        <div key={filterProduct.id} className={`col`}>
                          <Link
                            to={`/travelSpots/${filterProduct.id}`}
                            style={{ height: "100%" }}
                          >
                            {/* <a style={{ display: "block", height: "100%" }} href=""> */}
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
                                  {filterProduct.title} 正式的資料階段
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
                                  優惠價 NT{" "}
                                  {filterProduct.price.toLocaleString()}/
                                  {filterProduct.unit}
                                </p>
                              </div>
                            </div>
                            {/* </a> */}
                          </Link>
                        </div>
                      );
                    })}
              </>
            ) : (
              // 原始 Api 的資料渲染畫面
              productList.map((product) => {
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
                    </Link>
                  </div>
                );
              })
            )}
          </div>
          {/* 分頁元件 */}
          <div className="row my-15 d-sm-block d-none">
            <div className="col">
              <div className="d-flex justify-content-center">
                <ul className="list-unstyled mb-0 d-flex align-items-center ">
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
                            className={`cusDotStylePagination ${
                              index === 0 ? "" : "paginationNumbersMargin"
                            } ${
                              index + 1 === cusCurrentPage
                                ? "paginationActive"
                                : ""
                            }`}
                            key={`${index}_page`}
                          >
                            <a
                              className={`fw-bold paginationNumbers paginationStyle`}
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
                              className={`cusDotStylePagination ${
                                index === 0 ? "" : "paginationNumbersMargin"
                              } 

                              ${
                                isDotPagination &&
                                index !== 0 &&
                                index !== pagination.total_pages - 1 &&
                                "dotDisplayNone"
                              } 
                              
                             ${
                               isDotPagination &&
                               index + 1 === pagination.current_page &&
                               dotPaginationDirection
                             }
 
                                ${
                                  index + 1 === pagination.current_page
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
      {/* {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spokes" color="black" width="4rem" height="4rem" />
        </div>
      )} */}
    </>
  );
}
