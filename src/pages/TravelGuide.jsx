import { useEffect, useState } from 'react';
import '../scss/all.scss';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH  = import.meta.env.VITE_API_PATH;


export default function TravelGuide(){
    const [articlesData,setArticlesData]=useState([]);
    const [selectArea, setSelectArea] = useState("");
    const [isScreenLoading,setIsScreenLoading] = useState(false);
    
    // ============================================================================== 取得文章data
    useEffect(()=>{
        const getArticles = async()=>{
            setIsScreenLoading(true);
            try{
                // 第1頁
                const responsePage1 = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/articles?page=1`);
                // 第2頁
                const responsePage2 = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/articles?page=2`);
                // 合併兩頁
                const allArticles = [...responsePage1.data.articles, ...responsePage2.data.articles];
                setArticlesData(allArticles);
            }catch(error){
                alert("取得文章失敗");
            }finally{
                setIsScreenLoading(false);
            }
        }
        getArticles()
    },[]);

    // ============================================================================== 下拉選單-值
    const handleSelectChange = (e) => {
        setSelectArea(e.target.value);
    };
    const filteredData = selectArea ? articlesData.filter((item) => item.area === selectArea)  :  articlesData ;

    return(<>
        <div className="travelGuide">
            <header className="header-height header-bg d-flex justify-content-center align-items-center" id="header">
                <h3 className="text-white fs-lg-4">
                    帶您探索全球，<br className="d-block d-lg-none"/>最新旅途知識一手掌握
                </h3>
            </header>
            <div className="container position-relative">
                <select className="form-select position-absolute translate-middle top-0 border-primary-500" aria-label="select"
                        onChange={handleSelectChange}>
                    <option value="">挑選您的旅途</option>
                    <option value="亞洲">亞洲</option>
                    <option value="歐洲">歐洲</option>
                    <option value="中東">中東</option>
                </select>
                <div className="row py-8 pt-lg-25 pb-lg-20">
                    {filteredData.map((item)=>{
                        return (
                            <div className="col-12 col-md-6 col-lg-4 mb-lg-6 mb-8" key={item.id}>
                                <div className="card border-0">
                                    <Link className="image-container" to={item.id}>
                                        <img className="image-main" alt="cardImg" src={item.image}/>
                                    </Link>
                                    <Link to={item.id}>
                                        <div className="card-body card-body-mt p-0 mt-5 mt-lg-4">
                                            <h3 className="fs-sm-6 fs-xl-5 text-neutral-black mb-2">【{item.title}】<br/>&nbsp;&nbsp;&nbsp;{item.name}</h3>
                                            <hr className="border-primary-200 w-100 d-lg-none mb-2 mt-0"/>
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