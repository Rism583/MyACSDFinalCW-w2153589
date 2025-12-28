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


        </section>

    )

}

export default PropertySearch;
