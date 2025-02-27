import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { set, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      gender: "",
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
    },
    mode: "onTouched",
  });
  console.log("errors", errors);
  //   console.log("email", errors?.registerEmail?.message);

  const watchForm = useWatch({
    control,
  });

  const password = watch("registerPassword");

  //   console.log("password", password);

  useEffect(() => {
    console.log(watchForm);
  }, [watchForm]);

  return (
    <>
      <section className="py-20">
        <div className="container">
          <div className="row">
            <div className="col-8 mx-auto">
              <h3 className="text-center fs-5 title-family text-neutral-black mb-5">
                會員註冊
              </h3>
              <hr style={{ border: "1px solid #C2DCF5", margin: "0px" }} />
            </div>
          </div>
          <div className="row">
            <div className="col-4 mx-auto">
              <form action="" className="pt-5">
                <div className="row">
                  <div className="col-6">
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
                  <div className="col-6">
                    <div className="position-relative d-flex flex-wrap">
                      <p
                        className="mb-2 fw-bold fs-10 text-neutral-black d-inline-block w-100"
                        style={{ lineHeight: "1.4" }}
                      >
                        性別
                        <span className="ms-1" style={{ color: "#D30000" }}>
                          *
                        </span>
                      </p>
                      <div className="d-flex pt-3">
                        <div>
                          <input
                            type="radio"
                            className="form-check-input"
                            id="male"
                            name="gender"
                            value="male"
                            {...register("gender")}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="male"
                          >
                            男性
                          </label>
                        </div>

                        <div className="ms-6">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="female"
                            name="gender"
                            value="female"
                            {...register("gender")}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="female"
                          >
                            女性
                          </label>
                          <div className="invalid-feedback">
                            More example invalid feedback text
                          </div>
                        </div>
                      </div>

                      {/* <label
                        htmlFor="name"
                        className="mb-2 fw-bold fs-10 text-neutral-black"
                        style={{ lineHeight: "1.4" }}
                      >
                        姓名
                        <span className="ms-1" style={{ color: "#D30000" }}>
                          *
                        </span>
                      </label> */}
                      {/* <input
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
                      /> */}
                      {/* {errors.name && (
                        <div
                          className="invalid-feedback position-absolute "
                          style={{ top: "74px", marginTop: "0px" }}
                        >
                          {errors?.name?.message}
                        </div>
                      )} */}
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
                    placeholder="請輸入密碼"
                    className={` form-control ${
                      errors.registerConfirmPassword ? "is-invalid" : ""
                    } px-3 py-2 loginInInput w-100  d-inline-block`}
                    name="registerConfirmPassword"
                    {...register("registerConfirmPassword", {
                      required: {
                        value: true,
                        message: "密碼為必填",
                      },
                      minLength: {
                        value: 6,
                        message: "密碼不能少於6碼",
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
