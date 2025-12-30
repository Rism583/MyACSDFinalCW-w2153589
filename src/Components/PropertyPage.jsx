import React from "react";
import { useParams ,Link } from "react-router-dom";
import './Styles/PropertyPage.css';

const PropertyPage = ({properties ,favourites, addToFavourites}) => {
    const {id} = useParams();
    
    const property = properties.find((prop) => prop.id === id);
    if (!property) {
        return <div className="error-msg">Property not found</div>;
    }
    return (
        <div className="property-page-container">
            <Link to="/" className="back-link">← Back to Gallery</Link>

            <div className="prop-header">
                <h1>{property.type} with {property.bedrooms} bedrooms</h1>
            </div>
            <div className="prop-imgs-grid">
                {[property.picture, ...property.images].map((imgSrc, index) => (
                    <img 
                    key={index} 
                    src={imgSrc.startsWith('/') 
                        ? imgSrc : `/${imgSrc} `}
                    alt={`${property.type} image ${index + 1}`} 
                    className="prop-img"/>
                ))}
            </div>
            <div className="fav-button-container">
                {favourites && favourites.find((fav) => fav.id === property.id) ? (
                    <button className="favourite-added-btn" disabled>Added to ❤️</button>
                ) : (
                    <button className="add-fav-button" onClick={() => addToFavourites(property)}>Add to ❤️</button>
                )}
            </div>
            <div className="prop-description">
                <h2>Description</h2>
                <p>{property.description}</p>
            </div>

            <div className="prop-details">
                <h2>Property Details</h2>
                <ul style ={{listStyleType: 'none', padding: 0}}>
                    <li><strong>Location:</strong> {property.location}</li>
                    <li><strong>Price:</strong> £{property.price.toLocaleString()}</li>
                    <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                    <li><strong>Added:</strong> {property.added.month} {property.added.year}</li>
                </ul>
            </div>

            <div className="prop-floor-plan">
                <h2>Floor Plan</h2>
                <img src={property.floorplan.startsWith('/') ? property.floorplan : `/${property.floorplan}`} alt="Floor Plan" className="floor-plan-img"/>
            </div>

            <div className="prop-map">
                <h2>Location Map</h2>
                <iframe
                    title="Property Location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(property.location + " " + property.postcode)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            
        </div>
    )
}
export default PropertyPage;