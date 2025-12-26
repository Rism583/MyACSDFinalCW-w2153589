import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';


const PropertyGallery = () => {

    //Memory to hold the properties fetched from properties.json
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        //Fetch properties data from the JSON file
        fetch('/properties.json')
            .then(response => {

                //checking if the fetching is successful
                if (!response.ok) {
                    throw new Error('Failed to load properties data');
                }
                return response.json();
            })

            .then( (data) => {
                setProperties(data.properties);
            })
            .catch ((error) => {
                console.error("Error in fetching data: ",error);
            });
    } , []); //Empty dependency array to run only once on component mount

    return (

        //Main container for the property gallery
        <div className="property-gallery">
            <h1>Featured Properties</h1>

            <div className="property-grid">

                {/* Mapping through the properties array to create PropertyCard components */}  
                {properties.map((item) => (
                    <PropertyCard
                        key={item.id} //unique key for each property 
                        property={item} //passing one entire property data into the PropertyCard
                    />
                ))}
            </div>
            {/* Loading message if properties are not yet loaded */}
            {properties.length === 0 && (<p>Loading properties...</p>)}
        </div>
    )
}
export default PropertyGallery;