import featuredImgIcon from "../calendar.svg";

export default function DepartureTimeDecoration({ featuredItem }) {
  return (
    <div className="bg-primary-500 d-flex align-items-center position-absolute bottom-0 end-0 py-1 px-3">
      <img src={featuredImgIcon} alt="日曆icon" />
      <p style={{ marginLeft: "10px" }} className="text-white fs-lg-2 fs-4">
        {featuredItem.travelDate}
      </p>
    </div>
  );
}
