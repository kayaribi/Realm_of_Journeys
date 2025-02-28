import { NavLink } from 'react-router-dom';
import '../scss/all.scss';

export default function Footer() {

    const linkActiveColor = ({ isActive }) => {
        return `${isActive ? "text-danger" : ""}`
    }

    return (<>
        <footer className="footer bg-primary-600">
            <div className="container py-10">
                <div className="d-flex justify-content-center flex-column flex-lg-row justify-content-lg-center align-items-center mb-8">
                    {/* logo + title */}
                    <div className="d-flex align-items-center mb-14 my-lg-4 me-xl-15 me-lg-10">
                        <img src="images/logo-light-L.svg" />
                    </div>
                    {/* link page */}
                    <ul className="list-unstyled d-flex flex-column align-items-center flex-lg-row gap-6 mb-15 mb-lg-0 text-20px">
                        <li>
                            <NavLink className="text-white link-warning" to="/">首頁</NavLink>
                        </li>
                        <li>
                            <NavLink className="text-white link-warning" to="/travelSpots">旅遊景點</NavLink>
                        </li>
                        <li>
                            <NavLink className="text-white link-warning" to="/travelGuide">旅遊攻略</NavLink>
                        </li>
                        <li>
                            <NavLink className="text-white link-warning" to="/about">關於我們</NavLink>
                        </li>
                    </ul>
                    {/* 社群連結 */}
                    <ul className="list-unstyled d-flex gap-6 mb-14 mb-lg-0 ms-lg-auto me-lg-14">
                        <li>
                            <a href="https://github.com/kayaribi/Realm_of_Journeys">
                                <i className="bi bi-facebook text-white link-warning community-link"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/kayaribi/Realm_of_Journeys">
                                <i className="bi bi-instagram text-white link-warning community-link"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/kayaribi/Realm_of_Journeys">
                                <i className="bi bi-line text-white link-warning community-link"></i>
                            </a>
                        </li>
                    </ul>
                    {/* 管理員登入 */}
                    <a href="https://github.com/kayaribi/Realm_of_Journeys" className="text-white link-warning px-4 py-3 mb-8 mb-lg-0">
                        管理員登入<i className="bi bi-box-arrow-in-right ms-2"></i>
                    </a>
                </div>
                <hr className="footer-hr mb-8" />
                <div className="footer-text d-flex flex-column flex-lg-row align-items-start justify-content-lg-center">
                    <p className="mb-2 mb-lg-0">行旅之境 ©2024 Copyrights All Reserved</p>
                    <p className="mb-0 ms-lg-auto">本專題為面試作品使用，無商業行為，圖片來源請見GitHub Repo</p>
                </div>
            </div>
        </footer>
    </>)
}