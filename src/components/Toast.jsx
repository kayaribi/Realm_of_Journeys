import { useContext } from 'react';
import { CartContext } from '../store/store';

const Toast = () => {
  const { toastMessage } = useContext(CartContext); // 從 CartContext 獲取 toastMessage

  if (!toastMessage.text) return null; // 如果沒有訊息，則不顯示

  return (
    <div className='toast-container position-fixed' style={{ top: '100px', right: '15px' }}>
      <div
        className={`toast show`}
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
      >
        <div className={`toast-header text-white bg-${toastMessage.type}`}>
          <strong className='me-auto'>
            {toastMessage.type === 'success' ? '成功' : '失敗'}
          </strong>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='toast'
            aria-label='Close'
          />
        </div>
        <div className='toast-body'>
          {toastMessage.text}
        </div>
      </div>
    </div>
  );
};

export default Toast;
