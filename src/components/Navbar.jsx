import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../store/CartContext.js";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
function Navbar({ isCartPages }) {
  const { cartList } = useContext(CartContext); // 獲取購物車資料
  const location = useLocation();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [screenWidth, setScreenWidth] = useState(false);
  const navigate = useNavigate();
  // usertoken 檢查
  useEffect(() => {
    const checkUserToken = () => {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});
      setIsToken(cookies.userToken ? true : false);
    };
    checkUserToken();
  }, [location]);
  // 連結被選中的樣式
  const linkActiveColor = ({ isActive }) => {
    return `nav-link ${isActive ? "text-primary-600 fw-bold" : ""}`;
  };
  // 漢堡選單 - 開關
  const handleNavbarToggle = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };
  // 點擊漢堡選單連結隱藏選單
  const handleLinkClick = () => {
    setIsNavbarOpen(false);
    // 手動觸發 Bootstrap 的 collapse 隱藏
    const collapseElement = document.getElementById("navbarContent");
    if (collapseElement) {
      collapseElement.classList.remove("show");
    }
  };
  // 滾動透明
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // 螢幕大於991啟動
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setScreenWidth(true);
      } else {
        setScreenWidth(false);
      }
    };
    handleResize(); // 初始化檢查螢幕寬度
    // 監聽窗口大小變化
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // 漢堡選單icon style，根據狀態(navbar開啟、滾動狀態)調整顏色
  const hamburgIconClass =
    isNavbarOpen || isScrolled
      ? `hamburg-icon text-neutral-300`
      : `hamburg-icon text-white`;
  // 購物車icon樣式，根據狀態調整顏色
  const cartIconClass =
    isNavbarOpen || isScrolled ? "text-neutral-300" : "text-white";
  // 滾動顯示不同的logo
  const logoImg = isNavbarOpen ? "logo-sm-dark" : (isScrolled ? "logo-sm-dark" : "logo-sm-light");
  // 計算購物車中商品的數量
  const cartItemCount = cartList.reduce((total, item) => total + item.qty, 0);
  // 登出
  const logout = () => {
    document.cookie = "userToken=";
    setIsToken(false);
    handleLinkClick();
    Swal.fire({
      title: "登出成功",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/');
  }
  // 待製作
  const toBeUpdated = () => {
    Swal.fire({
      title: "此功能尚未開放，敬請期待！",
      icon: "info",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top navbar-light navbarPadding
        ${isScrolled ? "opacity-85 backdrop-blur" : "bg-transparent"} 
        ${isNavbarOpen && !screenWidth ? "bg-F2F7FD" : ""}`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* logo + 標題 */}
          <div className="d-flex align-items-center">
            <NavLink className="navbar-brand" to="/">
              {/* 電腦 logo */}
              <h1 className="d-none d-lg-block log-style logo-size-l">
                行旅之境
              </h1>
              {/* 手機 logo */}
              <h1 className={`d-block d-lg-none log-style logo-size-s
              ${isCartPages ? "logo-sm-dark" : logoImg}`}
              >
                行旅之境
              </h1>
            </NavLink>
          </div>
          <div className="d-flex align-items-center">
            {/* 購物車icon */}
            <NavLink
              to="/cart"
              onClick={handleLinkClick}
              className={`d-block d-lg-none me-4 fs-6 d-flex align-items-center
              ${isCartPages ? "text-neutral-300" : cartIconClass}`}
            >
              <i className="bi bi-cart position-relative">
                {cartItemCount > 0 && (
                  <span
                    className="position-absolute translate-middle badge rounded-pill bg-danger fs-11 start-100"
                    style={{
                      top: "35%",
                      fontStyle: 'normal'
                    }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </i>
            </NavLink>
            {/* 漢堡選單icon */}
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleNavbarToggle}
            >
              <i className={`${isNavbarOpen ? "bi bi-x" : "bi bi-list"} 
                ${isCartPages ? "text-neutral-300" : hamburgIconClass}`}
              ></i>
            </button>
          </div>
          {/* link */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mt-14 mt-lg-0 d-flex align-items-center">
              <li className="nav-item me-lg-8">
                <NavLink
                  className={linkActiveColor}
                  to="/travelSpots"
                  onClick={handleLinkClick}
                >
                  旅遊景點
                </NavLink>
              </li>
              <li>
                <div className="nav-item-br"></div>
              </li>
              <li className="nav-item me-lg-8">
                <NavLink
                  className={linkActiveColor}
                  to="/travelGuide"
                  onClick={handleLinkClick}
                >
                  攻略指南
                </NavLink>
              </li>
              <li>
                <div className="nav-item-br"></div>
              </li>
              <li className="nav-item">
                <NavLink
                  className={linkActiveColor}
                  to="/about"
                  onClick={handleLinkClick}
                >
                  關於我們
                </NavLink>
              </li>
              {/* 購物車 -lg */}
              <li className="nav-item d-none d-lg-block cart-lg-margin fs-6">
                <NavLink to="/cart">
                  <i className="bi bi-cart text-neutral-300 lh-0 p-2 position-relative">
                    {cartItemCount > 0 && (
                      <span
                        className="position-absolute translate-middle badge rounded-pill bg-danger fs-10"
                        style={{
                          top: "30%",
                          left: "80%",
                          fontStyle: 'normal'
                        }}
                      >
                        {cartItemCount}
                      </span>
                    )}
                  </i>
                </NavLink>
              </li>
              {isToken ? (
                // 使用者按鈕
                screenWidth ? (
                  <div className="dropdown user-btn">
                    <button
                      className="btn btn-primary-50 border border-primary-500 dropdown-toggle px-4 py-2 d-flex"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                    >
                      <img src="images/user-icon.png" className="me-2" alt="user-img" />
                      <p className="fs-7">Nina</p>
                    </button>
                    <ul className="dropdown-menu mt-4">
                      <li><button type="button" className="dropdown-item m-0" onClick={toBeUpdated}>訂單資訊</button></li>
                      <hr className="dropdown-hr" />
                      <li><button type="button" className="dropdown-item m-0" onClick={toBeUpdated}>我的最愛</button></li>
                      <hr className="dropdown-hr" />
                      <li><button type="button" className="dropdown-item m-0 text-center" onClick={logout}>登出</button></li>
                    </ul>
                  </div>
                )
                  // 登出按鈕
                  : (<>
                    <div className="dropdown user-btn mobile-user-btn">
                      <button
                        className="btn btn-primary-50 border border-primary-500 px-4 py-2 d-flex"
                        type="button"
                        onClick={toBeUpdated}
                      >
                        <img src="images/user-icon.png" className="me-2" alt="user-img" />
                        <p className="fs-7">Nina</p>
                      </button>
                    </div>
                    <li className="nav-item mt-lg-0">
                      <button type="button" className="btn text-primary-600 logout-btn" onClick={logout}>
                        登出
                      </button>
                    </li>
                  </>)
              ) : (
                <li className="nav-item mt-lg-0 login-btn-margin">
                  <button type="button" className="btn btn-primary-600 login-btn">
                    <NavLink to="/account" className="text-white" onClick={handleLinkClick}>
                      登入 / 註冊
                    </NavLink>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
Navbar.propTypes = {
  isCartPages: PropTypes.bool.isRequired,
};
export default Navbar;