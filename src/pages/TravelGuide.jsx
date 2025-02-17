import '../scss/all.scss';
export default function TravelGuide(){
    return(
        <div className="guide">
            <div className="header-height header-bg d-flex justify-content-center align-items-center">
                <h3 className="text-white header-title">
                    帶您探索全球，<br className="d-block d-lg-none"/>最新旅途知識一手掌握
                </h3>
            </div>
            <div className="container position-relative">
                <select class="form-select position-absolute translate-middle top-0 border-primary-500" aria-label="select">
                    <option selected>挑選您的旅途</option>
                    <option value="1">亞洲</option>
                    <option value="2">歐洲</option>
                    <option value="3">中東</option>
                </select>
                <div className="row py-8 pt-lg-25 pb-lg-20">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card border-0">
                            <img className="card-img-top card-radius card-img-height" alt="cardImg"
                                src="https://s3-alpha-sig.figma.com/img/10a0/b3d4/3a1166c34e27dad74f977cd5f6a7e5c0?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qsaiC5DOBOQSkwp482tR-miF3JYrSSqEtai7IqF8VHCVCGn9PaCAauCieeA4RAyMVsqqMSa8tgRVJSxkuIFqU1Fg6b~RdRR~t1z0XVixvH4dSV2FarA60XCw7RN~8xcX7YnGInU6yWeBVeM~q8tTPKRs1~IOLN3Us~c3Nh3-ls4kO6gdUzcqN7jie8TbVhunsUg1lhprFNpJUMbWU7V9sm7jkIK-fT8Lv8gJIlN7emghxxvd~v~YKkVorsYuoPOoyibMhuBI44f7bHzLvfpnM8BFEupvWhmuBAjanHhwbHGDgDmGOcylPE4Mq2acVWGgJntFslJ5cB0sXHF0rJ1WAg__"
                            />
                            <div className="card-body card-body-mt p-0 mt-5 mb-2 mt-lg-4">
                                <h3 className="card-title">【東京夢幻遊】<br />&nbsp;&nbsp;&nbsp;迪士尼樂園與海洋樂園</h3>
                                <hr className="border-primary-200 w-100 d-lg-none mb-2 "/>
                                <p className="card-text">
                                    探索東京迪士尼的雙園魅力！經典遊樂設施，再搭配全新景點與夜間煙火秀，適合全家大小共度的夢幻旅程。
                                </p>
                                <a className="stretched-link" href="#"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}