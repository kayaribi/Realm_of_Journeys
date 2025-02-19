import { Link } from "react-router-dom";

export default function Cart() {
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
        {/* 標題 */}
        <h3 className="title-family fs-md-5 fs-8">購物車</h3>
        <div className="border-top border-primary-200 my-md-5 my-2"></div>
        <div className="row justify-content-center align-items-center my-md-7">
          <div className="col-md-11">
            <div className="d-lg-flex justify-content-center align-items-center text-lg-start text-center">
              <img
                src="../public/images/banner_img_01.jpg"
                alt=""
                className="me-lg-6 my-3 my-lg-0 cartImg"
              />
              <p className="w-100 my-5 my-lg-0 fw-bold">
                泰國清邁
                <br />
                文化美食悠遊4日
              </p>
              <p className="w-100">出發日期 2025 / 5 / 10</p>
              <div className="d-flex justify-content-between align-items-center mt-7 mt-lg-0">
                <div className="d-flex justify-content-lg-between justify-content-center align-items-center px-2">
                  <button
                    type="button"
                    className="btn btn-primary-200 d-flex justify-content-center align-items-center adjustmentNumBtn"
                  >
                    -
                  </button>
                  <p className="mx-md-11 mx-4 fs-lg-9 fs-10">1</p>
                  <button
                    type="button"
                    className="btn btn-primary-200 d-flex justify-content-center align-items-center adjustmentNumBtn"
                  >
                    +
                  </button>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <h4 className="fs-lg-6 fs-8 text-primary-500 mx-lg-8 text-nowrap">
                    NT 28,000
                  </h4>
                  <button type="button" className="btn btn-sm ms-5 d-lg-none">
                    <i className="bi bi-trash3 fs-5"></i>
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm ms-6 d-lg-block d-none"
              >
                <i className="bi bi-trash3 fs-5"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="border-top border-primary-200 mb-md-8 my-7"></div>
        <div className="d-lg-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-lg-center">
            <div className="form-check me-9">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                全選
              </label>
            </div>
            <button
              type="button"
              className="btn btn-outline-secondary-200 fs-7 d-lg-block d-none"
            >
              清空購物車品項
            </button>
          </div>
          <div className="d-lg-flex align-items-center justify-content-lg-center mt-6 mt-lg-0">
            <h3 className="fs-lg-5 fs-7 title-family text-primary-600 d-lg-block d-flex align-items-end">
              <span className="fs-lg-7 fs-9 me-auto">總計</span> NT 28,000
            </h3>
            <Link
              to="/CartOrder"
              className="btn btn-secondary-200 fs-7 ms-6 d-lg-block d-none"
            >
              下一步：填寫訂單
            </Link>
          </div>
          <div className="d-lg-none d-flex justify-content-center mt-6">
            <button
              type="button"
              className="btn btn-outline-secondary-200 fs-lg-7 fs-9 me-3 w-100"
            >
              清空購物車品項
            </button>
            <Link
              to="/CartOrder"
              className="btn btn-secondary-200 fs-lg-7 fs-10 w-100"
            >
              下一步：填寫訂單
            </Link>
          </div>
        </div>
      </div>

      {/* 購物車品項頁-空 */}
      {/* <div className="container mb-20">
        <h3 className="title-family fs-md-5 fs-8">購物車</h3>
        <div className="border-top border-primary-200 my-md-5 my-2"></div>
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
      </div> */}
    </>
  );
}
