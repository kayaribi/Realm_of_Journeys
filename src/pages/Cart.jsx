
export default function Cart() {
  return (
    <>
      <div className="mt-50"></div>
      <div className="container my-20">
        {/* 進度條 */}
        <div className="mb-md-10 mb-6 position-relative">
          <div className="row row-cols-4 text-center">
            <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
              <div className="bg-primary-500 mb-4 rounded-circle" style={{
                width: '32px',
                height: '32px'
              }}>
                <img src="../public/images/icon/check.svg" alt="" style={{ verticalAlign: 'sub' }} />
              </div>
              <p className="text-primary-500 fs-md-9 fs-11">購物車明細</p>
            </div>
            <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
              <div className="bg-primary-500 mb-4 rounded-circle d-flex justify-content-center align-items-center" style={{
                width: '32px',
                height: '32px'
              }}>
                <p className="text-white">2</p>
              </div>
              <p className="text-primary-500 fs-md-9 fs-11">填寫資料</p>
            </div>
            <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
              <div className="bg-neutral-100 mb-4 rounded-circle d-flex justify-content-center align-items-center" style={{
                width: '32px',
                height: '32px'
              }}>
                <p className="text-white">3</p>
              </div>
              <p className="text-neutral-100 fs-md-9 fs-11">付款方式</p>
            </div>
            <div className="col d-flex justify-content-center align-items-center flex-column py-md-4 py-3">
              <div className="bg-neutral-100 mb-4 rounded-circle d-flex justify-content-center align-items-center" style={{
                width: '32px',
                height: '32px'
              }}>
                <p className="text-white">4</p>
              </div>
              <p className="text-neutral-100 fs-md-9 fs-11">訂單完成</p>
            </div>
          </div>
          {/* <div className="position-absolute z-n1 translate-middle start-50" style={{
            top: '30%',
          }}>
            <div className="progress" style={{ height: '2px', width: '990px' }}>
              <div className="progress-bar bg-primary-500" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style={{ height: '2px', width: '33%' }}></div>
            </div>
          </div> */}
        </div>
        {/* 訂單 */}
        <div className="row">
          {/* 聯絡人資料 */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-end">
              <h3 className="title-family fs-md-5 fs-8">主要聯絡人資料</h3>
              <p className="fs-md-10 fs-11">
                <span className="text-danger">*</span> 此為必填項目
              </p>
            </div>
            <div className="border border-primary-200 my-md-5 my-2"></div>
            <div className="row gy-3 mt-3 mt-md-0">
              {/* 姓名 */}
              <div className="col-md-6 mb-md-7">
                <div className="mb-md-3 mb-2">
                  <label htmlFor="username" className="form-label">
                    姓名<span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="請輸入姓名"
                  />
                </div>
              </div>
              {/* 性別 */}
              <div className="col-md-6 mb-md-7 mb-2">
                <label htmlFor="male" className="form-label">
                  姓別<span className="text-danger ms-2">*</span>
                </label>
                <div className="mt-md-2">
                  <div className="form-check form-check-inline mb-0 me-6">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                    />
                    <label className="form-check-label" htmlFor="male">
                      男性
                    </label>
                  </div>
                  <div className="form-check form-check-inline mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
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
                  <label htmlFor="email" className="form-label">
                    E-mail<span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="請輸入E-mail"
                  />
                </div>
              </div>
              {/* 手機號碼 */}
              <div className="col-md-6 mb-md-7 mb-2">
                <div className="mb-md-3 mb-2">
                  <label htmlFor="tel" className="form-label">
                    手機號碼<span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="tel"
                    placeholder="請輸入手機號碼"
                  />
                </div>
              </div>
              {/* LINE */}
              <div className="col-md-6 mb-md-7 mb-2">
                <div className="mb-md-3 mb-2">
                  <label htmlFor="lineID" className="form-label">
                    LINE ID<span className="text-danger ms-2">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lineID"
                    placeholder="請輸入LINE ID"
                  />
                </div>
              </div>
              {/* 偏好 */}
              <div className="col-md-6 mb-md-7 mb-2">
                <label htmlFor="preferenceAll" className="form-label">
                  偏好方式<span className="text-danger ms-2">*</span>
                </label>
                <div className="mt-2">
                  <div className="form-check form-check-inline mb-0 me-6">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="preference"
                      id="preferenceAll"
                      value="preferenceAll"
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
                    />
                    <label className="form-check-label" htmlFor="preferenceTel">
                      手機
                    </label>
                  </div>
                  <div className="form-check form-check-inline mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="preference"
                      id="preferenceLine"
                      value="LineID"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="preferenceLine"
                    >
                      LINE ID
                    </label>
                  </div>
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
                      height: '186px',
                      resize: 'none'
                    }}
                  />
                </div>
              </div>
              {/* 同意會員權益 */}
              <div className="col-12 mb-md-7 d-flex justify-content-center">
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" value="" id="membershipRights" />
                  <label className="form-check-label" htmlFor="membershipRights">
                    我同意行旅之境的 <a href="#" className="link-primary-400 text-decoration-underline" data-bs-toggle="modal" data-bs-target="#membershipRightsIllustrate">會員權益說明</a> 與 <a href="#" className="link-primary-400 text-decoration-underline" data-bs-toggle="modal" data-bs-target="#privacy">隱私權政策</a>
                  </label>
                </div>
              </div>
              {/* 按鈕 */}
              <div className="col d-flex justify-content-center mt-6">
                <button type="button" className="btn btn-outline-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-9 me-6">上一步：選擇人數</button>
                <button type="button" className="btn btn-secondary-200 py-3 px-md-5 px-4 fs-md-7 fs-9">下一步：前往付款</button>
              </div>
            </div>
          </div>
          {/* 訂單明細 */}
          <div className="col-md-4">
            <div className="border border-primary-300 bg-primary-50 rounded-3 p-6 shadow-sm">
              <h3 className="title-family fs-5">訂單明細</h3>
              <div className="my-6">
                <p className="fs-7">泰國清邁文化美食悠遊4日</p>
                <div className="d-flex justify-content-between align-items-center mt-3 fs-7">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src="../public/images/icon/price.svg" alt="" />
                    <p>28,000</p>
                  </div>
                  <p>2人</p>
                </div>
              </div>
              <div className="border border-primary-200 mb-6"></div>
              <h5 className="fs-7 text-primary-600 text-end">總計    NT 56,000</h5>
            </div>
            <div className="text-neutral-200 fs-11 mt-6">
              <p>提醒：</p>
              <ul className="ps-5">
                <li>網頁顯示的團費為標準售價，最終結帳金額將依據優惠方案、同行人數、航班艙等等、出發日期等因素進行調整，請以最終確認金額為準。</li>
                <li>所有團費皆以新台幣計價，已包含全程領隊、司機及導遊服務費。</li>
                <li>為確保您的旅遊計畫順利，請仔細核對所有資訊並確認最終價格後再完成付款。</li>
              </ul>
            </div>
          </div>
        </div>
        {/* 會員權益說明 Modal */}
        <div class="modal fade" id="membershipRightsIllustrate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style={{ maxWidth: '636px' }}>
            <div class="modal-content border-0">
              <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close" style={{ padding: '18px' }}></button>
              <div className="px-20 pb-20">
                <div class="modal-header border-0 py-8 px-0">
                  <h4 class="modal-title fs-6" id="exampleModalLabel">會員權益說明</h4>
                </div>
                <div class="modal-body p-0">
                  <ul className="mb-0 text-neutral-300">
                    <li>
                      <h5 className="fs-7 mb-2">服務範圍</h5>
                      <p>本網站為旅遊資訊展示及預訂模擬平台，旨在提供模擬體驗，無實際商業交易行為。</p>
                    </li>
                    <li className="my-6">
                      <h5 className="fs-7 mb-2">會員資格</h5>
                      <p>註冊為會員即表示您同意本網站的使用條款與規範。會員資訊僅用於展示和測試，不涉及任何實際用途。</p>
                    </li>
                    <li>
                      <h5 className="fs-7 mb-2">模擬預定</h5>
                      <p>所有預定資料僅為展示功能，您提交的個人資訊不會被用於真實交易。</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 隱私權政策 Modal */}
        <div class="modal fade" id="privacy" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style={{ maxWidth: '636px' }}>
            <div class="modal-content border-0">
              <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close" style={{ padding: '18px' }}></button>
              <div className="px-20 pb-20">
                <div class="modal-header border-0 py-8 px-0">
                  <h4 class="modal-title fs-6" id="exampleModalLabel">隱私權政策</h4>
                </div>
                <div class="modal-body p-0">
                  <ol className="mb-0 text-neutral-300">
                    <li>
                      <h5 className="fs-7 mb-2">資料收集與使用：</h5>
                      <ul className="ps-4">
                        <li type="disc">本網站僅收集用於測試的模擬資料，如姓名、聯絡資訊，所有數據不會用於商業用途。</li>
                        <li type="disc">您的資訊僅用於顯示功能測試，不會與第三方共享。</li>
                      </ul>
                    </li>
                    <li className="my-6">
                      <h5 className="fs-7 mb-2">資料保護：</h5>
                      <ul className="ps-4">
                        <li type="disc">所有提供的個人資料僅用於本平台模擬測試，並將定期清除以確保隱私安全。</li>
                        <li type="disc">若因操作過程導致資料遺漏或損失，本網站不承擔責任，敬請見諒。</li>
                      </ul>
                    </li>
                    <li>
                      <h5 className="fs-7 mb-2">同意與更新：</h5>
                      <ul className="ps-4">
                        <li type="disc">訪問或使用本網站及表示您同意隱私政策。</li>
                        <li type="disc">本政策可能隨網站測試需求進行更新，更新內容將於本頁面發布。</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
