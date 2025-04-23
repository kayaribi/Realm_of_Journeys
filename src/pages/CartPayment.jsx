import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/CartContext.js";
import { Modal } from "bootstrap";
import CartOrderModal from "../components/CartOrderModal";
import { useForm } from "react-hook-form";

export default function CartPayment() {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate();
  // ======================================== 驗證 ========================================
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardTerm, setCardTerm] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [errors, setErrors] = useState({});
  const { watch } = useForm();
  const formData = watch();
  const saveFormData = (data) => {
    // 過濾掉不需要儲存的欄位
    const { ...filteredData } = data;
    localStorage.setItem('formData', JSON.stringify(filteredData));
  };
  // 驗證信用卡號
  const handleCardNumChange = (e) => {
    const value = e.target.value;
    setCardNum(value);
    if (!/^\d{16}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardNum: "必須是16位數字",
      }));
    } else {
      setErrors((prevErrors) => {
        const { cardNum, ...rest } = prevErrors;
        return cardNum, rest;
      });
    }
  };
  // 驗證有效期限
  const handleCardTermChange = (e) => {
    const value = e.target.value;
    setCardTerm(value);
    if (!/^(0[1-9]|1[0-2])\d{2}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardTerm: "必須是 MMYY 格式",
      }));
    } else {
      setErrors((prevErrors) => {
        const { cardTerm, ...rest } = prevErrors;
        return cardTerm, rest;
      });
    }
  };
  // 驗證安全碼
  const handleSecurityCodeChange = (e) => {
    const value = e.target.value;
    setSecurityCode(value);
    if (!/^\d{3}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        securityCode: "必須是3位數字",
      }));
    } else {
      setErrors((prevErrors) => {
        const { securityCode, ...rest } = prevErrors;
        return securityCode, rest;
      });
    }
  };
  // 驗證按鈕是否啟用
  const isButtonEnabled = () => {
    if (paymentMethod === "atm") {
      return true; // ATM 轉帳可以直接點擊
    }
    if (paymentMethod === "card") {
      // 信用卡必須填寫正確才可以啟用按鈕
      return (
        cardNum.length === 16 &&
        /^\d{16}$/.test(cardNum) &&
        /^(0[1-9]|1[0-2])\d{2}$/.test(cardTerm) &&
        /^\d{3}$/.test(securityCode) &&
        Object.keys(errors).length === 0 // 確保錯誤訊息已清除
      );
    }
    return false;
  };
  // ======================================== 下一步 ========================================
  const handleNextStep = () => {
    navigate("/completePayment", { state: { paymentMethod } });
  };
  //====================================== 上一步 - 警告 =====================================
  const cartOrderModal = useRef(null);
  useEffect(() => {
    cartOrderModal.current = new Modal("#cartOrderModal");
  }, []);
  // 開啟
  const openBackSubmitModal = () => {
    cartOrderModal.current.show();
  };
  // 關閉
  const closeBackSubmitModal = () => {
    cartOrderModal.current.hide();
  };
  return (
    <>
      {/* 上一步 Modal */}
      <CartOrderModal
        closeBackSubmitModal={closeBackSubmitModal}
        cartOrderModal={cartOrderModal}
        formData={formData}
        saveFormData={saveFormData}
      />
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
          {cartList.map((item) => {
            return (
              <div className="col-lg-10 mb-6" key={item.id}>
                <div className="row flex-column flex-md-row d-lg-flex justify-content-center align-items-center text-lg-start text-center">
                  <div className="col">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="me-lg-10 my-3 my-lg-0 cartImg"
                    />
                  </div>
                  <div className="col">
                    <p
                      className="w-100 my-5 my-lg-0 fw-bold"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {item.product.title}
                    </p>
                  </div>
                  <div className="col">
                    <p className="w-100">
                      出發日期 2025/{item.product.travelDate.split(" - ")[0]}
                    </p>
                  </div>
                  <div className="col d-none d-md-block text-center">
                    <p>{item.qty}</p>
                  </div>
                  <div className="col text-md-end d-flex d-md-block justify-content-between mt-9 mt-md-0">
                    <p className="d-md-none">{item.qty}</p>
                    <h4 className="fs-lg-6 fs-8 text-primary-500 text-nowrap">
                      NT$ {item.total.toLocaleString()}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="col-lg-10 text-end">
            <h3 className="fs-lg-5 fs-7 text-primary-600 d-lg-block d-flex align-items-end mb-5 mb-lg-13 ms-lg-8">
              <span className="fs-lg-7 fs-9 me-auto">總計</span> NT${" "}
              {cartList
                .reduce((sum, cartItem) => sum + cartItem.total, 0)
                .toLocaleString()}
            </h3>
          </div>
        </div>
        <h3 className="title-family fs-md-5 fs-8">付款方式</h3>
        <div className="border-top border-primary-200 my-md-5 my-2"></div>
        {/* ATM */}
        <div className="form-check mb-6">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="paymentAtm"
            onChange={() => setPaymentMethod("atm")}
            checked={paymentMethod === "atm"}
          />
          <label className="form-check-label" htmlFor="paymentAtm">
            ATM 轉帳
          </label>
        </div>
        {/* 信用卡 */}
        <div className="form-check mb-6">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="paymentCard"
            onChange={() => setPaymentMethod("card")}
            checked={paymentMethod === "card"}
          />
          <label className="form-check-label" htmlFor="paymentCard">
            信用卡一次付清 Visa, Mastercard, AMEX
          </label>
        </div>
        <div
          // className="row flex-column gy-3 mt-3 mt-md-0 collapse"
          className={`collapse ${paymentMethod === "card" ? "show" : ""}`}
          id="paymentCardCollapse"
        >
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
                value={cardNum}
                onChange={handleCardNumChange}
              />
              <div className="pb-6">
                {errors.cardNum && (
                  <p className="text-danger ms-auto mb-auto fs-10 position-absolute">{errors.cardNum}</p>
                )}
              </div>
            </div>
          </div>
          {/* 有效期限 + 安全碼 */}
          <div className="col-lg-4 col-md-6 ms-md-7">
            <div className="row">
              <div className="col-7">
                {/* 有效期限 */}
                <div className="mb-md-3 mb-2">
                  <label htmlFor="cardTerm" className="form-label">
                    有效期限<span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardTerm"
                    placeholder="到期月年"
                    value={cardTerm}
                    onChange={handleCardTermChange}
                  />
                  <div className="pb-6">
                    {errors.cardTerm && (
                      <p className="text-danger ms-auto mb-auto position-absolute">{errors.cardTerm}</p>
                    )}
                  </div>
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
                    value={securityCode}
                    onChange={handleSecurityCodeChange}
                  />
                  <div className="pb-6">
                    {errors.securityCode && (
                      <p className="text-danger ms-auto mb-auto position-absolute">{errors.securityCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center mt-6">
          <button type="button"
            className="btn btn-outline-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-10 me-md-6 me-3"
            onClick={openBackSubmitModal}
          >
            上一步：填寫訂單
          </button>
          <button
            type="button"
            className="btn btn-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-10"
            onClick={handleNextStep}
            disabled={!isButtonEnabled()}
          >
            下一步：完成付款
          </button>
        </div>
      </div>
    </>
  );
}
