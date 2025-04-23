import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from "../store/CartContext.js";
import { useContext } from 'react';
import Swal from "sweetalert2";
import '../scss/all.scss';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Footer() {
  const navigate = useNavigate();
  const { isAdminLoggedIn, logoutAdmin } = useContext(CartContext); // 取得狀態 & 登出函式
  const handleLogout = async () => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.post(`${BASE_URL}/v2/logout`, {}, {
        headers: {
          Authorization: token,
        },
      });
      Swal.fire({
        title: "登出成功！",
        text: "您已成功登出。",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        logoutAdmin();
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        title: "登出失敗",
        text: error.response?.data?.message || "請稍後再試一次",
        icon: "error",
        confirmButtonText: "確定",
      });
      console.error("登出錯誤：", error.response);
    }
  };
  return (<>
    <footer className="footer bg-primary-600">
      <div className="container py-10">
        <div className="d-flex justify-content-center flex-column flex-lg-row justify-content-lg-center align-items-center mb-8">
          {/* logo + title */}
          <Link to="/" className="d-flex align-items-center mb-14 my-lg-4 me-xl-15 me-lg-10">
            <img src="images/logo-light-L.svg" alt="logo" />
          </Link>
          {/* link page */}
          <ul className="list-unstyled d-flex flex-column align-items-center flex-lg-row gap-6 mb-15 mb-lg-0 text-20px">
            <li>
              <NavLink className="text-white link-warning" to="/travelSpots">旅遊景點</NavLink>
            </li>
            <li>
              <NavLink className="text-white link-warning" to="/travelGuide">旅遊攻略</NavLink>
            </li>
            <li>
              <NavLink className="text-white link-warning" to="/about">關於我們</NavLink>
            </li>
          </ul>
          {/* 社群連結 */}
          <ul className="list-unstyled d-flex gap-6 mb-14 mb-lg-0 ms-lg-auto me-lg-14">
            <li>
              <a href="https://github.com/kayaribi/Realm_of_Journeys">
                <i className="bi bi-facebook text-white link-warning community-link"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/kayaribi/Realm_of_Journeys">
                <i className="bi bi-instagram text-white link-warning community-link"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/kayaribi/Realm_of_Journeys">
                <i className="bi bi-line text-white link-warning community-link"></i>
              </a>
            </li>
          </ul>
          {isAdminLoggedIn ? (
            // 已登入時顯示「登出」
            <button
              className="text-white link-warning px-4 py-3 mb-8 mb-lg-0 border-0 bg-transparent"
              onClick={handleLogout} // 呼叫登出函式
            >
              管理員登出 <i className="bi bi-box-arrow-right ms-2"></i>
            </button>
          ) : (
            // 未登入時顯示「登入」
            <button
              className="text-white link-warning px-4 py-3 mb-8 mb-lg-0 border-0 bg-transparent"
              onClick={() => navigate("/admin")}
            >
              管理員登入 <i className="bi bi-box-arrow-in-right ms-2"></i>
            </button>
          )}
        </div>
        <hr className="footer-hr mb-8" />
        <div className="footer-text d-flex flex-column flex-lg-row align-items-start justify-content-lg-center">
          <p className="mb-2 mb-lg-0">行旅之境 ©2024 Copyrights All Reserved</p>
          <p className="mb-0 ms-lg-auto">本專題為面試作品使用，無商業行為，圖片來源請見GitHub Repo</p>
        </div>
      </div>
    </footer>
  </>)
}