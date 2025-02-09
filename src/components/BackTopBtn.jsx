
import { useState, useEffect } from 'react';

export default function BackTopBtn() {
    const [isVisible, setIsVisible] = useState(false);
    const [buttonPosition, setButtonPosition] = useState(100);
    const footerHeight = 242;
    // 頁面位置
    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        const distanceToBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        if (distanceToBottom <= footerHeight + 100) {
            setButtonPosition(footerHeight + 100 - distanceToBottom);
        } else {
            setButtonPosition(100); // 正常情況下，按鈕距離底部100px
        }
    };

    // 滾動事件
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // 清理事件監聽器
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 回頂部
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 平滑滾動
        });
    };

    return (
        <>
            {isVisible && (
                <button type='button'>
                    <img className="top-btn rounded-circle custom-up-arrow p-3" style={{ bottom: `${buttonPosition}px`, }} onClick={scrollToTop} src="/images/icon/up-arrow_48px.svg" alt="" />
                </button>
            )}
        </>
    );
}
