import { useState, useEffect } from "react";

export default function BackToTop() {
    const getInitialPosition = () => (window.innerWidth >= 992 ? 100 : 16);
    const [buttonPosition, setButtonPosition] = useState(getInitialPosition());
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // ✅ 取得 `header` 高度
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

            // ✅ 設定不同解析度的 `headerHeight` 偏移量
            const offset = window.innerWidth >= 992 ? 180 : 64;

            // ✅ 讓按鈕在 `headerHeight + offset` 外才顯示
            setIsVisible(scrollPosition + windowHeight > headerHeight + offset);

            // ✅ 讓按鈕不會超過底部
            let bottomLimit;

            if (window.innerWidth >= 1500) {
                bottomLimit = documentHeight - 343;
            } else if (window.innerWidth >= 992) {
                bottomLimit = documentHeight - 259;
            } else {
                bottomLimit = documentHeight - 699;
            }

            let newPosition = getInitialPosition();
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

    return (
        <>
            {isVisible && (
                <img
                    className="top-btn rounded-circle custom-up-arrow"
                    style={{
                        bottom: `${buttonPosition}px`, // 距離底部動態變化
                    }}
                    onClick={scrollToTop}
                    src="/images/icon/up-arrow_48px.svg"
                    alt="置頂按鍵"
                />
            )}
        </>
    );
}
