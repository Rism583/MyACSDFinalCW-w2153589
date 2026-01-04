/**
 * TypeWidget.jsx
 * A React component for rendering a property type selection widget.
 */

import React from 'react';
import './Styles/Widgets.css';

const TypeWidget = ({ label, value, onChange }) => { //TypeWidget component to handle type selection

    //List of property types
    const propertyTypes = ["Any", "House", "Cottage", "Duplex", "Flat", "Bungalow", "Townhouse"];

    return (
        <div className="type-widget-container">
            <label htmlFor="type">{label}</label>

            {/* Dropdown for property type selection */}
            <select 
            id="type" 
            name="type" 
            value={value} 
            onChange={onChange}>
                {propertyTypes.map(type => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalizing first letter */}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TypeWidget;