import { Link } from "react-router-dom";

export default function CompletePayment() {
  return (
    <>
      {/* 支付成功頁面 */}
      <div className="mt-50"></div>
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
              <Link to="/" className="btn btn-outline-secondary-200 me-6 w-100">
                回到首頁
              </Link>
              <Link to="/" className="btn btn-secondary-200 w-100">
                前往訂單
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 支付成功頁面-ATM */}
      <div className="mt-50"></div>
      <div className="container position-relative mt-6 mb-8 my-md-20">
        {/* 進度條 */}
        <div className="row row-cols-4 text-center mb-6 mb-md-10">
          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle"
              style={{ width: "32px", height: "32px" }}
            >
              <img
                src="../public/images/icon/check.svg"
                alt=""
                style={{ verticalAlign: "sub" }}
              />
            </div>
            <p className="text-primary-500 fs-md-9 fs-11">購物車明細</p>
          </div>
        </div>

        <div className="text-center mb-md-6 mb-5">
          <h3 className="title-family fs-md-5 fs-8">訂單完成</h3>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 fs-10">
            <p className="my-2">繳款期限：2024 / 12 / 21</p>
            <p>訂單金額：56,000</p>
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
              <button
                type="button"
                className="btn btn-outline-secondary-200 me-6 w-100"
              >
                回到首頁
              </button>
              <button type="button" className="btn btn-secondary-200 w-100">
                前往訂單
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
