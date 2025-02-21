import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../store/store";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Cart() {
  // const [state, dispatch] = useContext(CartContext);
  const [cart, setCart] = useState({});
  
  // 取得購物車列表
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
        setCart(res.data.data);
      } catch (error) {
        alert("取得購物車列表失敗");
      }
    })();
  }, []);

  // 刪除全部購物車品項
  const removeCart = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
    } catch (error) {
      alert("刪除購物車失敗");
    }
  };

  // 刪除單一購物車品項
  const removeCartItem = async (cartItem_id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`
      );
    } catch (error) {
      alert("刪除購物車失敗");
    }
  };


  return (
    <>


      {/* 進度條 */}
      <div className="container position-relative mt-md-20 mt-22 mb-lg-10 my-6">
        <div className="row row-cols-4 text-center">
          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <p className="text-white">1</p>
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">購物車明細</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-neutral-100 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <p className="text-white">2</p>
            </div>
            <p className="text-neutral-100 fs-md-9 fs-12">填寫資料</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-neutral-100 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <p className="text-white">3</p>
            </div>
            <p className="text-neutral-100 fs-md-9 fs-12">付款方式</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-neutral-100 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <p className="text-white">4</p>
            </div>
            <p className="text-neutral-100 fs-md-9 fs-12">訂單完成</p>
          </div>
        </div>
        <div className="position-absolute z-n1 translate-middle start-50 progressWidth">
          <div className="progress" style={{ height: "2px", width: "100%" }}>
            <div
              className="progress-bar bg-primary-500"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: "2px", width: "0%" }}
            ></div>
          </div>
        </div>
      </div>
      {/* 購物車品項頁 */}
      <div className="container mb-lg-20 mb-6">
        {/* {JSON.stringify(cart.carts)} */}
        {/* 標題 */}
        <h3 className="title-family fs-md-5 fs-8">購物車</h3>
        <div className="border-top border-primary-200 my-md-5 my-2"></div>
        <div className="row d-lg-none g-md-4 justify-content-center align-items-center my-md-7">
          {cart.carts?.length > 0 ? (
            cart.carts?.map((cartItem) => {
              return (
                <div className="col-md-11" key={cartItem.id}>
                  <div className="d-lg-flex justify-content-center align-items-center text-lg-start text-center">
                    <img
                      src={cartItem.product.imageUrl}
                      alt=""
                      className="me-lg-6 my-3 my-lg-0 cartImg"
                    />
                    <p
                      className="w-100 my-5 my-lg-0 fw-bold"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {cartItem.product.title}
                    </p>
                    <p className="w-100">
                      出發日期 2025/
                      {cartItem.product.travelDate.split(" - ")[0]}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-7 mt-lg-0">
                      <div className="d-flex justify-content-lg-between justify-content-center align-items-center px-2">
                        <button
                          type="button"
                          className="btn btn-primary-200 adjustmentNumBtn  d-flex justify-content-center align-items-center"
                          disabled={cartItem.qty === 1 && true}
                        >
                          -
                        </button>
                        <p className="mx-md-11 mx-4 fs-lg-9 fs-10">
                          {cartItem.qty}
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary-200 adjustmentNumBtn  d-flex justify-content-center align-items-center"
                          disabled={cartItem.qty >= 10 && true}
                        >
                          +
                        </button>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <h4 className="fs-lg-6 fs-8 text-primary-500 mx-lg-8 text-nowrap">
                          NT {cartItem.total.toLocaleString()}
                        </h4>
                        <button
                          type="button"
                          className="btn btn-sm ms-5 d-lg-none"
                          onClick={() => removeCartItem(cartItem.id)}
                        >
                          <i className="bi bi-trash3 fs-5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center mt-md-14 mt-18">
              <img
                src="../public/images/icon/cart.svg"
                style={{
                  width: "100%",
                  maxWidth: "185px",
                }}
              />
              <h3 className="fs-md-5 fs-7 text-neutral-100 title-family my-6">
                您的購物車是空的
              </h3>
              <button
                type="button"
                className="btn btn-secondary-200 fs-md-7 fs-9 px-15"
              >
                去逛逛
              </button>
            </div>
          )}
        </div>
        {/* 電腦版 */}
        <table className="table align-middle table-borderless d-none d-lg-table">
          <tbody>
            {cart.carts?.length > 0 ? (
              cart.carts?.map((cartItem) => {
                return (
                  <>
                    <tr key={cartItem.id}>
                      <th className="text-center">
                        <img
                          src={cartItem.product.imageUrl}
                          className="cartImg"
                          alt=""
                        />
                      </th>
                      <td>
                        <p
                          className="w-100 my-5 my-lg-0 fw-bold"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {cartItem.product.title}
                        </p>
                      </td>
                      <td>
                        <p className="w-100">
                          出發日期 2025/
                          {cartItem.product.travelDate.split(" - ")[0]}
                        </p>
                      </td>
                      <td>
                        <div className="d-flex justify-content-lg-between justify-content-center align-items-center px-2">
                          <button
                            type="button"
                            className="btn btn-primary-200 d-flex justify-content-center align-items-center adjustmentNumBtn"
                            disabled={cartItem.qty === 1 && true}
                          >
                            -
                          </button>
                          <p className="mx-4 fs-lg-9 fs-10">{cartItem.qty}</p>
                          <button
                            type="button"
                            className="btn btn-primary-200 d-flex justify-content-center align-items-center adjustmentNumBtn"
                            disabled={cartItem.qty >= 10 && true}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <h4 className="fs-lg-6 fs-8 text-primary-500 mx-lg-8 text-nowrap text-end">
                          NT {cartItem.total.toLocaleString()}
                        </h4>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm ms-6 d-lg-block d-none"
                          onClick={() => removeCartItem(cartItem.id)}
                        >
                          <i className="bi bi-trash3 fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <tr>
                <td>
                  <div className="text-center mt-md-14 mt-18">
                    <img
                      src="../public/images/icon/cart.svg"
                      style={{
                        width: "100%",
                        maxWidth: "185px",
                      }}
                    />
                    <h3 className="fs-md-5 fs-7 text-neutral-100 title-family my-6">
                      您的購物車是空的
                    </h3>
                    <button
                      type="button"
                      className="btn btn-secondary-200 fs-md-7 fs-9 px-15"
                    >
                      去逛逛
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={cart.carts?.length > 0 ? "" : "d-none"}>
          <div className="border-top border-primary-200 mb-md-8 my-7"></div>
          <div className="d-lg-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-outline-secondary-200 fs-7 d-lg-block d-none"
              onClick={() => removeCart()}
            >
              清空購物車品項
            </button>
            <div className="d-lg-flex align-items-center justify-content-lg-center mt-6 mt-lg-0">
              <h3 className="fs-lg-5 fs-7 title-family text-primary-600 d-lg-block d-flex align-items-end">
                <span className="fs-lg-7 fs-9 me-auto">總計</span> NT{" "}
                {cart.carts
                  ?.reduce((sum, cartItem) => sum + cartItem.total, 0)
                  .toLocaleString()}
              </h3>
              <Link
                to="/cartOrder"
                className="btn btn-secondary-200 fs-7 ms-6 d-lg-block d-none"
              >
                下一步：填寫訂單
              </Link>
            </div>
            <div className="d-lg-none d-flex justify-content-center mt-6">
              <button
                type="button"
                className="btn btn-outline-secondary-200 fs-lg-7 fs-9 me-3 w-100"
                onClick={() => removeCart()}
              >
                清空購物車品項
              </button>
              <Link
                to="/cartOrder"
                className="btn btn-secondary-200 fs-lg-7 fs-10 w-100"
              >
                下一步：填寫訂單
              </Link>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}
