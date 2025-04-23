import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function TravelGuide() {
  const [articlesData, setArticlesData] = useState([]);
  const [selectArea, setSelectArea] = useState("");
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  // ============================================================================== 取得文章data
  useEffect(() => {
    const getArticles = async () => {
      setIsScreenLoading(true);
      try {
        // 第1頁
        const responsePage1 = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/articles?page=1`);
        // 第2頁
        const responsePage2 = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/articles?page=2`);
        // 合併兩頁
        const allArticles = [...responsePage1.data.articles, ...responsePage2.data.articles];
        setArticlesData(allArticles);
      } catch (error) {
        console.error("取得文章失敗", error);
        Swal.fire({
          title: "取得文章失敗",
          text: "請稍後再試！",
          icon: "error",
        });
      } finally {
        setIsScreenLoading(false);
      }
    }
    getArticles()
  }, []);
  // ============================================================================== 下拉選單-值
  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelectArea(e.target.dataset.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const filteredData = selectArea ? articlesData.filter((item) => item.area === selectArea) : articlesData;

  return (<>
    <div className="travelGuide">
      <header className="header-height header-bg position-relative">
        <div className="header-mask"></div>
        <div className="container d-flex align-items-center justify-content-start justify-content-lg-center h-100">
          <h3 className="header-title text-white fs-lg-4 title-family">
            帶您探索全球，<br className="d-block d-lg-none" />最新旅途知識一手掌握
          </h3>
        </div>
      </header>
      <div className="container position-relative">
        {/* Tab */}
        <section className="row travelGuideSelectWrapPosition">
          <div className="col-lg-8 col-md-10  mx-auto">
            <ul className="list-unstyled mb-0 travelGuideSelectWrap d-flex align-items-center justify-content-center p-1">
              <li className="travelGuideSelectbuttonWrap">
                <a
                  className={`filterTagRefs text-white fw-bold travelGuideSelectbutton text-nowrap py-xl-4 py-md-3 py-2 ${selectArea === '' ? 'active' : ''}`}
                  href="#"
                  data-value=""
                  onClick={(e)=>{handleSelectChange(e)}}
                >
                  全部
                </a>
              </li>
              <li className="travelGuideSelectbuttonWrap">
                <a
                  className={`filterTagRefs text-white fw-bold travelGuideSelectbutton text-nowrap py-xl-4 py-md-3 py-2 ${selectArea === '亞洲' ? 'active' : ''}`}
                  href="#"
                  data-value="亞洲"
                  onClick={(e)=>{handleSelectChange(e)}}
                >
                  亞洲
                </a>
              </li>
              <li className="travelGuideSelectbuttonWrap">
                <a
                  className={`filterTagRefs text-white fw-bold travelGuideSelectbutton text-nowrap py-xl-4 py-md-3 py-2 ${selectArea === '歐洲' ? 'active' : ''}`}
                  href="#"
                  data-value="歐洲"
                  onClick={(e)=>{handleSelectChange(e)}}
                >
                  歐洲
                </a>
              </li>
              <li className="travelGuideSelectbuttonWrap">
                <a
                  className={`filterTagRefs text-white fw-bold travelGuideSelectbutton text-nowrap py-xl-4 py-md-3 py-2 ${selectArea === '中東' ? 'active' : ''}`}
                  href="#"
                  data-value="中東"
                  onClick={(e)=>{handleSelectChange(e)}}
                >
                  中東
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div className="row py-8 pt-lg-25 pb-lg-20">
          {filteredData.map((item) => {
            return (
              <div className="col-md-6 col-lg-4 mb-lg-6 mb-8" key={item.id}>
                <div className="card border-0">
                  <Link className="image-container" to={item.id}>
                    <img className="image-main" alt="cardImg" src={item.image} />
                  </Link>
                  <Link to={item.id}>
                    <div className="card-body card-body-mt p-0 mt-5 mt-lg-4">
                      <h3 className="title-family fs-sm-6 fs-xl-5 text-neutral-black mb-2">【{item.title}】<br />&nbsp;&nbsp;&nbsp;{item.name}</h3>
                      <hr className="border-primary-200 w-100 d-lg-none mb-2 mt-0" />
                      <p className="fs-10 fs-lg-9 text-neutral-300 card-text">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    {isScreenLoading && (
      <div className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 999,
        }}>
        <ReactLoading type="spokes" color="black" width="4rem" height="4rem" />
      </div>)
    }
  </>)
}