import './Styles/PropertySearch.css';
import React from 'react';

const PropertySearch = ({filter, setFilter}) => {

    //Handler for filter input changes
    const handlefilterChange = (e) => {
        const {name, value} = e.target;
        
        setFilter({
            ...filter,
            [name]: value
        });
    };

    return (
        //Search section container
        <section className="search-section">
            <h2>Search Properties</h2>

            {/*Dropdown for property type filter*/}
            <div className="filter-container">
                <label htmlFor="type">Property Type:</label>
                <select id="type" name="type" value={filter.type} onChange={handlefilterChange}>
                    <option value="any">Any</option>
                    <option value="House">House</option>
                    <option value="Cottage">Cottage</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Flat">Flat</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Townhouse">Townhouse</option>
                </select>
            </div>

            {/*Input for postcode filter*/}
            <div className="filter-container">
                <label htmlFor='postal'>Postcode:</label>
                <input 
                    type="text" 
                    id="postal" 
                    name="postcode" 
                    value={filter.postcode} 
                    onChange={handlefilterChange} 
                    placeholder="Enter postcode" 
                />
            </div>

            {/*Dropdowns for bedroom range filter*/}
            <div className="filter-container">
                <label>No.of Bedrooms: </label>
                <div className="bedroom-range">

                    {/* Min bedroom selection */}
                    <select
                        name="minBedrooms"
                        value={filter.minBedrooms}
                        onChange={handlefilterChange}
                    >
                        <option value={"No minimum"}>No Min</option>
                        <option value="Studio">Studio</option>
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                        <option value={"6"}>6</option>    

                    </select>

                    <span> - </span>

                    {/* Max bedroom selection */}
                    <select
                        name="maxBedrooms"
                        value={filter.maxBedrooms}
                        onChange={handlefilterChange}
                    >
                        <option value={"No maximum"}>No Max</option>
                        <option value={"Studio"}>Studio</option>
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                        <option value={"6"}>6</option>

                    </select>

                </div>
                
            </div>

            <div className="filter-container">
                <label>Price Range (£):</label>
                <div className="price-range">

                    {/* Min price selection */}
                    <select
                        name="minPrice"
                        value={filter.minPrice}
                        onChange={handlefilterChange}
                    >
                        <option value={"No Minimum"}>No Min</option>
                        <option value={"100000"}>100,000</option>
                        <option value={"200000"}>200,000</option>
                        <option value={"300000"}>300,000</option>
                        <option value={"400000"}>400,000</option>
                        <option value={"500000"}>500,000</option>
                        <option value={"600000"}>600,000</option>
                        <option value={"700000"}>700,000</option>
                        <option value={"800000"}>800,000</option>
                        <option value={"900000"}>900,000</option>
                        <option value={"1000000"}>1,000,000</option>
                    </select>

                    <span> - </span>
                    {/* Max price selection */}
                    <select
                        name="maxPrice"         
                        value={filter.maxPrice}
                        onChange={handlefilterChange}
                    >
                        <option value={"No Maximum"}>No Max</option>
                        <option value={"100000"}>100,000</option>
                        <option value={"200000"}>200,000</option>
                        <option value={"300000"}>300,000</option>
                        <option value={"400000"}>400,000</option>
                        <option value={"500000"}>500,000</option>
                        <option value={"600000"}>600,000</option>
                        <option value={"700000"}>700,000</option>
                        <option value={"800000"}>800,000</option>
                        <option value={"900000"}>900,000</option>
                        <option value={"1000000"}>1,000,000</option>
                    </select> 
                </div>

            </div>

            <div className="filter-container">
                <label htmlFor="start-date">Added After: </label>
                <input 
                    type="date" 
                    id="start-date" 
                    name="startDate" 
                    value={filter.startDate} 
                    onChange={handlefilterChange} 
                />
            </div>
            <div className="filter=container">
                <label htmlFor="end-date">Added Before: </label>
                <input 
                    type="date" 
                    id="end-date" 
                    name="endDate" 
                    value={filter.endDate} 
                    onChange={handlefilterChange} 
                />
            </div>


        </section>

    )

}

export default PropertySearch;
