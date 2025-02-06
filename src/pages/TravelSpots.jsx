import productPageBanner from "../assets/productPageBanner.svg";

export default function TravelSpots() {
  return (
    <>
      {/* <div>
        <img
          className=""
          style={{ width: "100%" }}
          src={productPageBanner}
          alt=""
        />
      </div> */}
      {/* banner */}
      <div
        className="travelSpotsBanner"
        style={{
          backgroundImage: `url(${productPageBanner})`,
        }}
      >
        <div className="travelSpotsBannerBackDrop"></div>
        <h2 className="notoSerifTC  text-white travelSpotsBannerText">
          精選旅遊行程，開啟你的夢想旅途
        </h2>
      </div>

      <section>
        <div className="container ">
          {/* 切換國家地區 */}
          <div className="row ">
            <div className="col-lg-8 col-md-10  mx-auto position-relative">
              <ul className="list-unstyled mb-0 travelSpotsSelectWrap p-1">
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton bg-primary-500 text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                  >
                    全部
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                  >
                    亞洲
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                  >
                    歐洲
                  </a>
                </li>
                <li className="travelSpotsSelectbuttonWrap">
                  <a
                    className="text-white fw-bold  travelSpotsSelectbutton  text-nowrap py-xl-4 py-md-3 py-2"
                    href=""
                  >
                    中東
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
