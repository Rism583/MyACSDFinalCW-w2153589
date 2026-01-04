/**
 * Header.jsx
 * A React component for rendering the header section of the Simply Home application.
 */

import React from "react";
import { NavLink } from "react-router-dom";
import './Styles/Header.css';


const Header = ({ favourites }) => {
    return (

        //main header container
        <header className="app-header">

            {/* Logo and Title Section */}
            <div className="logo-container">
                <img src={"/images/logo.png"} alt="Simply Home App Logo" className="app-logo" />
                <div className="brand-text">
                    <h1 className="app-title">Simply Home</h1>
                    <p className="app-tagline">Your destination, Beautifully Discovered...</p>
                </div>
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
                        {favourites.length > 0 && (
                            <span className="favourite-count-badge">{favourites.length}</span>
                        )}
                    </NavLink>
                </div>

            </nav>
        </header>
    );
}
export default Header;

            