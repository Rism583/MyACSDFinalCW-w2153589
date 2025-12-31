import './Styles/PropertySearch.css';
import React from 'react';
import DateWidget from './DateWidget';//importing DateWidget component for date inputs
import RangeWidget from './RangeWidget';//importing RangeWidget component for range inputs
const PropertySearch = ({filter, setFilter}) => {

    //Handler for filter input changes
    const handlefilterChange = (e) => {
        const {name, value} = e.target;
        
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const bedroomOptions = ["No min", "Studio", "1", "2", "3", "4", "5", "6" , "No max"];
    const priceOptions = ["No Min", "100000", "200000", "300000", "400000", "500000", "600000", "700000", "800000", "900000", "1000000", "No Max"];

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
            <RangeWidget
                label="Bedrooms:"
                minName="minBedrooms"
                maxName="maxBedrooms"
                minValue={filter.minBedrooms}
                maxValue={filter.maxBedrooms}
                options={bedroomOptions}
                onChange={handlefilterChange}
            />
            {/*Dropdowns for price range filter*/}
            <RangeWidget
                label="Price (£):"
                minName="minPrice"
                maxName="maxPrice"
                minValue={filter.minPrice}
                maxValue={filter.maxPrice}
                options={priceOptions}
                onChange={handlefilterChange}
            />

            {/* DateWidget for start date filter */}
            <DateWidget
                label="Added After:"
                name="startDate"
                value={filter.startDate}
                onChange={handlefilterChange}
            />
    
            {/* DateWidget for end date filter */}
            <DateWidget
                label="Added Before:"
                name="endDate"
                value={filter.endDate}
                onChange={handlefilterChange}
            />
            


        </section>

    )

}

export default PropertySearch;
