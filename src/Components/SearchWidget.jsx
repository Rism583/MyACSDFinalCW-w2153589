/** 
 * SearchWidget.jsx
 * A React component for rendering a search input widget.
 */

import React from "react";
import './Styles/Widgets.css';  

const SearchWidget = ({ label, name, value, onChange,placeholder }) => { //SearchWidget component to handle search inputs
    return (
        <div className="search-widget-container">
            <label htmlFor={name}>{label}</label>
            {/* Search input field */}
            <input
                type="search"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="search-input"
            />
        </div>
    );
}
export default SearchWidget;