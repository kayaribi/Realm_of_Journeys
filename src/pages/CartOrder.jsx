import { useContext, useEffect, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal } from "bootstrap";
import { CartContext } from "../store/store";
import FloatingButton from "../components/FloatingButton";
import CartOrderModal from "../components/CartOrderModal";

export default function CartOrder() {
  const { cartList } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    watch ,
    setValue
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  //=========== 提交表單 ===========
  const startSubmit = (data) => {
    navigate('/cartPayment');
    saveFormData(data);
  };

  //=========== 下一步 - 警告 ===========
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

  // =========== 表單資料暫時儲存 ===========
  // 儲存到 localStorage
  const formData = watch();
  const saveFormData = (data) => {
    // 過濾掉不需要儲存的欄位
    const { isAgree, ...filteredData } = data;
    localStorage.setItem('formData', JSON.stringify(filteredData));
  };

  // 頁面更新時儲存資料
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveFormData(formData);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    // 清除事件監聽器
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formData]);

  // 頁面載入時，檢查有沒有儲存的資料
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // 將儲存的資料帶入表單
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

  return (
    <>
      {/* 確認下一步modal */}
      <CartOrderModal
        closeBackSubmitModal={closeBackSubmitModal}
        cartOrderModal={cartOrderModal}
        formData={formData}
        saveFormData={saveFormData}
      />

      {/* ================ 進度條 ================ */}
      <div className="container position-relative mt-md-40 mt-22 mb-lg-10 my-6">
        <div className="row row-cols-4 text-center">
          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <img src="images/icon/check.svg" alt="" />
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">購物車明細</p>
          </div>

          <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
            <div
              className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "32px" }}
            >
              <p className="text-white">2</p>
            </div>
            <p className="text-primary-500 fs-md-9 fs-12">填寫資料</p>
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
              aria-valuenow="33"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: "2px", width: "33%" }}
            ></div>
          </div>
        </div>
      </div>
      {/* ================ 表單 ================ */}
      <form
        className="container mb-lg-20 mb-8"
        onSubmit={handleSubmit(startSubmit)}
      >
        <div className="row">
          {/* ----- 聯絡人資料 ----- */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-end">
              <h3 className="title-family fs-md-5 fs-8">主要聯絡人資料</h3>
              <p className="fs-md-10 fs-11">
                <span className="text-danger">*</span> 此為必填項目
              </p>
            </div>
            <div className="border-top border-primary-200 my-md-5 my-2"></div>
            <div className="row gy-3 mt-3 mt-md-0">
              {/* 姓名 */}
              <div className="col-md-6 mb-md-7">
                <div className="mb-md-3 mb-2">
                  <div className="d-flex">
                    <label htmlFor="username" className="form-label">
                      姓名<span className="text-danger ms-2">*</span>
                    </label>
                    <p className="text-danger d-md-none ms-auto mb-auto fs-11">
                      {errors.name ? errors.name.message : ""}
                    </p>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="請輸入姓名"
                    {...register("name", {
                      required: "這是必填欄位。",
                      pattern: {
                        value: /^[\u4e00-\u9fa5]{2,10}$/,
                        message: "須超過一個字，且為中文",
                      },
                    })}
                  />
                  <p className="text-danger mt-2 d-none d-md-block position-absolute  fs-11">
                    {errors.name ? errors.name.message : ""}
                  </p>
                </div>
              </div>
              {/* 性別 */}
              <div className="col-md-6 mb-md-7 mb-2">
                <div className="d-flex">
                  <label htmlFor="male" className="form-label">
                    姓別<span className="text-danger ms-2">*</span>
                  </label>
                  <p className="text-danger d-md-none ms-auto mb-auto fs-11">
                    {errors.gender ? errors.gender.message : ""}
                  </p>
                </div>

                <div className="mt-md-2">
                  <div className="form-check form-check-inline mb-0 me-6">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      {...register("gender", {
                        required: "這是必填欄位。",
                      })}
                    />
                    <label className="form-check-label" htmlFor="male">
                      男性
                    </label>
                  </div>
                  <p className="text-danger mt-5 d-none d-md-block position-absolute fs-11">
                    {errors.gender ? errors.gender.message : ""}
                  </p>
                  <div className="form-check form-check-inline mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      {...register("gender", {
                        required: "這是必填欄位。",
                      })}
                    />
                    <label className="form-check-label" htmlFor="female">
                      女性
                    </label>
                  </div>
                </div>
              </div>
              {/* Email */}
              <div className="col-md-6 mb-md-7 mb-2">
                <div className="mb-md-3 mb-2">
                  <div className="d-flex">
                    <label htmlFor="email" className="form-label">
                      E-mail<span className="text-danger ms-2">*</span>
                    </label>
                    <p className="text-danger d-md-none ms-auto mb-auto fs-11">
                      {errors.email ? errors.email.message : ""}
                    </p>
                  </div>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="請輸入E-mail"
                    {...register("email", {
                      required: "這是必填欄位。",
                      pattern: {
                        value: /^[^@]+@[^@]+$/,
                        message: "必須為電子郵件格式",
                      },
                    })}
                  />
                  <p className="text-danger mt-2 d-none d-md-block position-absolute fs-11">
                    {errors.email ? errors.email.message : ""}
                  </p>
                </div>
              </div>
              {/* 手機號碼 */}
              <div className="col-md-6 mb-md-7 mb-2">
                <div className="mb-md-3 mb-2">
                  <div className="d-flex">
                    <label htmlFor="tel" className="form-label">
                      手機號碼<span className="text-danger ms-2">*</span>
                    </label>
                    <p className="text-danger d-md-none ms-auto mb-auto fs-11">
                      {errors.tel ? errors.tel.message : ""}
                    </p>
                  </div>
                  <input
                    type="tel"
                    className="form-control"
                    id="tel"
                    placeholder="請輸入手機號碼"
                    {...register("tel", {
                      required: "此欄位為必填。",
                      pattern: {
                        value: /^09\d{8}$/,
                        message: "必須為09開頭，且為10位數",
                      },
                    })}
                  />
                  <p className="text-danger mt-2 d-none d-md-block position-absolute fs-11">
                    {errors.tel ? errors.tel.message : ""}
                  </p>
                </div>
              </div>
              {/* LINE */}
              <div className="col-md-6 mb-md-7 mb-2">
                <div className="mb-md-3 mb-2">
                  <div className="d-flex">
                    <label htmlFor="lineID" className="form-label">
                      LINE ID<span className="text-danger ms-2">*</span>
                    </label>
                    <p className="text-danger d-md-none ms-auto mb-auto fs-11">
                      {errors.line ? errors.line.message : ""}
                    </p>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="lineID"
                    placeholder="請輸入LINE ID"
                    {...register("line", {
                      required: "這是必填欄位。",
                    })}
                  />
                  <p className="text-danger mt-2 d-none d-md-block position-absolute fs-11">
                    {errors.line ? errors.line.message : ""}
                  </p>
                </div>
              </div>
              {/* 偏好 */}
              <div className="col-md-6 mb-md-7 mb-2">
                <div className="d-flex">
                  <label htmlFor="preferenceAll" className="form-label">
                    偏好方式<span className="text-danger ms-2">*</span>
                  </label>
                  <p className="text-danger d-md-none ms-auto mb-auto fs-11">
                    {errors.likeContact ? errors.likeContact.message : ""}
                  </p>
                </div>
                {/* 偏好-選項 */}
                <div className="mt-2">
                  <div className="form-check form-check-inline mb-0 me-6">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="preference"
                      id="preferenceAll"
                      value="preferenceAll"
                      {...register("likeContact", {
                        required: "這是必填欄位。",
                      })}
                    />
                    <label className="form-check-label" htmlFor="preferenceAll">
                      都可以
                    </label>
                  </div>
                  <div className="form-check form-check-inline mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="preference"
                      id="preferenceEmail"
                      value="Email"
                      {...register("likeContact", {
                        required: "這是必填欄位。",
                      })}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="preferenceEmail"
                    >
                      E-mail
                    </label>
                  </div>
                  <div className="form-check form-check-inline mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="preference"
                      id="preferenceTel"
                      value="tel"
                      {...register("likeContact", {
                        required: "這是必填欄位。",
                      })}
                    />
                    <label className="form-check-label" htmlFor="preferenceTel">
                      手機
                    </label>
                  </div>
                  <div className="form-check form-check-inline mb-0 mt-6 mt-xxl-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="preference"
                      id="preferenceLine"
                      value="LineID"
                      {...register("likeContact", {
                        required: "這是必填欄位。",
                      })}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="preferenceLine"
                    >
                      LINE ID
                    </label>
                  </div>
                  <p className="text-danger mt-md-2 mt-lg-4 mt-xxl-6 position-absolute d-none d-md-block fs-11">
                    {errors.likeContact ? errors.likeContact.message : ""}
                  </p>
                </div>
              </div>
              {/* 備註 */}
              <div className="col mb-md-7 mb-2">
                <div className="mb-md-3 mb-2">
                  <label htmlFor="lineID" className="form-label">
                    備註
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="有其他需求或狀況請備註"
                    style={{
                      height: "186px",
                      resize: "none",
                    }}
                    {...register("userMessage")}
                  />
                </div>
              </div>
              {/* 同意會員權益 */}
              <div className="col-12 mb-md-7 d-flex justify-content-center">
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="membershipRights"
                    {...register("isAgree", {
                      required: "請瀏覽上述資訊，並勾選以示同意。",
                    })}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="membershipRights"
                  >
                    我同意行旅之境的{" "}
                    <a
                      href="#"
                      className="link-primary-400 text-decoration-underline"
                      data-bs-toggle="modal"
                      data-bs-target="#membershipRightsIllustrate"
                    >
                      會員權益說明
                    </a>{" "}
                    與{" "}
                    <a
                      href="#"
                      className="link-primary-400 text-decoration-underline"
                      data-bs-toggle="modal"
                      data-bs-target="#privacy"
                    >
                      隱私權政策
                    </a>
                  </label>
                </div>
                <p className="text-danger text-center mt-8 d-none d-lg-block position-absolute fs-11">
                  {errors.isAgree ? errors.isAgree.message : ""}
                </p>
              </div>
              {/* 按鈕 */}
              <div className="col d-flex justify-content-center mt-6">
                {/* 上一步 */}
                <button
                  type="button"
                  className="btn btn-outline-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-10 me-md-6 me-3"
                  onClick={openBackSubmitModal}
                >
                  上一步：選擇人數
                </button>
                {/* 下一步 */}
                <button
                  type="submit"
                  className="btn btn-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-10 text-white"
                  disabled={!formState.isValid}
                >
                  下一步：前往付款
                </button>
              </div>
            </div>
          </div>

          {/* ----- 訂單明細 ----- */}
          <div className="col-md-4 d-none d-md-block">
            <div className="border border-primary-300 bg-primary-50 rounded-3 p-6 shadow-sm">
              <h3 className="title-family fs-5">訂單明細</h3>
              {cartList.map((item) => {
                return (
                  <div className="my-6" key={item.id}>
                    <p className="fs-7">{item.product.title}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3 fs-7">
                      <div className="d-flex justify-content-between align-items-center">
                        <img src="images/icon/price.svg" alt="" />
                        <p>{item.total.toLocaleString()}</p>
                      </div>
                      <p>{item.qty}人</p>
                    </div>
                  </div>
                );
              })}
              <div className="border-top border-primary-200 mb-6"></div>
              <h5 className="fs-7 text-primary-600 text-end">
                總計 NT
                {cartList
                  .reduce((sum, cartItem) => sum + cartItem.total, 0)
                  .toLocaleString()}
              </h5>
            </div>
            <div className="text-neutral-200 fs-11 mt-6">
              <p>提醒：</p>
              <ul className="ps-5">
                <li>
                  網頁顯示的團費為標準售價，最終結帳金額將依據優惠方案、同行人數、航班艙等等、出發日期等因素進行調整，請以最終確認金額為準。
                </li>
                <li>
                  所有團費皆以新台幣計價，已包含全程領隊、司機及導遊服務費。
                </li>
                <li>
                  為確保您的旅遊計畫順利，請仔細核對所有資訊並確認最終價格後再完成付款。
                </li>
              </ul>
            </div>
          </div>
        </div>


        {/* 會員權益說明 Modal */}
        <div
          className="modal fade"
          id="membershipRightsIllustrate"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "636px" }}
          >
            <div className="modal-content border-0">
              <button
                type="button"
                className="btn-close ms-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ padding: "18px" }}
              ></button>
              <div className="px-md-20 px-6 pb-20">
                <div className="modal-header border-0 py-md-8 pt-3 pb-6 px-0">
                  <h4
                    className="modal-title fs-md-6 fs-8"
                    id="exampleModalLabel"
                  >
                    會員權益說明
                  </h4>
                </div>
                <div className="modal-body p-0">
                  <ul className="mb-0 text-neutral-300">
                    <li>
                      <h5 className="fs-md-7 fs-9 mb-2">服務範圍</h5>
                      <p className="fs-10 fs-md-9">
                        本網站為旅遊資訊展示及預訂模擬平台，旨在提供模擬體驗，無實際商業交易行為。
                      </p>
                    </li>
                    <li className="my-6">
                      <h5 className="fs-md-7 fs-9 mb-2">會員資格</h5>
                      <p className="fs-10 fs-md-9">
                        註冊為會員即表示您同意本網站的使用條款與規範。會員資訊僅用於展示和測試，不涉及任何實際用途。
                      </p>
                    </li>
                    <li>
                      <h5 className="fs-md-7 fs-9 mb-2">模擬預定</h5>
                      <p className="fs-10 fs-md-9">
                        所有預定資料僅為展示功能，您提交的個人資訊不會被用於真實交易。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 隱私權政策 Modal */}
        <div
          className="modal fade"
          id="privacy"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "636px" }}
          >
            <div className="modal-content border-0">
              <button
                type="button"
                className="btn-close ms-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ padding: "18px" }}
              ></button>
              <div className="px-md-20 px-6 pb-20">
                <div className="modal-header border-0 py-md-8 pt-3 pb-6 px-0">
                  <h4
                    className="modal-title fs-md-6 fs-8"
                    id="exampleModalLabel"
                  >
                    隱私權政策
                  </h4>
                </div>
                <div className="modal-body p-0">
                  <ol className="mb-0 text-neutral-300">
                    <li>
                      <h5 className="fs-md-7 fs-9 mb-2">資料收集與使用：</h5>
                      <ul className="ps-4 fs-10 fs-md-9">
                        <li type="disc">
                          本網站僅收集用於測試的模擬資料，如姓名、聯絡資訊，所有數據不會用於商業用途。
                        </li>
                        <li type="disc">
                          您的資訊僅用於顯示功能測試，不會與第三方共享。
                        </li>
                      </ul>
                    </li>
                    <li className="my-6">
                      <h5 className="fs-md-7 fs-9 mb-2">資料保護：</h5>
                      <ul className="ps-4 fs-10 fs-md-9">
                        <li type="disc">
                          所有提供的個人資料僅用於本平台模擬測試，並將定期清除以確保隱私安全。
                        </li>
                        <li type="disc">
                          若因操作過程導致資料遺漏或損失，本網站不承擔責任，敬請見諒。
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h5 className="fs-md-7 fs-9 mb-2">同意與更新：</h5>
                      <ul className="ps-4 fs-10 fs-md-9">
                        <li type="disc">
                          訪問或使用本網站及表示您同意隱私政策。
                        </li>
                        <li type="disc">
                          本政策可能隨網站測試需求進行更新，更新內容將於本頁面發布。
                        </li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 手機版明細 */}
        <FloatingButton />
      </form>
    </>
  );
}
