import React from "react";
import './Styles/Footer.css';

const Footer = () => {
    return (

        //main footer container
        <footer className="app-footer">
            <div className="footer-content">

                {/* About Section */}
                <div className="footer-section">
                    <h4>About Simply Home</h4>
                    <p>Simply Home is your trusted partner in finding the perfect property. We are dedicated to providing a seamless and enjoyable experience for all your real estate needs.</p>
                </div>

                {/* Quick Links Section */}
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/properties">Properties</a></li>
                        <li><a href="/favourites">Favourites</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p>Email: contact@simplyhome.com</p>    
                    <p>Phone: +44 1234 567890</p>
                    <p>Address: 123 Simply Home St, Real Estate City, UK</p>
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Simply Home. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;