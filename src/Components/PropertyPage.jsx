import React from "react";
import {useState} from "react";
import { useParams ,Link } from "react-router-dom";
import './Styles/PropertyPage.css';

//Component to display detailed information about a specific property
const PropertyPage = ({properties ,favourites, addToFavourites}) => {
    //Extracting property ID from URL parameters
    const {id} = useParams();
    
    //Finding the property with the matching ID
    const property = properties.find((prop) => prop.id === id);

    //State for the main viewer
    const[mainImage,setMainImage] = useState(property? property.picture : "")

    //State for active tab (description or details)
    const [activeTab, setActiveTab] = useState('description');

    //Handling case where property is not found
    if (!property) {
        return <div className="error-msg">Property not found</div>;
    }
    return (
    
        <div className="property-page-container">
            {/* Link to go back to the main gallery */}
            <Link to="/" className="back-link">← Back to Gallery</Link>

            {/* Property Header Section */}
            <div className="prop-header">
                <h1>{property.type} with {property.bedrooms} bedrooms</h1>
            </div>

            <div className="main-image-view">
                {mainImage && (
                    <img 
                        src = {mainImage.startsWith('/') ? mainImage : `/${mainImage}`}
                        alt="Selected property"
                        className="main-view"
                    />
                )}
            </div> 

            <div className="thumbnail-row">
                {[property.picture, ...property.images]
                .map((imgSrc, index) => ( // Rendering thumbnails
                    <img 
                        key={index} 
                        src={imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`}
                        alt={`Thumbnail ${index + 1}`} 
                        className={`thumb-img ${mainImage === imgSrc ? 'active-thumb' : ''}`}
                        onClick={() => setMainImage(imgSrc)} // Interaction Logic
                    />
                ))}
            </div>

            {/* Favourite Button Section */}
            <div className="fav-button-container">
                {favourites && favourites.find((fav) => fav.id === property.id) ? (
                    <button className="favourite-added-btn" disabled>Added to ❤️</button>
                ) : (
                    <button className="add-fav-button" onClick={() => addToFavourites(property)}>Add to ❤️</button>
                )}
            </div>

            <div className="property-tabs">

                {/* Tab Buttons for Description, Floor Plan, and Map */}
                <button
                    className={activeTab === 'description' ? 'active-tab' : 'tab-btn'}
                    onClick={() => setActiveTab('description')}//setting active tab to description
                >Description</button>

                <button
                    className={activeTab === 'floorplan' ? 'active-tab' : 'tab-btn'}
                    onClick={() => setActiveTab('floorplan')}//setting active tab to floorplan
                >Floor Plan</button>

                <button
                    className={activeTab === 'map' ? 'active-tab' : 'tab-btn'}
                    onClick={() => setActiveTab('map')}//setting active tab to map
                >Map</button>
            </div>

            {/* Property Description and Details Section */}
            <div className="tab-description">

                {/* Description Tab Content */}
                {activeTab === 'description' && (
                    <div className="tabpane">
                        <div className="prop-description">
                            <h2>Description</h2>
                            <p>{property.description}</p>
                        </div>
                        <div className="prop-details">
                            <h2>Details</h2>
                            <ul>
                                <li><strong>Type:</strong> {property.type}</li>
                                <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                                <li><strong>Location:</strong> {property.location}</li>
                                <li><strong>Postcode:</strong> {property.postcode}</li>
                                <li><strong>Price:</strong> £{property.price.toLocaleString()}</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Floor Plan Tab Content */}
                {activeTab === 'floorplan' && (
                    <div className="tabpane">
                        <div className="prop-floor-plan">
                            <h2>Floor Plan</h2>
                            <img src={property.floorplan.startsWith('/') ? property.floorplan : `/${property.floorplan}`} alt="Floor Plan" className="floor-plan-img"/>
                        </div>
                    </div>
                )}

                {/* Map Tab Content */}
                {activeTab === 'map' && (
                    <div className="tabpane">
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
                )}
            </div>
            
        </div>
    )
}
export default PropertyPage;