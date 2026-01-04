import React, { use, useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import './Styles/PropertyGallery.css';
import PropertySearch from './PropertySearch';


const PropertyGallery = ({ properties, favourites, addToFavourites, removeFromFavourites, clearFavourites, viewMode }) => {
    //State to hold filter criteria for the required 5 fields
    const [filter, setFilter] = useState({
        type: 'any',
        minPrice: "No Min",
        maxPrice: "No Max",
        minBedrooms: "No min",
        maxBedrooms: "No max",
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
            if (bedrooms === "No min") return 0;
            if (bedrooms === "No max") return 100;
            if (bedrooms === "Studio") return 0;
            
            const parsed = parseInt(bedrooms, 10);
            if (isNaN(parsed)) {
                return type === "minBedrooms" ? 0 : 100; // Default values for invalid input
            }
            return parsed;
        }

        //checking for bedroom filter
        const minSelectedBedrooms = getBedroomValue(filter.minBedrooms , "minBedrooms");
        const maxSelectedBedrooms = getBedroomValue(filter.maxBedrooms, "maxBedrooms");
        const propertyBedrooms = property.bedrooms === "Studio" ? 0 : parseInt(property.bedrooms, 10);

        const matchingBedrooms = propertyBedrooms >= minSelectedBedrooms && propertyBedrooms <= maxSelectedBedrooms;

        //converting price values for comparison
        const getPriceValue = (price) => {
            if (price === "No Min") return 0;
            if (price === "No Max") return Infinity;
            
            const parsed = parseInt(price, 10);
            if (isNaN(parsed)) {
                return type === "minPrice" ? 0 : Infinity; // Default values for invalid input
            }   
            return parsed;
        }

        //checking for price filter
        const minSelectedPrice = getPriceValue(filter.minPrice , "minPrice");
        const maxSelectedPrice = getPriceValue(filter.maxPrice, "maxPrice");
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


    const [isDraggingOver, setIsDraggingOver] = useState(false); // State to track dragging status
    
    //Handler for drag over event
    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent default to allow drop
        setIsDraggingOver(true); // Set dragging state to true
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDraggingOver(false); // Set dragging state to false when leaving the drop area
    }

    //Handler for drop event
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false); // Reset dragging state on drop

        //Getting the dragged property ID from the data transfer object
        const draggedPropertyId = e.dataTransfer.getData('propertyId');

        //Finding the dragged property from the properties list
        const foundProperty = properties.find((prop) => prop.id === draggedPropertyId);
        if (foundProperty) {
            addToFavourites(foundProperty);
        }
    }
    //Resetting filters when view mode changes
    useEffect(() => {
        setFilter({
            type: 'any',
            minPrice: "No Min",
            maxPrice: "No Max",
            minBedrooms: "No min",
            maxBedrooms: "No max",
            startDate: '2000-01-31',
            endDate: '2026-12-31',
            postcode: ''
        });
    }, [viewMode]);
    return (

        //Main container for the property gallery
        <div className="property-gallery">
            <h1>
                {/* Dynamic heading based on view mode */}
                {viewMode === "search" 
                ? "  Featured Properties"
                :viewMode === "favourites"
                ? `My Favourites (${favourites.length})`
                : "Property Gallery"}
            </h1>

            <div className='gallery-layout'>
                {/* Property Search Component - rendered only in search view mode */}
                {viewMode === "search" && (
                    <aside className="sidebar-container"> 
                        <PropertySearch filter={filter} setFilter={setFilter} />

                        <button className='clear-filters-btn' onClick={() => {
                            setFilter({
                                type: 'any',
                                minPrice: "No Min",
                                maxPrice: "No Max",
                                minBedrooms: "No min",
                                maxBedrooms: "No max",
                                startDate: '2000-01-31',
                                endDate: '2026-12-31',
                                postcode: ''
                            });
                        }}>
                            Clear All Filters
                        </button>
                        {/* Toggle Favourites Button */}
                        <button className="view-fav-btn" 
                            onClick={() => setShowFavourites(!showFavourites)}
                            onDragOver={handleDragOver} // Allow drag over
                            onDrop={handleDrop}> {/* Handle drop event */}
                            {showFavourites ? 'Hide Favourites' : 'View Favourites'} ({favourites.length})
                        </button>
                    </aside>
                
                )}

                <main className='main-content'>
                    {/* Favourites Section */}
                    {(showFavourites || viewMode === "favourites") ? (
                        <div className="favorites-container"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}>
                            {favourites.length === 0
                                ? <p className="no-favs-msg">No Favourite properties added yet</p>
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
                    ): (<div className='property-grid-container'>
                            {filteredProperties.length > 0 ? (
                                <div className="property-grid">
                                    {/* Mapping through the properties array to create PropertyCard components */}  
                                    {filteredProperties.map((item) => (
                                        <PropertyCard
                                            key={item.id} //unique key for each property 
                                            property={item} //passing one entire property data into the PropertyCard
                                            addToFavourites={addToFavourites} //passing the addToFavourites function as a prop
                                            isFavourite={favourites.some((fav) => fav.id === item.id)} //checking if the property is in favourites
                                        />
                                ))}
                                </div>
                            ) : (
                                <div className="no-results-msg">
                                    <h4>No properties match your current filters.</h4>
                                    <p>Please adjust your filter criteria and try again.</p>
                                    <button className='reset-filters-btn' onClick={() => {
                                        setFilter({
                                            type: 'any',
                                            minPrice: "No Min",
                                            maxPrice: "No Max",
                                            minBedrooms: "No min",
                                            maxBedrooms: "No max",
                                            startDate: '2000-01-31',
                                            endDate: '2026-12-31',
                                            postcode: ''
                                        });
                                    }}>Reset Filters</button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
            

            
            {/* Loading message if properties are not yet loaded */}
            {properties.length === 0 && (<p>Loading properties...</p>)}
        </div>
    )   
};
export default PropertyGallery;