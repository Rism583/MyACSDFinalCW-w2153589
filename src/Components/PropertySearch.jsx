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
        </section>

    )

}

export default PropertySearch;
