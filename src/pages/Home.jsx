import { useState, useEffect, useRef } from "react";
import axios from "axios";
import featuredData from "../featuredData";
import featuredTitleIcon from "../../public/images/icon/shiny_48px.svg";
import FeaturedCard from "../components/FeaturedCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

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
