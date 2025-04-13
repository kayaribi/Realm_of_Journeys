import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { CartProvider } from "./store/store";
import { CartContext } from "./store/CartContext.js";
import PropTypes from 'prop-types';
import {
  Home, About, Cart, CartOrder, CartPayment, Account,
  TravelGuide, TravelSpots, TravelSpotsItem, TravelGuideItem,
  CompletePayment, Register, ForgotPassword, ChangePassword,
  AdminLogin, AdminDashboard
} from "./pages";
import { BackTopBtn, Footer, Navbar, Toast } from "./components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./scss/all.scss";

// Admin 驗證
const PrivateRoute = ({ element }) => {
  const { isAdminLoggedIn } = useContext(CartContext);
  return isAdminLoggedIn ? element : <Navigate to="/admin" replace />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

// NotFound 畫面（3 秒後自動跳轉首頁）
const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - 頁面不存在</h1>
      <p>3 秒後將自動返回首頁...</p>
    </div>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const isNotBackTopPage = !(
    location.pathname === "/cart" ||
    location.pathname === "/account" ||
    location.pathname === "/cartOrder" ||
    location.pathname === "/cartPayment" ||
    location.pathname === "/completePayment" ||
    location.pathname === "/about" ||
    location.pathname === "/account/forgotPassword" ||
    location.pathname === "/account/changePassword" ||
    location.pathname === "/account/register" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin" ||
    location.pathname === "/travelGuide" ||
    location.pathname.startsWith("/travelGuide/")
  );

  const isCartPages = [
    "/cart", "/cartOrder", "/cartPayment", "/completePayment",
    "/account", "/account/register", "/account/forgotPassword",
    "/account/changePassword"
  ].includes(location.pathname) || location.pathname.startsWith("/travelSpots/");

  return (
    <CartProvider>
      <Navbar isCartPages={isCartPages} />
      <Toast />
      <div className="navbar-top">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/travelSpots" element={<TravelSpots />} />
          <Route path="/travelSpots/:id" element={<TravelSpotsItem />} />
          <Route path="/travelGuide" element={<TravelGuide />} />
          <Route path="/travelGuide/:id" element={<TravelGuideItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cartOrder" element={<CartOrder />} />
          <Route path="/cartPayment" element={<CartPayment />} />
          <Route path="/completePayment" element={<CompletePayment />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/forgotPassword" element={<ForgotPassword />} />
          <Route path="/account/changePassword" element={<ChangePassword />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
          {/* NotFound 一定要放最後 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {isNotBackTopPage && <BackTopBtn />}
      <Footer />
    </CartProvider>
  );
}

export default App;