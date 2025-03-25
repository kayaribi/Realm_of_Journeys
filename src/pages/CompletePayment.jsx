import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/store";

export default function CompletePayment() {
  const [deadline, setDeadline] = useState("");
  const { cartList, checkout } = useContext(CartContext);
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod || "CreditCard";
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const totalAmount = cartList.reduce((sum, cartItem) => sum + cartItem.total, 0);
    setOrderTotal(totalAmount); // 存入 state
    checkout(); // 結帳 + 清空購物車
  }, [cartList, checkout]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2); // 加2天
    const formattedDate = today.getFullYear() + " / " +
      String(today.getMonth() + 1).padStart(2, "0") + " / " +
      String(today.getDate()).padStart(2, "0");
    setDeadline(formattedDate);
  }, []);

  return (
    <>
      {/* 進度條 */}
      <div className="container position-relative mt-md-40 mt-22 mb-lg-10 my-6">
        <div className="row row-cols-4 text-center">
          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <img src="images/icon/check.svg" alt="check" />
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">購物車明細</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <img src="images/icon/check.svg" alt="check" />
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">填寫資料</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <img src="images/icon/check.svg" alt="check" />
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">付款方式</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <p className="text-white">4</p>
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">訂單完成</p>
          </div>
        </div>
        <div className="position-absolute z-n1 translate-middle start-50 progressWidth">
          <div className="progress" style={{ height: "2px", width: "100%" }}>
            <div
              className="progress-bar bg-primary-500"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: "2px", width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
      {paymentMethod === "atm" ? (
        // 支付成功頁面-ATM
        <div className="container position-relative mt-6 mb-8 my-md-20">
          <div className="text-center mb-md-6 mb-5">
            <h3 className="title-family fs-md-5 fs-8">訂單完成</h3>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4 fs-10">
              <p className="my-2">繳款期限：{deadline}</p>
              <p>
                訂單金額：
                {orderTotal.toLocaleString()}
              </p>
              <div className="d-lg-flex justify-content-between align-items-center my-2">
                <p className="mb-lg-0 mb-2">銀行代碼：000</p>
                <p>繳款帳號：5678-9012-3456</p>
              </div>
              <p className="text-lg-center mt-md-6 mt-4">
                恭喜您完成購買，確認收到匯款後，一週內將會有專人與您聯繫
              </p>
            </div>
          </div>
          <div className="row justify-content-center mt-md-18 mt-7">
            <div className="col-lg-3">
              <div className="d-flex justify-content-center">
                <Link
                  to="/"
                  className="btn btn-outline-secondary-200 me-6 w-100 fs-lg-7"
                >
                  回到首頁
                </Link>
                <Link to="/" className="btn btn-secondary-200 w-100 fs-lg-7">
                  前往訂單
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 支付成功頁面
        <div className="container position-relative mt-6 mb-8 my-md-20">
          <div className="text-center mb-md-6 mb-5">
            <h3 className="title-family fs-md-5 fs-8">完成付款</h3>
          </div>
          <p className="text-center fs-10">
            恭喜您完成購買，一週內將會有專人與您聯繫
          </p>
          <div className="row justify-content-center mt-md-18 mt-7">
            <div className="col-lg-3">
              <div className="d-flex justify-content-center">
                <Link
                  to="/"
                  className="btn btn-outline-secondary-200 me-6 w-100 fs-lg-7"
                >
                  回到首頁
                </Link>
                <Link to="/" className="btn btn-secondary-200 w-100 fs-lg-7">
                  前往訂單
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
