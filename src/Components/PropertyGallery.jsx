import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import './Styles/PropertyGallery.css';
import PropertySearch from './PropertySearch';


const PropertyGallery = ({ properties, favourites, addToFavourites, removeFromFavourites, clearFavourites }) => {
    //State to hold filter criteria for the required 5 fields
    const [filter, setFilter] = useState({
        type: 'any',
        minPrice: "No Minimum",
        maxPrice: "No Maximum",
        minBedrooms: "No minimum",
        maxBedrooms: "No maximum",
        startDate: '2000-01-31',
        endDate: '2026-12-31',
        postcode: ''
    })

    //Filtering properties based on selected criteria
    const filteredProperties = properties.filter((property) => {

        //checking for type filter
        const matchingType = filter.type === 'any' || property.type === filter.type;

        //checking for postcode filter
        const matchingPostcode = filter.postcode === '' || property.postcode.toUpperCase().startsWith(filter.postcode.toUpperCase());

        //converting bedroom values for comparison
        const getBedroomValue = (bedrooms) => {
            if (bedrooms === "No minimum") return 0;
            if (bedrooms === "No maximum") return 100;
            if (bedrooms === "Studio") return 0;
            return parseInt(bedrooms, 10);
        }

        //checking for bedroom filter
        const minSelectedBedrooms = getBedroomValue(filter.minBedrooms);
        const maxSelectedBedrooms = getBedroomValue(filter.maxBedrooms);
        const propertyBedrooms = property.bedrooms === "Studio" ? 0 : parseInt(property.bedrooms, 10);

        const matchingBedrooms = propertyBedrooms >= minSelectedBedrooms && propertyBedrooms <= maxSelectedBedrooms;

        //converting price values for comparison
        const getPriceValue = (price) => {
            if (price === "No Minimum") return 0;
            if (price === "No Maximum") return Infinity;
            return parseInt(price, 10);
        }

        //checking for price filter
        const minSelectedPrice = getPriceValue(filter.minPrice);
        const maxSelectedPrice = getPriceValue(filter.maxPrice);
        const propertyPrice = property.price;
        const matchingPrice = propertyPrice >= minSelectedPrice && propertyPrice <= maxSelectedPrice;

        const monthMapping = {
            "January": 1,
            "February": 2,
            "March": 3, 
            "April": 4,
            "May": 5,
            "June": 6,  
            "July": 7,
            "August": 8,
            "September": 9, 
            "October": 10,
            "November": 11,
            "December": 12
        }

        //converting date values for comparison
        const getDateValue = new Date(
            property.added.year, 
            monthMapping[property.added.month] - 1, // Months are zero-indexed in JavaScript Date
            property.added.day
        );

        const start = new Date(filter.startDate);
        const end = new Date(filter.endDate);

        //checking for date filter
        const matchingDate = getDateValue >= start && getDateValue <= end;

        //returning true if all filter criteria match
        return matchingType && matchingPostcode && matchingBedrooms && matchingPrice && matchingDate;
    });

    

    //State to toggle between viewing all properties and favourites
    const [showFavourites, setShowFavourites] = useState(false);

    return (

        //Main container for the property gallery
        <div className="property-gallery">
            <h1>Featured Properties</h1>

            <PropertySearch filter={filter} setFilter={setFilter} />

            {/* Toggle Favourites Button */}
            <button className="view-fav-btn" onClick={() => setShowFavourites(!showFavourites)}>
                {showFavourites ? 'Hide Favourites' : 'View Favourites'} ({favourites.length})
            </button>

            {/* Favourites Section */}
            {showFavourites ? (
                <div className="favorites-container">
                    <h2>My Favourites ({favourites.length})</h2>
                    {favourites.length === 0
                        ? <p className="no-favs-msg">No Favourite prperties added yet</p>
                        : <div className="favs-list">

                            {/* Mapping through the favourites array to display each favourite property */}
                            {favourites.map((favourite) => (
                                <div className="favourite-card" key={favourite.id}>

                                    {/* Favourite Property Image and Details Section */}
                                    <img src ={favourite.picture} alt={favourite.type} className="fav-prop-img "/>

                                    <div className="fav-prop-details">
                                        <h3>{favourite.type} with {favourite.bedrooms} bedrooms</h3>
                                        <h4>£{favourite.price.toLocaleString()}</h4>
                                    </div>

                                    {/* Remove from favourites button */}
                                    <button 
                                        className="remove-fav-button"
                                        onClick={() => removeFromFavourites(favourite.id)}>                                
                                        Remove from Favourites
                                    </button>
                                </div>
                            ))}
                        </div>
                    }
                    {/* Clear all favourites button */}
                    {favourites.length > 0 && (
                        <button className="clear-favs-button" onClick={clearFavourites}>
                            Clear All Favourites
                        </button>
                    )}
                </div>
            //show only the filtered properties section
            ): (<div className="property-grid">

                {/* Mapping through the properties array to create PropertyCard components */}  
                {filteredProperties.map((item) => (
                    <PropertyCard
                        key={item.id} //unique key for each property 
                        property={item} //passing one entire property data into the PropertyCard
                        add={addToFavourites} //passing the addToFavourites function as a prop
                        isFavourite={favourites.some((fav) => fav.id === item.id)} //checking if the property is in favourites
                    />
                ))}
            </div>
            )}
            {/* Loading message if properties are not yet loaded */}
            {properties.length === 0 && (<p>Loading properties...</p>)}
        </div>
    )   
};
export default PropertyGallery;