import React from 'react';
import './Styles/PropertyCard.css';
import { Link } from 'react-router-dom';

/** @param {Object} property - An Object containing the property data to display */

const PropertyCard = ({property, add, isFavourite}) => {
    return (
        //main container for the property card
        <div className="property-card">

            {/* Main Image section */}
            <div className="property-img-container">
                <img src={property.picture} alt={property.type} className="property-img" />
            </div>

            {/* Property Details Section */}
            <div className='property-details'>
                <h3 className = "property-type">{property.type} with {property.bedrooms} bedrooms</h3>
                <p className = "property-description">{property.description.length > 100 
                ? property.description.substring(0, 100) + "..." 
                : property.description} </p>
                <p className = "property-location">{property.location}</p>
                <p className = "property-price">£{property.price.toLocaleString()}</p>
                
                {/* Buttons Section */}
                <div className="Buttons">
                    <button className="explore-button">Explore Home</button>
                    {isFavourite //checking if the property is already in favourites
                    ? ( <span className="favourite-added-msg">Added to ❤️</span>)
                    : <button 
                        className="favourite-button" 
                        onClick={() => add(property)}>
                            Add to Favourites</button>
                    }          
                </div>
                
            </div>
        </div>
    )
}
export default PropertyCard;

