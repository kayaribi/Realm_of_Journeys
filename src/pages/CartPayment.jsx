import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../store/store";

export default function CartPayment() {
  const [state, dispatch] = useContext(CartContext)
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
              <img
                src="images/icon/check.svg"
                alt=""
              />
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">購物車明細</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <img
                src="images/icon/check.svg"
                alt=""
              />
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">填寫資料</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <p className="text-white">3</p>
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">付款方式</p>
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
              aria-valuenow="66"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: "2px", width: "66%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* 支付頁面 */}
      <div className="container position-relative mt-6 mb-8 my-md-20">
        {/* 標題 */}
        <h3 className="title-family fs-md-5 fs-8">訂單明細</h3>
        <div className="border-top border-primary-200 my-md-5 my-2"></div>
        <div className="row justify-content-center align-items-center my-md-7">
          <div className="col-md-10 mb-6">
            <div className="d-lg-flex justify-content-center align-items-center text-lg-start text-center">
              <img
                src="images/banner_img_01.jpg"
                alt=""
                className="me-lg-10 my-3 my-lg-0 cartImg"
              />
              <p className="w-100 my-5 my-lg-0 fw-bold">
                泰國清邁
                <br />
                文化美食悠遊4日
              </p>
              <p className="w-100">出發日期 2025 / 5 / 10</p>
              <p className="mx-lg-8 d-none d-lg-block">1</p>
              <div className="d-flex justify-content-between align-items-center mt-7 mt-lg-0">
                <p className="d-block d-lg-none">1</p>
                <h4 className="fs-lg-6 fs-8 text-primary-500 mx-lg-8 text-nowrap">
                  NT 28,000
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div className="d-lg-flex justify-content-lg-end">
              <h3 className="fs-lg-5 fs-7 title-family text-primary-600 d-lg-block d-flex align-items-end mb-5 mb-lg-13 mx-lg-8">
                <span className="fs-lg-7 fs-9 me-auto">總計</span> NT 28,000
              </h3>
            </div>
          </div>
        </div>

        <h3 className="title-family fs-md-5 fs-8">付款方式</h3>
        <div className="border-top border-primary-200 my-md-5 my-2"></div>
        <div className="form-check mb-6">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="paymentAtm"
          />
          <label className="form-check-label" htmlFor="paymentAtm">
            ATM 轉帳
          </label>
        </div>
        <div className="form-check mb-6">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="paymentCard"
          />
          <label className="form-check-label" htmlFor="paymentCard">
            信用卡一次付清 Visa, Mastercard, AMEX
          </label>
        </div>
        <div className="row flex-column gy-3 mt-3 mt-md-0">
          {/* 信用卡卡號 */}
          <div className="col-lg-4 col-md-6 ms-md-7">
            <div className="mb-md-3 mb-2">
              <label htmlFor="cardNum" className="form-label">
                信用卡號<span className="text-danger ms-2">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="cardNum"
                placeholder="信用卡/金融卡卡號"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 ms-md-7">
            <div className="row">
              <div className="col-7">
                {/* 有效期限 */}
                <div className="mb-md-3 mb-2">
                  <label htmlFor="cardTerm" className="form-label">
                    有效期限<span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cardTerm"
                    placeholder="到期月年"
                  />
                </div>
              </div>
              <div className="col-5 gx-3 gx-md-4">
                {/* 安全碼 */}
                <div className="mb-md-3 mb-2">
                  <label htmlFor="securityCode" className="form-label">
                    安全碼<span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="securityCode"
                    placeholder="信用卡安全碼"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center mt-6">
          <Link
            to="/cartOrder"
            className="btn btn-outline-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-10 me-md-6 me-3"
          >
            上一步：填寫訂單
          </Link>
          <Link
            to="/CompletePayment"
            className="btn btn-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-10"
          >
            下一步：完成付款
          </Link>
        </div>
      </div>
    </>
  );
}
