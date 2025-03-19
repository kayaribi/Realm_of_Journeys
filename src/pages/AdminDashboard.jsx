import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/store";
import ReactLoading from 'react-loading';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useContext(CartContext); // 取得登入狀態
  const [tempProduct, setTempProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // 如果沒有 Token 或未登入，跳轉回登入頁面
    if (!token || !isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [navigate, isAdminLoggedIn]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
        setProducts(res.data.products);
      } catch (error) {
        console.error("請求失敗", error);
      } finally {
        setIsScreenLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-6">
            <h2>產品列表</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">查看細節</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled}</td>
                    <td>
                      <button
                        onClick={() => setTempProduct(product)}
                        className="btn btn-primary"
                        type="button"
                      >
                        查看細節
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <h2>單一產品細節</h2>
            {tempProduct.title ? (
              <div className="card">
                <img
                  src={tempProduct.imageUrl}
                  className="card-img-top img-fluid"
                  alt={tempProduct.title}
                />
                <div className="card-body" style={{ marginBottom: "-8px" }}>
                  <h5 className="card-title">
                    {tempProduct.title}
                    <span className="badge text-bg-primary">
                      {tempProduct.category}
                    </span>
                  </h5>
                  <p className="card-text">商品描述：{tempProduct.description}</p>
                  <p className="card-text">商品內容：{tempProduct.content}</p>
                  <p className="card-text">
                    <del>{tempProduct.origin_price} 元</del> / {tempProduct.price}{" "}
                    元
                  </p>
                  <h5 className="card-title">更多圖片：</h5>
                  {tempProduct.imagesUrl?.map((image) => (image && (<img key={image} src={image} className="img-fluid mb-2" />)))}
                </div>
              </div>
            ) : (
              <p>請選擇一個商品查看</p>
            )}
          </div>
        </div>
      </div>
      {isScreenLoading && (
        <div className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 999,
          }}>
          <ReactLoading type="spokes" color="black" width="4rem" height="4rem" />
        </div>)
      }
    </>
  );
};

export default AdminDashboard;
