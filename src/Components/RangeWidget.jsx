import React from "react";


const RangeWidget = ({ label, minName, maxName , minValue, maxValue, options, onChange }) => { //RangeWidget component to handle range inputs
    return (
        <div className="range-widget-container">
            <label>{label}</label>
            <div className="range-inputs">

                {/* Dropdown for minimum value */}
                <select name={minName} value={minValue} onChange={onChange}>
                    {options.map(option => (
                        <option key={option} value={option}> {/*setting option value and key for each option*/}
                            {option}
                        </option>
                    ))}
                </select>
                <span> - </span>

                {/* Dropdown for maximum value */}
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