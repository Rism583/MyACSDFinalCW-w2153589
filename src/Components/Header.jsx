import React from "react";
import { NavLink } from "react-router-dom";


const Header = () => {
    return (

        //main header container
        <header className="app-header">

            {/* Logo and Title Section */}
            <div className="logo-container">
                <img src={"/images/Applogo.png"} alt="Simply Home App Logo" className="app-logo" />
                <h1 className="app-title">Simply Home</h1>
                <p className="app-tagline">Your destination, Beautifully Discovered...</p>
            </div>

            {/* Navigation Links Section */}
            <nav className="navigation-bar">

                {/* Navigation Links using NavLink for active link styling */}
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                    Home
                </NavLink>

                <NavLink to="/properties" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                    Properties
                </NavLink>

                <div className="nav-favourite-count" >
                    <NavLink to="/favourites" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                        Favourites
                    </NavLink>
                </div>

            </nav>
        </header>
    );
}
export default Header;

            