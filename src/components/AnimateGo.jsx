import { useEffect, useRef, useState } from 'react';

const AnimateGo = ({ animation, children }) => {
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false); // 紀錄是否已觸發動畫

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 當元素 100% 可見時觸發
        if (entry.intersectionRatio === 1 && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold: 1, // 100% 可見時才觸發
        rootMargin: '100px 0px', // 增加可視範圍的緩衝區
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        ref={elementRef}
        className={hasAnimated ? `animate__animated ${animation}` : ''}
      // style={{ opacity: hasAnimated ? 1 : 0, transition: 'opacity 0.5s' }}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimateGo;