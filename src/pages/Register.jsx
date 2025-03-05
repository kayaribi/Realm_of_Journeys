import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";

export default function Register() {
  const {
    register,
    handleSubmit,

    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      gender: "",
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
      registerCellPhone: "",
      registerLineId: "",
      agreeTerm: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await Swal.fire({
        title: "恭喜註冊成功！即將返回首頁...",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      // // 跳轉首頁
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "註冊失敗！",
        text: "請重新註冊",
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  const password = watch("registerPassword");

  return (
    <>
      <section className="py-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h3 className="text-center fs-5 title-family text-neutral-black mb-5">
                會員註冊
              </h3>
              <hr style={{ border: "1px solid #C2DCF5", margin: "0px" }} />
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8 mx-auto">
              <form
                action=""
                className="pt-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row flex-sm-row flex-column">
                  <div className="col-6 cusWidth">
                    <div className="position-relative">
                      <label
                        htmlFor="name"
                        className="mb-2 fw-bold fs-10 text-neutral-black"
                        style={{ lineHeight: "1.4" }}
                      >
                        姓名
                        <span className="ms-1" style={{ color: "#D30000" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="請輸入使用者姓名"
                        className={` form-control ${
                          errors.name ? "is-invalid" : ""
                        } px-3 py-2 loginInInput w-100  d-inline-block`}
                        name="name"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "姓名為必填",
                          },
                        })}
                      />
                      {errors.name && (
                        <div
                          className="invalid-feedback position-absolute "
                          style={{ top: "74px", marginTop: "0px" }}
                        >
                          {errors?.name?.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6 mt-sm-0 mt-10">
                    <div className=" d-flex flex-wrap">
                      <p
                        className="mt-sm-1 mt-0 mb-sm-0 mb-2 fw-bold fs-10 text-neutral-black d-inline-block w-100"
                        style={{ lineHeight: "1.4" }}
                      >
                        性別
                        <span className="ms-1" style={{ color: "#D30000" }}>
                          *
                        </span>
                      </p>
                      <div className="position-relative d-flex pt-sm-4 pt-0 w-100">
                        <div>
                          <input
                            type="radio"
                            className={` form-check-input ${
                              errors.gender ? "is-invalid" : ""
                            } `}
                            id="male"
                            name="gender"
                            value="male"
                            {...register("gender", {
                              required: {
                                value: true,
                                message: "請選擇性別",
                              },
                            })}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="male"
                          >
                            男性
                          </label>
                        </div>

                        <div className="ms-sm-6 ms-8">
                          <input
                            type="radio"
                            className={` form-check-input ${
                              errors.gender ? "is-invalid" : ""
                            } `}
                            id="female"
                            name="gender"
                            value="female"
                            {...register("gender", {
                              required: {
                                value: true,
                                message: "請選擇性別",
                              },
                            })}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="female"
                          >
                            女性
                          </label>
                        </div>
                        <div
                          className={`invalid-feedback position-absolute cusGenderFeedBackPosition ${
                            errors.gender ? "d-block" : ""
                          }`}
                        >
                          {errors?.gender?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="position-relative mt-10">
                  <label
                    htmlFor="registerEmail"
                    className="mb-2 fw-bold fs-10 text-neutral-black"
                    style={{ lineHeight: "1.4" }}
                  >
                    E-mail
                    <span className="ms-1" style={{ color: "#D30000" }}>
                      *
                    </span>
                  </label>
                  <input
                    type="email"
                    id="registerEmail"
                    placeholder="請輸入 Email"
                    className={` form-control ${
                      errors.registerEmail ? "is-invalid" : ""
                    } px-3 py-2 loginInInput w-100  d-inline-block`}
                    name="registerEmail"
                    {...register("registerEmail", {
                      required: {
                        value: true,
                        message: "email 為必填",
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "email 格式不正確",
                      },
                    })}
                  />
                  {errors.registerEmail && (
                    <div
                      className="invalid-feedback position-absolute "
                      style={{ top: "74px", marginTop: "0px" }}
                    >
                      {errors?.registerEmail?.message}
                    </div>
                  )}
                </div>

                <div className="position-relative mt-10">
                  <label
                    htmlFor="registerPassword"
                    className="mb-2 fw-bold fs-10 text-neutral-black"
                    style={{ lineHeight: "1.4" }}
                  >
                    密碼
                    <span className="ms-1" style={{ color: "#D30000" }}>
                      *
                    </span>
                  </label>
                  <input
                    type="password"
                    id="registerPassword"
                    placeholder="請輸入密碼"
                    className={` form-control ${
                      errors.registerPassword ? "is-invalid" : ""
                    } px-3 py-2 loginInInput w-100  d-inline-block`}
                    name="registerEmail"
                    {...register("registerPassword", {
                      required: {
                        value: true,
                        message: "密碼為必填",
                      },
                      minLength: {
                        value: 6,
                        message: "密碼不能少於6碼",
                      },
                    })}
                  />
                  {errors.registerPassword && (
                    <div
                      className="invalid-feedback position-absolute "
                      style={{ top: "74px", marginTop: "0px" }}
                    >
                      {errors?.registerPassword?.message}
                    </div>
                  )}
                </div>

                <div className="position-relative mt-10">
                  <label
                    htmlFor="registerConfirmPassword"
                    className="mb-2 fw-bold fs-10 text-neutral-black"
                    style={{ lineHeight: "1.4" }}
                  >
                    確認密碼
                    <span className="ms-1" style={{ color: "#D30000" }}>
                      *
                    </span>
                  </label>
                  <input
                    type="password"
                    id="registerConfirmPassword"
                    placeholder="請再次輸入密碼"
                    className={` form-control ${
                      errors.registerConfirmPassword ? "is-invalid" : ""
                    } px-3 py-2 loginInInput w-100  d-inline-block`}
                    name="registerConfirmPassword"
                    {...register("registerConfirmPassword", {
                      required: {
                        value: true,
                        message: "確認密碼為必填",
                      },

                      validate: (value) => value === password || "密碼不一樣",
                    })}
                  />
                  {errors.registerConfirmPassword && (
                    <div
                      className="invalid-feedback position-absolute "
                      style={{ top: "74px", marginTop: "0px" }}
                    >
                      {errors?.registerConfirmPassword?.message}
                    </div>
                  )}
                </div>

                <div className="position-relative mt-10">
                  <label
                    htmlFor="registerCellPhone"
                    className="mb-2 fw-bold fs-10 text-neutral-black"
                    style={{ lineHeight: "1.4" }}
                  >
                    手機號碼
                    <span className="ms-1" style={{ color: "#D30000" }}>
                      *
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="registerCellPhone"
                    placeholder="請輸入手機號碼"
                    className={` form-control ${
                      errors.registerConfirmPassword ? "is-invalid" : ""
                    } px-3 py-2 loginInInput w-100  d-inline-block`}
                    name="registerConfirmPassword"
                    {...register("registerCellPhone", {
                      required: {
                        value: true,
                        message: "手機號碼為必填",
                      },
                      pattern: {
                        value: /^09\d{8}$/,
                        message: "手機號碼格式不正確，應為 09 開頭，共 10 碼",
                      },
                    })}
                  />
                  {errors.registerCellPhone && (
                    <div
                      className="invalid-feedback position-absolute "
                      style={{ top: "74px", marginTop: "0px" }}
                    >
                      {errors?.registerCellPhone?.message}
                    </div>
                  )}
                </div>

                <div className="position-relative mt-10">
                  <label
                    htmlFor="registerLineId"
                    className="mb-2 fw-bold fs-10 text-neutral-black"
                    style={{ lineHeight: "1.4" }}
                  >
                    LINE ID
                    <span className="ms-1" style={{ color: "#D30000" }}>
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="registerLineId"
                    placeholder="請輸入 LINE ID"
                    className={` form-control ${
                      errors.registerLineId ? "is-invalid" : ""
                    } px-3 py-2 loginInInput w-100  d-inline-block`}
                    name="registerLineId"
                    {...register("registerLineId", {
                      required: {
                        value: true,
                        message: "LINE ID 為必填",
                      },
                    })}
                  />
                  {errors.registerLineId && (
                    <div
                      className="invalid-feedback position-absolute "
                      style={{ top: "74px", marginTop: "0px" }}
                    >
                      {errors?.registerLineId?.message}
                    </div>
                  )}
                </div>

                <div className="position-relative mt-10 d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="agreeTerm"
                    className="loginInCheckBox is-invalid"
                    name="agreeTerm"
                    {...register("agreeTerm", {
                      required: {
                        value: true,
                        message: "請同意條款",
                      },
                    })}
                  />
                  <label htmlFor="agreeTerm" className="text-neutral-300 ms-2 ">
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
                  {errors.agreeTerm && (
                    <div className="invalid-feedback position-absolute cusAgreeTermFeedBackPosition ">
                      {errors?.agreeTerm?.message}
                    </div>
                  )}
                </div>

                <div className="mt-8 d-flex align-items-center">
                  <p className="text-neutral-300">已經是會員?</p>{" "}
                  <a
                    href=""
                    className="ms-2 text-secondary-200 text-decoration-underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/account");
                    }}
                  >
                    立即登入
                  </a>
                </div>

                <button className="mt-6 loginInButton w-100 fs-sm-7 fs-9 py-3">
                  註冊
                </button>

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
                              <h5 className="fs-md-7 fs-9 mb-2">
                                資料收集與使用：
                              </h5>
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
                              <h5 className="fs-md-7 fs-9 mb-2">
                                同意與更新：
                              </h5>
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
