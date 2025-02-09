import { useState, useEffect, useRef } from "react";
import axios from "axios";
import featuredData from "../featuredData";
import featuredTitleIcon from "../../public/images/icon/shiny_48px.svg";
import FeaturedCard from "../components/FeaturedCard";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const images = [
  "https://s3-alpha-sig.figma.com/img/da07/0bdc/23fbaf472b51a76b0f29a09ac69f5e2e?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IuEFadg3GJm2Wys6c-NWu~bWq6djUJbOf9ELDpsQY1qxHmeSEqFjdupC9HuLVf6-IBtdw2ozjHf3cvYa7bZbVVQnb7-o-kurIIZBCFU4eYb7LvJAjH6bKI6~NTHqT-Se7K~Luphd3GEwmimfkmR1Ux-ZdiseHmJggCuobLzewPrbL9pmIxi2Hwlc4rMiED12CYXtIcJRsJ0qv9tNITGI~CqiDnuuAGvQVErhQGa0uIwKJJlvt91oMjbVtDQkNVqqFRraYc0Bh1gtSiteAHRi-i54-kTi78DNvnT5kASbITJjhusU5k8sdbsV21YPXESCimWx7u9J6NIWCRL~2MMJOg__",
  "https://s3-alpha-sig.figma.com/img/23b9/9b97/793b11ba7efc8b527bb81d1d3718c863?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=akCbJQjuTYQxZSsipoNIGLi3VqxLNFLKvzBMIbZUK~Qwx-DzHT1oHK6f8BmLwwG9UhxcQfVcwtR1MFyHRkuglAtOrJ5~DTPAAslfLP8hJ8hO5KCTUguvzDIr0jJvAIMiOFj7nfk1qO6eyXyAMZAZ8d9pSL7LIs0rVKlmoEMC5w3tJFcaur2otMKTahl1LD9kJH836l9z~zIrRIsrRl6ZIUsqd-4G2-cLwET50IvTRnayVQqVfp5sV4R-rNo6ay-3aMiAgNxjTx8R8RxzEQBNNKAtr2P38a24udEJRIrlCIina22OjuMNk-RU3-6MTr0KBhlwkj8Z~AW~QvHqMrZHAg__",
  "https://s3-alpha-sig.figma.com/img/7dbd/05ce/c4be8cefad1162c11e52815f4ff3f23f?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nVCB0rDiBx3L1rOo3CNBHZ-HOKO4slBU6FbxI0~E6L2KsZ98yGVf5iCClb2IdSzs7dB0bIs5-~riaUcsNLrRZXqINF4xMvPqyOT-x-8G~dE3biiIO0f~UVvrIEUGo8tPzSL4vk1GgZN~xOdqMEMlhrbaaR5~oJnmcTEygwH5tEaDnGYwP9N-6MJZcG2Bb5JtLXZNNiGUgMYwQTcjboojJsGNMvgtXydIKRoGUT3iLX5kYLPLQCqB1wmSfJ6Zdsm94Aa~-RSaJBznstyo2UYjK~I8OR4hExhFKgcsErc8C4LrHoFN4GzdlPuLrw4GeF3hTrEOHWfmPDXbEROdI6wJLQ__",
  "https://s3-alpha-sig.figma.com/img/0c48/8594/2a7f649efe94233ccb26aa63af5be89f?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=my5ysLtojaQYkAASogv~paM9xLxxdolTOruDUPYvGkQLNs7t-ld4hiHZqQJDGtndNLV0E3gXI63vuonWCnLU3jYxKD9IGbSslMoMC80uwGHDJZJfbjizkAVHJ6sSPiWnctCSIwfw1zMdw5nrVbL3jsDRNssfqmnyESVXs3zn6T657~dlPd-~uyEMOOhOqwijmGvyvWLrMMt2HqFrmoYf3~xPNZp4~gN9q96SCkmBULZlQkbFracqZ8~LvviIGi7OouhW1l2OnKHTG7kfhpxRdIP-ZhaQN5GnQfBU-l0K0JXTitfok4CARGFs6xH5hq0nZMRj8NOjwQ3tVA58KYFZ5A__",
];

export default function Home() {
  const signIn = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, {
        username: "RealmOfJourneys@gmail.com",
        password: "RealmOfJourneys",
      });

      const { token } = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    signIn();
  }, []);
  return (
    <>
      <header
        className="position-relative"
        style={{
          background: `url('https://s3-alpha-sig.figma.com/img/da07/0bdc/23fbaf472b51a76b0f29a09ac69f5e2e?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IuEFadg3GJm2Wys6c-NWu~bWq6djUJbOf9ELDpsQY1qxHmeSEqFjdupC9HuLVf6-IBtdw2ozjHf3cvYa7bZbVVQnb7-o-kurIIZBCFU4eYb7LvJAjH6bKI6~NTHqT-Se7K~Luphd3GEwmimfkmR1Ux-ZdiseHmJggCuobLzewPrbL9pmIxi2Hwlc4rMiED12CYXtIcJRsJ0qv9tNITGI~CqiDnuuAGvQVErhQGa0uIwKJJlvt91oMjbVtDQkNVqqFRraYc0Bh1gtSiteAHRi-i54-kTi78DNvnT5kASbITJjhusU5k8sdbsV21YPXESCimWx7u9J6NIWCRL~2MMJOg__') no-repeat center`,
          backgroundSize: "cover",
        }}
      >
        {/* 深色遮罩 */}
        <div
          className="position-absolute top-0 end-0 start-0 bottom-0 z-1"
          style={{
            background: "rgba(28, 28, 28, 0.3)",
          }}
        ></div>
        {/* 標題 */}
        <div className="container text-state text-md-center text-white position-relative py-md-xl pb-lg pt-22">
          <h2
            className="fs-md-1 fs-2 title-family position-relative z-2 py-xl-2"
            style={{
              mixBlendMode: "overlay",
            }}
          >
            Realm <br className="d-md-none" />
            of <br className="d-md-none" />
            Journeys
            <h3
              className="fs-5 d-xl-block d-none position-absolute bottom-0 start-50 translate-middle-x"
              style={{
                textShadow: "0 0 10px rgba(23, 70, 117, 1)",
              }}
            >
              探索世界不費心，全包服務伴你行。
            </h3>
          </h2>
          <h3
            className="fs-md-5 fs-8 position-relative z-2 d-xl-none d-block mt-8"
            style={{
              textShadow: "0 0 10px rgba(23, 70, 117, 1)",
            }}
          >
            探索世界不費心，全包服務伴你行。
          </h3>
          {/* 按鈕 - Desktop */}
          <a href="" className="text-white d-none d-md-block">
            <div
              className="gradient-brown position-absolute z-2 end-0 bottom-0 text-center buttonShadowDesktop"
              style={{
                width: "320px",
                height: "160px",
                borderRadius: "320px 320px 0 0",
              }}
            >
              <p
                className="mb-2 fs-10"
                style={{
                  marginTop: "67px",
                }}
              >
                省時省力，輕鬆出發！
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <h5 className="my-2 me-2 fs-7">尋找行程</h5>
                <img src="../public/right-arrow.svg" alt="尋找行程" />
              </div>
            </div>
          </a>
          {/* 按鈕 - Mobile */}
          <a href="" className="text-white d-md-none d-block">
            <div
              className="gradient-brown position-absolute z-2 end-0 bottom-0 text-center mb-6 me-6 buttonShadow"
              style={{
                width: "116px",
                height: "116px",
                borderRadius: "50%",
              }}
            >
              <p className="mt-4 mb-2 fs-11">
                省時省力，
                <br />
                輕鬆出發！
              </p>
              <h5 className="fs-9">尋找行程</h5>
              <img src="../public/right-arrow.svg" alt="尋找行程" />
            </div>
          </a>
        </div>
      </header>
      <section className="bg-primary-50">
        <div className="container text-center py-15 py-md-20">
          <h3 className="fs-8 fs-md-5 mb-12 mb-md-10 text-primary-600 title-family">
            選擇我們的好處⋯⋯
          </h3>
          <div className="row">
            <div className="col-lg-4">
              <img src="../public/Vector.svg" alt="全包服務，無憂旅程" />
              <h4 className="my-3 my-md-5 gradient-blue fs-8 fs-md-6">
                全包服務，無憂旅程
              </h4>
              <p className="px-6 fs-10 fs-md-9">
                我們提供一站式的全包行程，涵蓋機票、住宿、交通、景點門票等所有細節，讓您省去繁瑣的規劃，輕鬆享受每一刻旅程。
              </p>
            </div>
            <div className="col-lg-4 my-lg-0 my-10">
              <img src="../public/Vector-1.svg" alt="精選小團體，靈活自由" />
              <h4 className="my-3 my-md-5 gradient-blue fs-8 fs-md-6">
                精選小團體，靈活自由
              </h4>
              <p className="px-6 fs-10 fs-md-9">
                我們的行程設計避免了大團體的擁擠與不便，提供更高的自由度和更精緻的體驗，讓每次旅行都能夠更加個性化。
              </p>
            </div>
            <div className="col-lg-4">
              <img src="../public/Vector-2.svg" alt="快速預定，隨時出發" />
              <h4 className="my-3 my-md-5 gradient-blue fs-8 fs-md-6">
                快速預定，隨時出發
              </h4>
              <p className="px-6 fs-10 fs-md-9">
                網站操作簡單直觀，無論規劃還是預訂，都能快速完成。讓您隨時輕鬆進入下一段旅行，無需浪費時間等待。
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*  --------------------- 精選行程 ------------------------------------- */}
      {/* 精選行程 - 倫倫 */}
      <section className="bg-white">
        <div className="container pt-lg-20 pb-lg-20 pt-15 pb-9 ">
          <div className="d-flex align-items-center mb-lg-5 mb-8">
            <div className="featuredTitleIcon">
              <img
                style={{ width: "100%", height: "100%" }}
                src={featuredTitleIcon}
                alt="精選行程標題icon"
              />
            </div>

            <h2 className="text-primary-600 fs-sm-3 fs-6 ms-sm-4 ms-2 title-family">
              精選行程
            </h2>
          </div>
          <div className="row row-cols-lg-2 row-cols-1">
            {featuredData.map((item, index) => (
              <FeaturedCard key={item.id} featuredItem={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
