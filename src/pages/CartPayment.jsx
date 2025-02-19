import { Link } from "react-router-dom";

export default function CartPayment() {
  return (
    <>
      {/* 支付頁面 */}
      <div className="mt-50"></div>
      <div className="container position-relative mt-6 mb-8 my-md-20">
        {/* 標題 */}
        <h3 className="title-family fs-md-5 fs-8">購物車</h3>
        <div className="border border-primary-200 my-md-5 my-2"></div>
        <div className="row justify-content-center align-items-center my-md-7 gy-4">
          <div className="col-md-11">
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="../public/images/banner_img_01.jpg"
                alt=""
                className="me-6"
                style={{
                  width: "173px",
                  height: "109px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <p style={{ width: "100%", maxWidth: "182px" }}>
                泰國清邁
                <br />
                文化美食悠遊4日
              </p>
              <p className="mx-6" style={{ width: "100%", maxWidth: "209px" }}>
                出發日期 2025 / 5 / 10
              </p>
              <div
                className="text-center px-2 me-6"
                style={{ width: "100%", maxWidth: "190px" }}
              >
                <p>1</p>
              </div>
              <h4 className="fs-6 text-primary-500 mx-8">NT 28,000</h4>
            </div>
          </div>
          <h3
            className="fs-5 title-family text-primary-600 text-end mt-6 mb-13"
            style={{
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            <span className="fs-7">總計</span> NT 28,000
          </h3>
        </div>
        <h3 className="title-family fs-md-5 fs-8">付款方式</h3>
        <div className="border border-primary-200 my-md-5 my-2"></div>
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
          <div className="col-md-4">
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
          <div className="col-md-4">
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
              <div className="col-5">
                {/* 安全碼 */}
                <div className="mb-md-3 mb-2">
                  <label htmlFor="securityCode" className="form-label">
                    安全碼<span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="securityCode"
                    placeholder="信用卡背面末三碼"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center mt-6">
          <Link
            to="/cartOrder"
            className="btn btn-outline-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-9 me-6"
          >
            上一步：填寫訂單
          </Link>
          <Link
            to="/CompletePayment"
            className="btn btn-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-9"
          >
            下一步：完成付款
          </Link>
        </div>
      </div>
    </>
  );
}
