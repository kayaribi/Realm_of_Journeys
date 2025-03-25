import { useEffect, useState } from 'react';
import ScrollToTop from 'react-scroll-to-top';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

export default function BackTopBtn({ footerHeight }) {
  const location = useLocation();
  const [buttonPosition, setButtonPosition] = useState(100);

  useEffect(() => {
    const handleViewportChange = () => {
      const scrollPosition = window.scrollY;              // 當前滾動位置
      const windowHeight = window.innerHeight;            // 視窗的高度
      const documentHeight = document.body.scrollHeight; // 頁面總高度
      let bottomLimit; // 底部顯示的限制位置
      if (window.innerWidth >= 992) {
        bottomLimit = documentHeight - 259;
      } else {
        bottomLimit = documentHeight - 699;
      }
      let newPosition = 100; // 設定按鈕位置的初始值
      // 頁面滾動超過底部限制，更新按鈕位置
      if (scrollPosition + windowHeight > bottomLimit) {
        // 按鈕離底部距離：滾動位置 + 視窗高度 - 底部限制位置
        newPosition = Math.max(newPosition, scrollPosition + windowHeight - bottomLimit);
      }
      setButtonPosition(newPosition); // 更新按鈕位置
    };
    window.addEventListener('scroll', handleViewportChange);  // 滾動事件監聽
    // 清理事件監聽器，當組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener('scroll', handleViewportChange);
    };
  }, [footerHeight]);


  // ====================== 商品頁面不在手機板顯示置頂按鈕 ======================
  if (location.pathname === "/travelSpots") {
    if (window.innerWidth <= 575) {
      return null; // 在手機板隱藏
    }
  }

  return (<>
    <ScrollToTop
      smooth
      className="rounded-circle backToTopBtnStyle d-flex justify-content-center align-items-center"
      component={
        <img
          className="backToTopSvg"
          src="images/icon/up-arrow_48px.svg"
          alt="Up Arrow"
        />
      }
      style={{
        bottom: `${buttonPosition}px`, // 距離底部動態變化
      }}
    />
  </>)
}

BackTopBtn.propTypes = {
  footerHeight: PropTypes.number, // 根據實際情況可改為 isRequired
};