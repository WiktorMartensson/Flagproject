// RootLayout.js
import React from "react";
import { useTheme } from "../contexts/theme";
import logodark from "../assets/logodark.png";
import moonbordered from "../assets/moonbordered.svg";
import logolight from '../assets/logolight.png'
import moon from '../assets/moon.svg';
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <div className={`root-layout ${themeMode === 'dark' ? 'dark-mode' : ''}`}>
      <header>
        <nav className="navbar">
          <h1>The Flag App</h1>
          <img className="logo" src={themeMode === 'dark' ? logolight : logodark} alt="Logo" />
          <div className="mode-selector" onClick={toggleTheme}>
            <img className="moon" src={themeMode === 'dark' ? moon : moonbordered} alt="" />
            <p>{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
            // Endast region
// {country.filter((item) => item.region=='Africa').map( (item)=> {
//     return(
//         <Countrycards 
//             data={item}
//         />
//     )
//   })}