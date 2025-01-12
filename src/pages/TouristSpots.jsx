import { Outlet ,Link} from 'react-router-dom';
export default function TouristSpots(){
    return(
        <div className="container">
            <div className="row">
                {/* 商品-nav */}
                <div className="col-lg-8 mx-auto">
                    商品list
                </div>
                {/* 下方-商品列表 */}
                <div className="col-12">
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}