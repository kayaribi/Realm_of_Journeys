import featuredImgIcon from "../../public/images/icon/calendar.svg";

export default function DepartureTimeDecoration({ featuredItem }) {
  return (
    <div className="bg-primary-500 d-flex align-items-center position-absolute bottom-0 end-0 py-1 px-3">
      <img src={featuredImgIcon} alt="日曆icon" />
      <p style={{ marginLeft: "10px" }} className="text-white fs-lg-9 fs-11">
        {featuredItem.travelDate}
      </p>
    </div>
  );
}
