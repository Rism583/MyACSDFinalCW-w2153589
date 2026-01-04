/**
 * DateWidget.jsx
 * A React component for rendering a date input widget.
 */

import React from "react";
import './Styles/Widgets.css';  


const DateWidget = ({ label, name, value, onChange }) => { //DateWidget component to handle date inputs
    return (
        <div className="date-widget-container">
            <label htmlFor={name}>{label}</label>
            {/* Date input field */}
            <input
                type="date"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>

    );
};

export default DateWidget;