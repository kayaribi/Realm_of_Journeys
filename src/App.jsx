import { Route, Routes } from 'react-router-dom';
// 匯入頁面(pages>index.jsx做匯入喔)
import {Home,About,Cart,Account,TravelGuide,TravelSpots,TravelSpotsItem,TravelGuideItem} from './pages';
// 匯入元件(去components>index.jsx做匯入喔)
import { BackTopBtn, Footer, Navbar } from './components';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './scss/all.scss';

function App() {
  return (
    <div>
      <Navbar />
        <Routes>

          <Route path='/' element={<Home />}></Route>                    {/* 首頁 */}
          <Route path='/about' element={<About/>}></Route>               {/* 關於我們 */}
          <Route path='/travelSpots' element={<TravelSpots />}/>     {/* 旅遊景點-商品列表 */}
          <Route path="/travelSpots/:id" element={<TravelSpotsItem />} />         {/* ---各別單一商品-呈現 */}
          <Route path='/travelGuide' element={<TravelGuide/>} />                {/* 攻略指南 */}ㄎ
          <Route path="/travelGuide/:id" element={<TravelGuideItem />} />   
          <Route path='/cart' element={<Cart/>}></Route>                 {/* 購物車 */}
          <Route path='/account' element={<Account/>}></Route>           {/* 登入註冊 */}

        </Routes>
        <BackTopBtn />
      <Footer/>
    </div>
  )
}

export default App

