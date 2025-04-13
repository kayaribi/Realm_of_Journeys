import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";


export default function CartRemoveModal({ closeRemoveModal, onConfirm, modalType }) {

  // const {
  //   removeCart,
  //   removeCartItem,
  // } = useContext(CartContext);
  const getMessage = () => {
    if (modalType === "all") {
      return "是否確定要清空購物車？";
    }
    return "是否確定要刪除此商品？";
  };
  return (<>
    <div className="modal fade cartOrderModal" id="removeModal" tabIndex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <button type="button" className="btn btn-close position-absolute end-0 p-4 border-0" style={{ fontSize: "12px" }}
            onClick={closeRemoveModal}></button>
          <div className="modal-body p-md-20 py-20 px-5">
            <p className="mb-15 text-center">是否確定刪除</p>
            <div className="d-flex">

              <button to="/cart" className="btn btn-outline-secondary-200 fs-9 fs-md-7 px-3 w-50 me-3"
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
