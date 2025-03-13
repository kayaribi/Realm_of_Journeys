import { useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import loginInImage from "../../public/images/loginInImage.svg";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/store";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

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
  const { loginAdmin } = useContext(CartContext); // ✅ 取得 `loginAdmin`

  useEffect(() => {
    if (sessionStorage.getItem("savedEmail")) {
      setValue("email", sessionStorage.getItem("savedEmail"));
      setValue("password", sessionStorage.getItem("savedPassword"));
      setValue("rememberMe", sessionStorage.getItem("savedRememberMe"));
    }
  }, []);

  const onSubmit = async (data) => {
    const { email, password } = data;
    if (email !== "RealmOfJourneys@gmail.com" || password !== "RealmOfJourneys") {
      Swal.fire({
        title: "登入失敗",
        text: "帳號或密碼錯誤，請重新輸入！",
        icon: "error",
        confirmButtonText: "確定",
      });
      return; // ❌ 直接中止，不繼續發送 API 請求
    }
    const account = { username: email, password };


    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
      const { token, expired } = res.data;
      // 登入成功後，更新登入狀態
      loginAdmin(token); // ✅ 設定登入狀態
      // 儲存 token 到 cookie 或 localStorage（可選）
      localStorage.setItem("userToken", token);
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
      // 跳轉首頁
      navigate("/admin/dashboard");
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
        <div className="row justify-content-center"> {/* ✅ 讓表單置中 */}
          <div className="col-md-6"> {/* ✅ 設定寬度 50% */}
            <div className="h-100 d-flex flex-column justify-content-center pt-xl-0 pt-sm-6 pt-0">
              <h3 className="text-neutral-black fs-xXl-5 fs-xl-6 fs-sm-6 fs-8 title-family text-center">
                管理員登入
              </h3>
              <hr className="cusLoginInHr mt-xxl-5 mt-4 mt-lg-3 mt-2 mb-lg-0 mb-2" />
              <form
                className="py-xxl-5 py-xl-4 py-3 mx-auto w-75" // ✅ 設定表單寬度 75%
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="position-relative mb-7">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    placeholder="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""} px-3 py-2 loginInInput`}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "email為必填",
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "email 格式不正確",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback position-absolute" style={{ top: "42px" }}>
                      {errors?.email?.message}
                    </div>
                  )}
                </div>

                <div className="position-relative mb-7">
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={`form-control ${errors.password ? "is-invalid" : ""} px-3 py-2 loginInInput`}
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
                    <div className="invalid-feedback position-absolute" style={{ top: "42px" }}>
                      {errors?.password?.message}
                    </div>
                  )}
                </div>

                <div className="d-flex align-items-center mb-4">
                  <input type="checkbox" id="rememberMe" className="loginInCheckBox" {...register("rememberMe")} />
                  <label htmlFor="rememberMe" className="text-neutral-300 ms-2">
                    記住我
                  </label>
                </div>

                <button className="loginInButton w-50 mx-auto d-block fs-sm-7 fs-9 py-3">
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
