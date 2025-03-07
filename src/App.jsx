import { Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./store/store";

// 匯入頁面(pages>index.jsx做匯入喔)
import {
  Home,
  About,
  Cart,
  CartOrder,
  CartPayment,
  Account,
  TravelGuide,
  TravelSpots,
  TravelSpotsItem,
  TravelGuideItem,
  CompletePayment,
  Register,
  ForgotPassword,
  ChangePassword,
} from "./pages";
// 匯入元件(去components>index.jsx做匯入喔)
import { BackTopBtn, Footer, Navbar, Toast } from "./components";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./scss/all.scss";

function App() {
  const location = useLocation(); // 儲存當前頁面

  const isNotBackTopPage = !(
    location.pathname === "/cart" ||
    location.pathname === "/account" ||
    location.pathname === "/cartOrder" ||
    location.pathname === "/cartPayment" ||
    location.pathname === "/completePayment" ||
    location.pathname === "/about" ||
    location.pathname.startsWith("/travelGuide/")
  );

  // 排除購物車頁面navbar
  const isCartPages =
    ["/cart", "/cartOrder", "/cartPayment", "/completePayment","/account","/account/register"].includes(
      location.pathname
    ) || location.pathname.startsWith("/travelSpots/");

  return (
    <CartProvider>
      <Navbar isCartPages={isCartPages} />
      <Toast />
      <div className="navbar-top">
        <Routes>
          <Route path="/" element={<Home />}></Route> {/* 首頁 */}
          <Route path="/about" element={<About />}></Route> {/* 關於我們 */}
          <Route path="/travelSpots" element={<TravelSpots />} />{" "}
          {/* 旅遊景點-商品列表 */}
          <Route path="/travelSpots/:id" element={<TravelSpotsItem />} />{" "}
          {/* ---各別單一商品-呈現 */}
          <Route path="/travelGuide" element={<TravelGuide />} />{" "}
          {/* 攻略指南 */}
          <Route path="/travelGuide/:id" element={<TravelGuideItem />} />
          <Route path="/cart" element={<Cart />}></Route> {/* 購物車 */}
          <Route path="/cartOrder" element={<CartOrder />}></Route>{" "}
          {/* 購物車訂單 */}
          <Route path="/cartPayment" element={<CartPayment />}></Route>{" "}
          {/* 購物車支付頁 */}
          <Route
            path="/completePayment"
            element={<CompletePayment />}
          ></Route>{" "}
          {/* 完成付款 */}
          <Route path="/account" element={<Account />}></Route> {/* 登入註冊 */}
          <Route path="/account/register" element={<Register />}></Route>{" "}
          {/* 註冊 */}
          <Route
            path="/account/forgotPassword"
            element={<ForgotPassword />}
          ></Route>{" "}
          {/* 忘記密碼 */}
          <Route
            path="/account/changePassword"
            element={<ChangePassword />}
          ></Route>{" "}
          {/* 修改密碼 */}
        </Routes>
      </div>
      {isNotBackTopPage && <BackTopBtn />}
      <Footer />
    </CartProvider>
  );
}

export default App;
