import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "../scss/all.scss";
import { CartContext } from "../store/store";

export default function Navbar({ isCartPages }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const linkActiveColor = ({ isActive }) => {
    return `nav-link ${isActive ? "text-primary-600 fw-bold" : ""}`;
  };

  const handleNavbarToggle = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };

  const handleLinkClick = () => {
    setIsNavbarOpen(false);
    // 手動觸發 Bootstrap 的 collapse 隱藏
    const collapseElement = document.getElementById("navbarContent");
    if (collapseElement) {
      collapseElement.classList.remove("show");
    }
  };
  //
  // 滑動1px啟動
  const [isScrolled, setIsScrolled] = useState(false);
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
  const [screenWidth, setScreenWidth] = useState(false);
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

  // 漢堡選單style
  const hamburgIconClass =
    isNavbarOpen || isScrolled
      ? `hamburg-icon text-neutral-300`
      : `hamburg-icon text-white`;
  // 購物車style
  const cartIconClass =
    isNavbarOpen || isScrolled ? "text-neutral-300" : "text-white";
  // logo顯示圖片
  const logoImg = isScrolled ? "logo-sm-dark" : "logo-sm-light";

  const { cartList } = useContext(CartContext);
  const cartItemCount = cartList.reduce((total, item) => total + item.qty, 0);

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
              <h1 className="d-none d-lg-block log-style logo-size-l">
                行旅之境
              </h1>
              <h1
                className={`d-block d-lg-none log-style logo-size-s
                                        ${
                                          isCartPages ? "logo-sm-dark" : logoImg
                                        }`}
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
                                    ${
                                      isCartPages
                                        ? "text-neutral-300"
                                        : cartIconClass
                                    }`}
            >
              <i className="bi bi-cart position-relative">
                {cartItemCount > 0 && (
                  <span
                    class="position-absolute translate-middle badge rounded-pill bg-danger fs-11 start-100"
                    style={{
                      top: "35%",
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
              <i
                className={`${isNavbarOpen ? "bi bi-x" : "bi bi-list"} 
                                        ${
                                          isCartPages
                                            ? "text-neutral-300"
                                            : hamburgIconClass
                                        }`}
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
                        class="position-absolute translate-middle badge rounded-pill bg-danger fs-10"
                        style={{
                          top: "30%",
                          left: "80%",
                        }}
                      >
                        {cartItemCount}
                      </span>
                    )}
                  </i>
                </NavLink>
              </li>

              <li className="nav-item mt-lg-0 login-btn-margin">
                <button
                  type="button"
                  className="btn btn-primary-600 login-btn "
                >
                  <NavLink
                    to="/account"
                    className="text-white"
                    onClick={handleLinkClick}
                  >
                    登入 / 註冊
                  </NavLink>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
