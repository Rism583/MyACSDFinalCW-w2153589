import React from 'react';
import './PropertyCard.css';

//@param {Object} property - An Object containing the property data to display

const PropertyCard = ({property}) => {
    return (
        //main container for the property card
        <div className="property-card">

            {/* Main Image section */}
            <div className="property-img-container">
                <img src={property.picture} alt={property.type} className="property-img" />
            </div>

            {/* Property Details Section */}
            <div className='property-details'>
                <h3 className = "property-type">{property.type}</h3>
                <p className = "property-location">{property.location}</p>
                <p className = "property-price">£{property.price.toLocaleString()}</p>
            </div>
        </div>
    )
}
export default PropertyCard;

