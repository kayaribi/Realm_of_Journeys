function FeaturedCard({ featuredItem, index, featuredImgIcon }) {
  return (
    <div className={`col ${index % 2 === 0 ? "mt-16" : "mb-16"}`}>
      <div className="d-flex px-6 h-100">
        <div className="me-8 position-relative">
          <img className="featuredImg" src={featuredItem.imageUrl} alt="" />
          <div className="bg-primary-500 d-flex align-items-center position-absolute bottom-0 end-0 py-1 px-3">
            <img src={featuredImgIcon} alt="" />
            <p style={{ marginLeft: "10px" }} className="mb-0 text-white">
              {featuredItem.travelDate}
            </p>
          </div>
        </div>

        <div className="py-6 d-flex flex-column">
          <h3 style={{ whiteSpace: "pre-line" }} className="fs-8">
            {featuredItem.title}
          </h3>
          <hr className="text-primary-200 opacity-100" />
          <p
            className="mb-0 text-neutral-300"
            style={{ whiteSpace: "pre-line" }}
          >
            {featuredItem.description}
          </p>

          <div className="mt-auto">
            <p
              className="mb-0 text-decoration-line-through text-neutral-200"
              style={{ fontSize: "14px" }}
            >
              原價 NT{featuredItem.origin_price}
            </p>
            <p
              style={{ lineHeight: "1.2" }}
              className="mb-0 text-secondary-200 fs-6"
            >
              優惠價 NT{featuredItem.price}/{featuredItem.unit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCard;
