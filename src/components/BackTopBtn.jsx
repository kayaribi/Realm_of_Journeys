import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 用於取得當前路由

export default function BackTopBtn() {
  const location = useLocation(); // 取得當前頁面路徑
  const [buttonPosition, setButtonPosition] = useState(100);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992); // 判斷是否為桌面版

  useEffect(() => {
    // 判斷螢幕寬度變化，更新 isDesktop
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 取得 `header` 高度
    const updateHeaderHeight = () => {
      const header = document.getElementById("header");
      if (header) {
        const height = header.offsetHeight;
        setHeaderHeight(height);
      }
    };

    updateHeaderHeight(); // 初次執行

    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  useEffect(() => {
    const handleViewportChange = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // 設定不同解析度的 `headerHeight` 偏移量
      const offset = window.innerWidth >= 992 ? 180 : 64;

      // 讓按鈕在 `headerHeight + offset` 外才顯示
      setIsVisible(scrollPosition + windowHeight > headerHeight + offset);

      // 讓按鈕不會超過底部
      let bottomLimit;

      if (window.innerWidth >= 1500) {
        bottomLimit = documentHeight - 343;
      } else if (window.innerWidth >= 992) {
        bottomLimit = documentHeight - 259;
      } else {
        bottomLimit = documentHeight - 699;
      }

      let newPosition = 100;
      if (scrollPosition + windowHeight > bottomLimit) {
        newPosition = Math.max(newPosition, scrollPosition + windowHeight - bottomLimit);
      }

      setButtonPosition(newPosition);
    };

    handleViewportChange();
    window.addEventListener("scroll", handleViewportChange);
    window.addEventListener("resize", handleViewportChange);
    return () => {
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [headerHeight]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 只有在 `/travelSpots` 頁面，並且在桌面版時顯示 BackTopBtn
  if (location.pathname === "/travelSpots") {
    if (!isDesktop) {
      return null; // 在手機板隱藏
    }
  }

  return (
    <>
      {isVisible && (
        <img
          className="top-btn rounded-circle custom-up-arrow"
          style={{
            bottom: `${buttonPosition}px`, // 距離底部動態變化
          }}
          onClick={scrollToTop}
          src="images/icon/up-arrow_48px.svg"
          alt="置頂按鍵"
        />
      )}
    </>
  );
}
