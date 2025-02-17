import DepartureTimeDecoration from "./DepartureTimeDecoration";

function FeaturedCard({ featuredItem, index }) {
  return (
    <div
      className={`col ${
        index % 2 === 0 ? "mt-lg-16 mt-0 mb-lg-0 mb-6" : "mb-lg-16 mb-6"
      }`}
    >
      <a href="">
        <div className="d-flex flex-lg-row flex-column px-xxl-6 px-xl-4 px-lg-2 px-0 ">
          {/* 左邊圖片區域 */}
          <div className="me-lg-8 me-0  featuredLeftFlex ">
            <div className="featuredImgWrap overflow-hidden position-relative">
              <img
                className="featuredImg"
                src={featuredItem.imageUrl}
                alt={featuredItem.title}
              />
              <DepartureTimeDecoration featuredItem={featuredItem} />
            </div>
          </div>

          {/* 右邊文字區域 */}
          <div className="pt-xl-lg-6 pb-xl-6 pt-lg-3 pb-lg-3 pt-5 d-flex flex-column featuredRightFlex">
            <h3
              style={{ whiteSpace: "pre-line" }}
              className="featuredCardTitle text-neutral-black title-family"
            >
              {featuredItem.title}
            </h3>
            <hr className="text-primary-200 opacity-100 my-xl-4 my-lg-3 my-2" />

            {featuredItem.description.split("\n").map((des, index) => {
              return (
                <p
                  key={index}
                  className={`${
                    index === 0 ? "mb-xl-3 mb-2" : ""
                  } text-neutral-300 featuredCardDescription`}
                >
                  {des}
                </p>
              );
            })}

            <div className="mt-lg-auto mt-2">
              <p
                className="text-decoration-line-through text-neutral-200"
                style={{ fontSize: "14px" }}
              >
                原價 NT{featuredItem.origin_price.toLocaleString()}
              </p>
              <p
                style={{ lineHeight: "1.2" }}
                className="text-secondary-200 featuredDiscountPrice fw-bold"
              >
                優惠價 NT{featuredItem.price.toLocaleString()}/
                {featuredItem.unit}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default FeaturedCard;
