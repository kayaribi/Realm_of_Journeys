import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      emailForFindPassword: "",
      verificationCode: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await Swal.fire({
        title: "驗證成功！跳轉至修改密碼頁面",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      // // 跳轉修改密碼頁面
      navigate("/account/changePassword");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "發送失敗！",
        text: "請重新輸入",
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  return (
    <>
      <section className="py-20">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="text-center fs-5 title-family text-neutral-black mb-5">
                忘記密碼
              </h3>
              <hr style={{ border: "1px solid #C2DCF5", margin: "0px" }} />
            </div>
            <div className="row">
              <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8 mx-auto">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="position-relative mt-5">
                    <label
                      htmlFor="emailForFindPassword"
                      className="mb-2 fw-bold fs-10 text-neutral-black"
                      style={{ lineHeight: "1.4" }}
                    >
                      電子郵件
                      <span className="ms-1" style={{ color: "#D30000" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      id="emailForFindPassword"
                      placeholder="請輸入電子郵件"
                      className={` form-control ${errors.emailForFindPassword ? "is-invalid" : ""
                        } px-3 py-2 loginInInput w-100  d-inline-block`}
                      name="emailForFindPassword"
                      {...register("emailForFindPassword", {
                        required: {
                          value: true,
                          message: "請輸入電子郵件",
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "電子郵件格式不正確",
                        },
                      })}
                    />
                    {errors.emailForFindPassword && (
                      <div
                        className="invalid-feedback position-absolute "
                        style={{ top: "74px", marginTop: "0px" }}
                      >
                        {errors?.emailForFindPassword?.message}
                      </div>
                    )}
                  </div>

                  <div className="position-relative mt-10">
                    <label
                      htmlFor="verificationCode"
                      className="mb-2 fw-bold fs-10 text-neutral-black"
                      style={{ lineHeight: "1.4" }}
                    >
                      驗證碼
                      <span className="ms-1" style={{ color: "#D30000" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="verificationCode"
                      placeholder="請輸入驗證碼"
                      className={` form-control ${errors.verificationCode ? "is-invalid" : ""
                        } px-3 py-2 loginInInput w-100  d-inline-block`}
                      name="verificationCode"
                      {...register("verificationCode", {
                        required: {
                          value: true,
                          message: "請輸入驗證碼",
                        },
                      })}
                    />
                    {errors.verificationCode && (
                      <div
                        className="invalid-feedback position-absolute "
                        style={{ top: "74px", marginTop: "0px" }}
                      >
                        {errors?.verificationCode?.message}
                      </div>
                    )}
                  </div>

                  <button className="mt-12 loginInButton w-100 fs-sm-7 fs-9 py-3">
                    驗證
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
