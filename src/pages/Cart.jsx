import { useContext } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { CartContext } from "../store/CartContext.js";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";

export default function Cart() {
  const {
    cartList,
    removeCart,
    removeCartItem,
    updateQuantity,
    isScreenLoading,
  } = useContext(CartContext);

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
        {isScreenLoading ? (
          // 🟢 載入中時顯示 Loading 畫面
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(255,255,255,0.5)",
              zIndex: 999,
            }}
          >
            <ReactLoading
              type="spokes"
              color="black"
              width="4rem"
              height="4rem"
            />
          </div>
        ) : (
          <>
            <h3 className="title-family fs-md-5 fs-8">購物車</h3>
            <div className="border-top border-primary-200 my-md-5 my-2"></div>
            <div className="row g-md-4 justify-content-center align-items-center my-md-7">
              {cartList?.length > 0 ? (
                cartList.map((cartItem) => {
                  return (
                    <CartItem
                      key={cartItem.id}
                      cartItem={cartItem}
                      updateQuantity={updateQuantity}
                      removeCartItem={removeCartItem}
                    />
                  );
                })
              ) : (
                <EmptyCart />
              )}
            </div>
            <div className={cartList.length > 0 ? "" : "d-none"}>
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
                    {cartList
                      .reduce((sum, cartItem) => sum + cartItem.total, 0)
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
          </>
        )}
      </div>


    </>
  );
}
