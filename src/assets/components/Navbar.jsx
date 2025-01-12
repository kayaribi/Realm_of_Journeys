import { Link } from 'react-router-dom'

export default function Navbar(){
  return (<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link className="nav-link" to='/'>行旅之境</Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to='/about'>關於我們</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/travelspots'>旅遊景點</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/travelguide'>攻略指南</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>)
}