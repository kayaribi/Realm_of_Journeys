import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/store";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useContext(CartContext); // 取得登入狀態

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // 如果沒有 Token 或未登入，跳轉回登入頁面
    if (!token || !isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [navigate, isAdminLoggedIn]);

  return (
    <div>
      <h2>後台管理頁面</h2>
      {/* 這裡是後台內容 */}
    </div>
  );
};

export default AdminDashboard;
