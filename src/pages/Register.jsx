import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
                      href=""
                      className="text-primary-400 text-decoration-underline "
                      onClick={(e) => e.preventDefault()}
                    >
                      會員權益說明
                    </a>{" "}
                    與{" "}
                    <a
                      href=""
                      className="text-primary-400 text-decoration-underline cursor-pointer"
                      onClick={(e) => e.preventDefault()}
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
