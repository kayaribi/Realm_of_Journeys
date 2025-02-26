import { useEffect, useState } from "react";
import axios from "axios";
import { set, useForm, useWatch } from "react-hook-form";
import loginInImage from "../../public/images/loginInImage.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Account() {
  //   const [userAccount, setUserAccount] = useState({
  //     email: "",
  //     password: "",
  //   });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const watchForm = useWatch({
    control,
  });
  //   console.log(watchForm);

  useEffect(() => {
    console.log(watchForm);
  }, [watchForm]);

  const onSubmit = async (data) => {
    // console.log(data);

    const { email, password } = data;

    // setUserAccount({ email, password });

    // console.log(data.email);
    // console.log(data.password);

    const account = { username: email, password };
    // const account2 = {
    //   email: "RealmOfJourneys@gmail.com",
    //   password: "RealmOfJourneys",
    // };

    // console.log(
    //   "account",
    //   typeof account,
    //   typeof account.email,
    //   typeof account.password
    // );

    // console.log(
    //   "account2",
    //   typeof account2,
    //   typeof account2.email,
    //   typeof account2.password
    // );

    try {
      console.log("進入登入function內部");
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);

      const { token, expired } = res.data;
      // document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;
      //   setIsSignIn(true);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // handleSignIn();
    // console.log("使用者帳密", account);
  };

  //   const signIn = async () => {
  //     try {
  //       console.log("進入登入function內部");
  //       console.log(userAccount);
  //       const res = await axios.post(`${BASE_URL}/v2/admin/signin`, userAccount);

  //       const { token, expired } = res.data;
  //       // document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
  //       axios.defaults.headers.common["Authorization"] = token;
  //       //   setIsSignIn(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const handleUserAccount = (e) => {
  //     const { name, value } = e.target;
  //     setUserAccount((pre) => {
  //       return { ...pre, [name]: value };
  //     });
  //   };
  // useEffect(() => {
  //   test();
  // }, []);

  // const test = async () => {
  //   try {
  //     console.log("進入登入function內部");
  //     const res = await axios.post(`${BASE_URL}/v2/admin/signin`, {
  //       username: "RealmOfJourneys@gmail.com",
  //       password: "RealmOfJourneys",
  //     });

  //     const { token, expired } = res.data;
  //     // document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
  //     axios.defaults.headers.common["Authorization"] = token;
  //     //   setIsSignIn(true);

  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSignIn = async () => {
  //   try {
  //     console.log("進入登入function內部");
  //     const res = await axios.post(`${BASE_URL}/v2/admin/signin`, {
  //       email: "RealmOfJourneys@gmail.com",
  //       password: "RealmOfJourneys",
  //     });

  //     const { token, expired } = res.data;
  //     // document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
  //     axios.defaults.headers.common["Authorization"] = token;
  //     //   setIsSignIn(true);

  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
            <div className="px-xl-17  px-0 pt-xxl-11 pt-xl-0 pt-sm-6 pt-0 pb-sm-0">
              <h3 className="text-neutral-black fs-xXl-5 fs-xl-6 fs-sm-6 fs-8  title-family text-center">
                會員登入
              </h3>
              <hr className="cusLoginInHr mt-xxl-5 mt-4 mt-lg-3 mt-2 mb-lg-0 mb-2" />
              <form
                action=""
                className=" py-xxl-5 py-xl-4 py-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label htmlFor="email"></label>

                  <input
                    type="email"
                    id="email"
                    placeholder="email"
                    className={` form-control ${
                      errors.email ? "is-invalid" : "mb-lg-6 mb-5"
                    } px-3 py-2 loginInInput w-100  d-inline-block`}
                    name="email"
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
                    <div className="invalid-feedback mb-lg-6 mb-5">
                      {errors?.email?.message}
                    </div>
                  )}

                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : "mb-xl-5 mb-4 "
                    } px-3 py-2 loginInInput w-100 d-inline-block`}
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
                    <div className="invalid-feedback mb-lg-6 mb-5">
                      {errors?.password?.message}
                    </div>
                  )}

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
                <a className="text-primary-400 text-decoration-underline loginInATag">
                  立即註冊
                </a>
                <a className="text-neutral-300 text-decoration-underline loginInATag">
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
