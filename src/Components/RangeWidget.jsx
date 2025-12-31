import React from "react";

const RangeWidget = ({ label, minName, maxName , minValue, maxValue, options, onChange }) => {
    return (
        <div className="range-widget-container">
            <label>{label}</label>
            <div className="range-inputs">
                <select name={minName} value={minValue} onChange={onChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span> - </span>
                <select name={maxName} value={maxValue} onChange={onChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default RangeWidget;