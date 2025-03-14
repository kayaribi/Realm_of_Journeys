import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="text-center mt-md-14 mt-18">
      <img
        src="images/icon/cart.svg"
        style={{ width: "100%", maxWidth: "185px" }}
        alt="Cart"
      />
      <h3 className="fs-md-5 fs-7 text-neutral-100 title-family my-6">
        您的購物車是空的
      </h3>
      <Link
        to="/travelSpots"
        className="btn btn-secondary-200 fs-md-7 fs-9 px-15"
      >
        去逛逛
      </Link>
    </div>
  );
};

export default EmptyCart;
