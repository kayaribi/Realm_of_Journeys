import { NavLink } from "react-router-dom"
import "../assets/all.scss"
import { useState } from "react"
export default function Navbar(){
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const linkActiveColor = ({isActive})=>{
        return `nav-link ${isActive?"text-danger fw-bold":""}`
    }
    const handleNavbarToggle = () => {
        setIsNavbarOpen(prevState => !prevState);
    };

    return(<>
        <nav className={`navbar navbar-expand-lg navbar-light navbarPadding ${isNavbarOpen ? "bg-primary-50" : ""}`} >
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* logo + 標題 */}
                <div className="d-flex align-items-center">
                    <NavLink className="navbar-brand" to="/">
                        <img className="d-none d-lg-block" src="../public/images/logo-dark-L.png" />
                        <img className="d-block d-lg-none" src="../public/images/logo-dark-sm.png" />
                    </NavLink>
                </div>
                <div className="d-flex align-items-center">
                    {/* 購物車icon-sm */}
                    <NavLink className={`d-block d-lg-none me-4 cart-sm-icon ${isNavbarOpen ? "color-3D3D3D " : "text-white"}`} to="/cart">
                        <i className="bi bi-cart cart-sm-icon"></i>
                    </NavLink>
                    {/* 漢堡選單icon */}
                    <button className="navbar-toggler border-0 " type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation"
                            onClick={handleNavbarToggle}>
                            <i className={`hamburg-icon color-3D3D3D  ${isNavbarOpen ? "bi bi-x" : "bi bi-list text-white"}`}></i>
                    </button>
                </div>

                {/* link */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto mt-8 mt-lg-0 d-flex  align-items-center">
                        <li className="nav-item me-lg-8">
                            <NavLink className={linkActiveColor} to="/about">關於我們</NavLink>
                        </li>
                        <li>
                            <div className="nav-item-br"></div>
                        </li>
                        <li className="nav-item me-lg-8">
                            <NavLink className={linkActiveColor} to="/touristSpots">旅遊景點</NavLink>
                        </li>
                        <li>
                            <div className="nav-item-br"></div>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkActiveColor} to="/guide">攻略指南</NavLink>
                        </li>
                        <li className="nav-item d-lg-block d-none cart-lg-icon">
                            <NavLink to="/cart">
                                <i className="bi bi-cart color-3D3D3D lh-0 p-2"></i>
                            </NavLink>
                        </li>
                        <li className="nav-item mt-lg-0 login-btn-margin">
                            <button type="button" className="btn btn-primary-600 login-btn">
                                <NavLink to="/account" className="text-white">登入 / 註冊</NavLink>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>)
}