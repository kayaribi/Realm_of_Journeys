import { useEffect, useState, useContext } from "react";
import { CartContext } from "../store/store";

export default function FloatingButton() {
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const { cartList } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer"); // 確保你的 `footer` 是 `<footer>` 標籤
      const button = document.querySelector("#floatingButton");

      if (footer && button) {
        const footerTop = footer.offsetTop;
        const buttonHeight = button.offsetHeight;
        const windowBottom = window.scrollY + window.innerHeight;

        // 當視窗底部超過 footerTop - buttonHeight 時，固定在 footer 上方
        if (windowBottom >= footerTop) {
          setIsAboveFooter(true);
        } else {
          setIsAboveFooter(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="floatingButton"
      className={`d-md-none z-3 ${isAboveFooter ? "above-footer" : "fixed-bottom"}`}
    >
      <button
        className="btn btn-primary-50 w-100 rounded-0 border-top border-primary-300 py-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseDetails"
        aria-expanded="false"
        aria-controls="collapseDetails"
      >
        <div className="d-flex justify-content-between align-items-center py-4">
          <h3 className="title-family">訂單明細</h3>
          <div className="d-flex justify-content-center align-items-center">
            <small className="text-neutral-200 fs-12 me-1">展開明細</small>
            <img src="images/icon/minimize_16px.svg" alt="minimize" />
          </div>
        </div>
        <div className="collapse text-start mb-4" id="collapseDetails">
          {cartList.map((item) => {
            return (
              <div className="mb-4" key={item.id}>
                <p className="mb-3">{item.product.title}</p>
                <div className="d-flex justify-content-between align-items-center text-neutral-300">
                  <div className="d-flex justify-content-center align-items-center">
                    <img src="images/icon/price.svg" alt="price" />
                    <p>{item.total.toLocaleString()}</p>
                  </div>
                  <p>{item.qty}人</p>
                </div>
              </div>
            );
          })}
          <div className="border-top mb-4 border-primary-200"></div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items.center">
              <img
                src="images/icon/alert-circle_16px.svg"
                alt="alert-circle"
                className="me-1"
              />
              <p>提醒</p>
            </div>
            <h5 className="text-primary-600">
              總計<span className="ms-3"></span>NT {cartList
                .reduce((sum, cartItem) => sum + cartItem.total, 0)
                .toLocaleString()}
            </h5>
          </div>
        </div>
      </button>


    </div>
  );
};