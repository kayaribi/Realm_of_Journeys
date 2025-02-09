import { useState, useEffect } from "react";

export default function BackToTop() {
    const [buttonPosition, setButtonPosition] = useState(window.innerWidth >= 992 ? 100 : 16);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.scrollHeight;

            // ✅ 讓按鈕不會超過底部
            const bottomLimit = window.innerWidth >= 992 ? documentHeight - 343 : documentHeight - 699;
            console.log("當前滾動距離：", scrollPosition, "px");

            // ✅ 設定不同解析度的滾動顯示條件
            let scrollThreshold;
            if (window.innerWidth >= 1200) {
                scrollThreshold = 244; // 1200px 以上，滾動 244px 顯示
            } else if (window.innerWidth >= 992) {
                scrollThreshold = 305; // 992px 以上，滾動 305px 顯示
            } else if (window.innerWidth >= 768) {
                scrollThreshold = 305; // 768px 以上，滾動 305px 顯示
            } else {
                scrollThreshold = 1; // 768px 以下，滾動 1px 顯示
            }

            setIsVisible(scrollPosition > scrollThreshold);

            // ✅ 直接根據 `bottomLimit` 調整 `buttonPosition`
            let newPosition = window.innerWidth >= 992 ? 100 : 16;

            if (scrollPosition + windowHeight > bottomLimit) {
                newPosition = Math.max(newPosition, scrollPosition + windowHeight - bottomLimit);
            }

            setButtonPosition(newPosition);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setButtonPosition(window.innerWidth >= 992 ? 100 : 16);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
