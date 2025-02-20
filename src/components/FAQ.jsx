import { useState, useEffect } from 'react';



export default function FAQ() {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className=' position-relative'>
      <div className="container px-lg-0 py-15 py-lg-30">
        <h1 className="d-flex align-items-center justify-content-lg-center gap-2 gap-lg-4 pb-8 pb-lg-15 fs-lg-3 title-family"><img src="images/icon/question_48px.svg" width={isLarge ? "48px" : "24px"} height={isLarge ? "48px" : "24px"} alt="問題icon" />常見問題</h1>
        <ul className="list-unstyled m-0">
          <li className='px-2 pb-14 pb-lg-18'>
            <h3 className="text-primary-600 pb-4 pb-lg-6 fs-lg-5 title-family" style={{ borderBottom: "1px solid #C2DCF5" }}>Q. 如何快速預訂旅行行程？</h3>
            <p className="pt-4 pt-6 fs-lg-6">您只需瀏覽我們的網站，選擇您喜愛的行程，填寫簡單的個人資料，並完成付款，即可順利完成預訂。</p>
          </li>
          <li className='px-2 pb-14 pb-lg-18'>
            <h3 className="text-primary-600 pb-4 pb-lg-6 fs-lg-5 title-family" style={{ borderBottom: "1px solid #C2DCF5" }}>Q. 全包行程是否含所有費用？</h3>
            <p className="pt-4 pt-6 fs-lg-6">是的，我們提供全包行程中，除了個人額外消費與吃食外，涵蓋了機票、住宿、交通、景點門票等費用，讓您無須擔心額外支出。</p>
          </li>
          <li className='px-2 pb-14 pb-lg-18'>
            <h3 className="text-primary-600 pb-4 pb-lg-6 fs-lg-5 title-family" style={{ borderBottom: "1px solid #C2DCF5" }}>Q. 出行前需要準備哪些資料？</h3>
            <p className="pt-4 pt-6 fs-lg-6">在您出發前，請先準備好有效的護照以及簽證（如有需求）、個人物品，以及我們發送的預訂確認信和相關行程資料。</p>
          </li>
          <li className='px-2'>
            <h3 className="text-primary-600 pb-4 pb-lg-6 fs-lg-5 title-family" style={{ borderBottom: "1px solid #C2DCF5" }}>Q. 如果有特殊需求，可以提供服務嗎？</h3>
            <p className="pt-4 pt-6 fs-lg-6">我們會根據您的需求提供相應的服務，無論是特殊飲食還是其他旅行上的需求，請在預訂時與我們聯繫，我們會盡力協助。</p>
          </li>
        </ul>
      </div >
    </div>
  )
}