import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const password = watch("newPassword");

  const onSubmit = async () => {
    try {
      await Swal.fire({
        title: "密碼修改成功！",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      // // 跳轉首頁
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "密碼修改失敗！",
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
                修改密碼
              </h3>
              <hr style={{ border: "1px solid #C2DCF5", margin: "0px" }} />
            </div>
            <div className="row">
              <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8 mx-auto">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="position-relative mt-5">
                    <label
                      htmlFor="newPassword"
                      className="mb-2 fw-bold fs-10 text-neutral-black"
                      style={{ lineHeight: "1.4" }}
                    >
                      新密碼
                      <span className="ms-1" style={{ color: "#D30000" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      placeholder="請輸入新密碼"
                      className={` form-control ${errors.newPassword ? "is-invalid" : ""
                        } px-3 py-2 loginInInput w-100  d-inline-block`}
                      name="newPassword"
                      {...register("newPassword", {
                        required: {
                          value: true,
                          message: "請輸入新密碼",
                        },
                        minLength: {
                          value: 6,
                          message: "密碼不能少於6碼",
                        },
                      })}
                    />
                    {errors.newPassword && (
                      <div
                        className="invalid-feedback position-absolute "
                        style={{ top: "74px", marginTop: "0px" }}
                      >
                        {errors?.newPassword?.message}
                      </div>
                    )}
                  </div>

                  <div className="position-relative mt-10">
                    <label
                      htmlFor="confirmNewPassword"
                      className="mb-2 fw-bold fs-10 text-neutral-black"
                      style={{ lineHeight: "1.4" }}
                    >
                      再次輸入密碼
                      <span className="ms-1" style={{ color: "#D30000" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      placeholder="請再次輸入新密碼"
                      className={` form-control ${errors.confirmNewPassword ? "is-invalid" : ""
                        } px-3 py-2 loginInInput w-100  d-inline-block`}
                      name="confirmNewPassword"
                      {...register("confirmNewPassword", {
                        required: {
                          value: true,
                          message: "請再次輸入新密碼",
                        },

                        validate: (value) => value === password || "密碼不一樣",
                      })}
                    />
                    {errors.confirmNewPassword && (
                      <div
                        className="invalid-feedback position-absolute "
                        style={{ top: "74px", marginTop: "0px" }}
                      >
                        {errors?.confirmNewPassword?.message}
                      </div>
                    )}
                  </div>

                  <button className="mt-12 loginInButton w-100 fs-sm-7 fs-9 py-3">
                    確定修改
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
