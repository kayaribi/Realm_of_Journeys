
import React, { useState, useEffect } from 'react';

export default function BackTopBtn() {
    const [isVisible, setIsVisible] = useState(false);

    // 頁面位置
    const handleScroll = () => {
        if (window.scrollY > 200) { 
            setIsVisible(true);
        } else {
            setIsVisible(false);
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
                <button 
                    onClick={scrollToTop}
                    className="top-btn rounded-circle p-3"
                    style={{
                        position: "fixed",bottom: "20px",right: "20px",backgroundColor: "#174675",
                        border: "none",zIndex: "1000",cursor: "pointer"
                    }}
                >
                    <img src="../public/images/top.png" alt="" />
                </button>
            )}
        </>
    );
}
