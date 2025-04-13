import { useEffect, useState } from "react";
import PropTypes from "prop-types";


const CartItem = ({ cartItem, updateQuantity, onRemove }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 992);
  }, []);

  return isDesktop ? (
    <div className="col-12" key={cartItem.id}>
      <div className="row align-items-center flex-column flex-lg-row text-center text-lg-start">
        <div className="col text-center">
          <img
            src={cartItem.product.imageUrl}
            className="cartImg"
            alt={cartItem.product.title}
          />
        </div>
        <div className="col">
          <p
            className="w-100 my-5 my-lg-0 fw-bold"
            style={{ whiteSpace: "pre-line" }}
          >
            {cartItem.product.title}
          </p>
        </div>
        <div className="col mb-5 mb-lg-0">
          <p className="w-100">
            出發日期 2025/
            {cartItem.product.travelDate.split(" - ")[0]}
          </p>
        </div>
        <div className="col">
          <div className="d-flex justify-content-lg-between justify-content-center align-items-center px-2">
            <button
              type="button"
              className="btn btn-primary-200 d-flex justify-content-center align-items-center adjustmentNumBtn"
              disabled={cartItem.qty === 1}
              onClick={() => updateQuantity(cartItem.id, cartItem.qty - 1)}
            >
              <i className="bi bi-dash" />
            </button>
            <p className="mx-4 fs-lg-9 fs-10">{cartItem.qty}</p>
            <button
              type="button"
              className="btn btn-primary-200 d-flex justify-content-center align-items-center adjustmentNumBtn"
              disabled={cartItem.qty >= 10}
              onClick={() => updateQuantity(cartItem.id, cartItem.qty + 1)}
            >
              <i className="bi bi-plus" />
            </button>
          </div>
        </div>
        <div className="col">
          <h4 className="fs-lg-6 fs-8 text-primary-500 text-nowrap text-end">
            NT$ {cartItem.total.toLocaleString()}
          </h4>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-sm ms-auto d-lg-block d-none"
            onClick={onRemove}
          >
            <i className="bi bi-trash3 fs-7"></i>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="col-md-11" key={cartItem.id}>
      <div className="d-lg-flex justify-content-center align-items-center text-lg-start text-center">
        <img
          src={cartItem.product.imageUrl}
          alt={cartItem.product.title}
          className="me-lg-6 my-3 my-lg-0 cartImg"
        />
        <p
          className="w-100 my-5 my-lg-0 fw-bold"
          style={{ whiteSpace: "pre-line" }}
        >
          {cartItem.product.title}
        </p>
        <p className="w-100">
          出發日期 2025/
          {cartItem.product.travelDate.split(" - ")[0]}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-7 mt-lg-0">
          <div className="d-flex justify-content-lg-between justify-content-center align-items-center px-2">
            <button
              type="button"
              className="btn btn-primary-200 adjustmentNumBtn  d-flex justify-content-center align-items-center"
              disabled={cartItem.qty === 1}
              onClick={() => updateQuantity(cartItem.id, cartItem.qty - 1)}
            >
              -
            </button>
            <p className="mx-md-11 mx-4 fs-lg-9 fs-10">{cartItem.qty}</p>
            <button
              type="button"
              className="btn btn-primary-200 adjustmentNumBtn  d-flex justify-content-center align-items-center"
              disabled={cartItem.qty >= 10}
              onClick={() => updateQuantity(cartItem.id, cartItem.qty + 1)}
            >
              +
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <h4 className="fs-lg-6 fs-8 text-primary-500 mx-lg-8 text-nowrap">
              NT$ {cartItem.total.toLocaleString()}
            </h4>
            <button
              type="button"
              className="btn btn-sm ms-5 d-lg-none"
               onClick={onRemove}
            >
              <i className="bi bi-trash3 fs-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    qty: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    product: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      travelDate: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  // removeCartItem: PropTypes.func.isRequired,
};

export default CartItem;
