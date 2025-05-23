export default function CartRemoveModal({ closeRemoveModal, onConfirm }) {
  return (<>
    <div className="modal fade cartOrderModal" id="removeModal" tabIndex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <button type="button" className="btn btn-close position-absolute end-0 p-4 border-0" style={{ fontSize: "12px" }}
            onClick={closeRemoveModal}></button>
          <div className="modal-body p-md-20 py-20 px-5">
            <p className="mb-15 text-center">是否確定刪除</p>
            <div className="d-flex">
              <button className="btn btn-outline-secondary-200 fs-9 fs-md-7 px-3 w-50 me-3"
                onClick={onConfirm}>
                是，我要刪除
              </button>
              <button type="button" className="btn btn-secondary-200 fs-9 fs-md-7 px-3 w-50 ms-3"
                onClick={closeRemoveModal}>
                否，繼續填寫
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
import PropTypes from 'prop-types';
CartRemoveModal.propTypes = {
  closeRemoveModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};