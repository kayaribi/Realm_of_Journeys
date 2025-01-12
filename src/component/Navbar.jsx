import { NavLink } from "react-router-dom"
export default function Navbar(){
    const linkActiveColor = ({isActive})=>{
        return `nav-link ${isActive?"text-danger":""}`
    }
    return(
        <>
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-primary-600" to="/"><h2>行旅之境</h2></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={linkActiveColor} to="/about">關於我們</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkActiveColor} to="/touristSpots">旅遊景點</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkActiveColor} to="/guide">攻略指南</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkActiveColor} to="/cart"><button>購物車icon</button></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkActiveColor} to="/account"><button type="button" className="btn btn-primary-600">登入註冊</button></NavLink>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
            
        </>
    )
}