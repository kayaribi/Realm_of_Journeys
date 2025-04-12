import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import loginInImage from "../../public/images/loginInImage.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Account() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("savedEmail")) {
      setValue("email", sessionStorage.getItem("savedEmail"));
      setValue("password", sessionStorage.getItem("savedPassword"));
      setValue("rememberMe", sessionStorage.getItem("savedRememberMe"));
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const account = { username: email, password };

    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
      const { token, expired } = res.data;
      document.cookie = `userToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;

      if (data.rememberMe) {
        // 如果勾選記住我，存帳號和密碼
        sessionStorage.setItem("savedEmail", data.email);
        sessionStorage.setItem("savedPassword", data.password);
        sessionStorage.setItem("savedRememberMe", true);
      } else {
        // 如果沒勾選記住我，就移除 sessionStorage
        sessionStorage.removeItem("savedEmail");
        sessionStorage.removeItem("savedPassword");
        sessionStorage.removeItem("savedRememberMe");
      }

      await Swal.fire({
        title: res.data.message,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      // // 跳轉首頁
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        text: "請重新登入！",
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  return (
    <section className="py-lg-20 pt-26 pb-6">
      <div className="container">
        <div className="row flex-xl-row flex-column">
          <div className="col-xl-7 col-12  d-sm-block d-none">
            <img
              className=" w-100 object-fit-cover"
              src={loginInImage}
              alt="登入頁面圖片"
            />
          </div>
          <div className="col-xl-5 col-12">
            <div className="h-100 d-flex flex-column justify-content-center pt-xl-0 pt-sm-6 pt-0">
              <h3 className="text-neutral-black fs-xXl-5 fs-xl-6 fs-sm-6 fs-8  title-family text-center">
                會員登入
              </h3>
              <hr className="cusLoginInHr mt-xxl-5 mt-4 mt-lg-3 mt-2 mb-lg-0 mb-2" />
              <form
                action=""
                className=" py-xxl-5 py-xl-4 py-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="">
                  <div className="position-relative mb-7  ">
                    <label htmlFor="email"></label>
                    <input
                      type="email"
                      id="email"
                      placeholder="信箱"
                      className={` form-control ${
                        errors.email ? "is-invalid" : ""
                      } px-3 py-2 loginInInput w-100  d-inline-block`}
                      name="email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "信箱為必填",
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "信箱格式不正確",
                        },
                      })}
                    />
                    {errors.email && (
                      <div
                        className="invalid-feedback position-absolute "
                        style={{ top: "42px", marginTop: "0px" }}
                      >
                        {errors?.email?.message}
                      </div>
                    )}
                  </div>

                  <div className="position-relative mb-7  ">
                    <label htmlFor="password"></label>
                    <input
                      type="password"
                      id="password"
                      placeholder="密碼"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      } px-3 py-2 loginInInput w-100  d-inline-block`}
                      name="password"
                      {...register("password", {
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
                    {errors.password && (
                      <div
                        className="invalid-feedback position-absolute"
                        style={{ top: "42px", marginTop: "0px" }}
                      >
                        {errors?.password?.message}
                      </div>
                    )}
                  </div>

                  <div className="d-flex align-items-center mb-xxl-6 mb-xl-5 mb-lg-4 mb-6  mt-lg-0 mt-3">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="loginInCheckBox"
                      name="rememberMe"
                      {...register("rememberMe")}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-neutral-300 ms-2"
                    >
                      記住我
                    </label>
                  </div>
                </div>
                <button className="loginInButton w-100 fs-sm-7 fs-9 py-3">
                  登入
                </button>
              </form>
              <div className="d-flex justify-content-between align-items-center mt-lg-0 mt-1">
                <a
                  className="text-primary-400 text-decoration-underline loginInATag"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/account/register");
                  }}
                >
                  立即註冊
                </a>
                <a
                  className="text-neutral-300 text-decoration-underline loginInATag"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/account/forgotPassword");
                  }}
                >
                  忘記密碼
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
