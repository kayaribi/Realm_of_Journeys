import { useEffect, useState } from 'react';
import '../scss/all.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH  = import.meta.env.VITE_API_PATH;

export default function TravelGuideItem(){
    const {id} = useParams();
    const [travelGuideItemData,setTravelGuideItemData]=useState(null);
    const [isScreenLoading,setIsScreenLoading] = useState(false);
    useEffect(()=>{
        const getTravelGuideItemData = async()=>{
            setIsScreenLoading(true);
            try{
                const respone = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/article/${id}`);
                setTravelGuideItemData(respone.data.article);
            }catch(error){
                alert("取得單一產品失敗");
            }finally{
                setIsScreenLoading(false);
            }
        }
        getTravelGuideItemData();
    },[])

    return(<>
    {travelGuideItemData && (

        <div className="travelGuideItem">
            <div className="header-height d-flex justify-content-center"style={{
                backgroundImage: `url(${travelGuideItemData.image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover"}}></div>
            <div className="travelGuideItem-main container bg-white shadow-lg">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="py-8 pt-lg-12 pb-lg-27">
                            <h3 className="fs-8 fs-lg-5 mb-3 mb-lg-7">【{travelGuideItemData.title}】</h3>
                            <p className="fs-10 fs-lg-7 mb-4 mb-lg-6">
                                {travelGuideItemData.content}
                            </p>
                            <img className="travelGuideItem-img-height object-img mb-4 mb-lg-15 w-100" src={travelGuideItemData.images}/>
                            <h3 className="mb-4 fs-8 fs-lg-5">必去景點</h3>
                            <hr className="travelGuideItem-hr"/>
                            <ul className="list-unstyled d-grid gap-4 mb-8 mb-lg-15">
                                {travelGuideItemData.attractions.map((item)=>{
                                    return(
                                        <li key={item.title}>
                                            <h5 className="text-primary-600 fs-9 fs-lg-7 mb-2">{item.title}</h5>
                                            <p className="text-neutral-300 fs-10 fs-lg-9">{item.content}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <h3 className="mb-3 fs-8 fs-lg-5">購物推薦</h3>
                            <hr className="travelGuideItem-hr"/>
                            <ul className="list-unstyled d-grid gap-4 mb-8 mb-lg-15">
                                {travelGuideItemData.shopping.map((item)=>{
                                    return(
                                        <li key={item.title}>
                                            <h5 className="text-primary-600 fs-9 fs-lg-7 mb-2">{item.title}</h5>
                                            <p className="text-neutral-300 fs-10 fs-lg-9">{item.content}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="border border-primary-500 radius-24px mb-8 mb-lg-15 py-8 py-lg-10 px-3 px-lg-8 bg-primary-50">
                                <h3 className="fs-8 fs-lg-5 mb-3 mb-lg-6">遊玩小貼士</h3>
                                <ul className="mb-0">
                                    {travelGuideItemData.things.map((item,index)=>{
                                        return(
                                            <li className="fs-10 fs-lg-9" key={index}>{item}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="d-flex justify-content-center gap-3">
                                <button type="button" className="btn btn-outline-secondary-200 fs-lg-7 flex-nowrap  text-truncate btn-padding">
                                    上一篇｜【京都自由行】清水寺與嵐山祇園一日
                                </button>
                                <button type="button" className="btn btn-secondary-200 fs-lg-7 flex-nowrap text-truncate btn-padding">
                                    下一篇｜【京都自由行】清水寺與嵐山祇園一日
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
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