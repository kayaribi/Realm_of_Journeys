import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AnimateGo = ({ animation, children }) => {
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false); // 紀錄是否已觸發動畫

  useEffect(() => {
    const target = elementRef.current; // ✅ 儲存當前的 DOM 節點

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1 && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold: 1,
        rootMargin: '100px 0px',
      }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target); // ✅ 用儲存的 target
      }
    };
  }, [hasAnimated]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        ref={elementRef}
        className={hasAnimated ? `animate__animated ${animation}` : ''}
      >
        {children}
      </div>
    </div>
  );
};

AnimateGo.propTypes = {
  animation: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AnimateGo;