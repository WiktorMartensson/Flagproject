import { Outlet, NavLink } from 'react-router-dom'
import arrowdark from "../assets/arrowdark.svg";
import './topbar.css'

export default function Topbar() {
    return(
        <div className="top-container">
        <div className="searchbar-container">
          <input
            className="searchbar"
            type="text"
            placeholder="Search for a country..."
          />
        </div>
        <div className="dropdown">
          <button className="drop-menu">
            Filter by Region
            <img className="arrowdark" src={arrowdark} alt="darkarrow" />
          </button>
          <div className="dropdown-content">
            <NavLink to="Africa" >Africa</NavLink>
            <NavLink to="America" >America</NavLink>
            <NavLink to="Asia" >Asia</NavLink>
            <NavLink to="Europe" >Europe</NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    )
}