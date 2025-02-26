import loginInImage from "../../public/images/loginInImage.svg";

export default function Account() {
  return (
    <section className="py-lg-20 pt-26 pb-6">
      <div className="container">
        <div className="row flex-lg-row flex-column">
          <div className="col-lg-7 col-12  d-sm-block d-none">
            <img
              className=" w-100 object-fit-cover"
              src={loginInImage}
              alt="登入頁面圖片"
            />
          </div>

          <div className="col-lg-5 col-12">
            <div className="px-xl-17 px-lg-6 px-0 py-xxl-11 py-lg-1 pt-sm-6 pt-0 pb-sm-0">
              <h3 className="text-neutral-black fs-xl-5 fs-sm-6 fs-8  title-family text-center">
                會員登入
              </h3>
              <hr className="cusLoginInHr mt-xl-5 mt-lg-3 mt-2 mb-lg-0 mb-2" />
              <form action="" className=" py-xl-5 py-3">
                <div>
                  <label htmlFor="username"></label>
                  <input
                    type="text"
                    id="username"
                    placeholder="User Name"
                    className="px-3 py-2 loginInInput w-100 mb-lg-6 mb-5"
                  />

                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="px-3 py-2 loginInInput w-100 mb-xl-5 mb-4"
                  />

                  <div className="d-flex align-items-center mb-xl-6 mb-lg-4 mb-6  mt-lg-0 mt-3">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="loginInCheckBox"
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
