import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import './Styles/PropertyGallery.css';
import PropertySearch from './PropertySearch';


const PropertyGallery = () => {

    //Memory to hold the properties fetched from properties.json
    const [properties, setProperties] = useState([]);

    //State to hold filter criteria for the required 5 fields
    const [filter, setFilter] = useState({
        type: 'any',
        minPrice: 250000,
        maxPrice: 1000000,
        minBedrooms: "No minimum",
        maxBedrooms: "No maximum",
        startDate: '2022-01-31',
        endDate: '2024-12-31',
        postcode: ''
    })

    //Filtering properties based on selected criteria
    const filteredProperties = properties.filter((property) => {

        //checking for type filter
        const matchesType = filter.type === 'any' || property.type === filter.type;

        //checking for postcode filter
        const matchesPostcode = filter.postcode === '' || property.postcode.toUpperCase().startsWith(filter.postcode.toUpperCase());

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

        const matchesBedrooms = propertyBedrooms >= minSelectedBedrooms && propertyBedrooms <= maxSelectedBedrooms;
        return matchesType && matchesPostcode && matchesBedrooms;
    });

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

            <PropertySearch filter={filter} setFilter={setFilter} />

            <div className="property-grid">

                {/* Mapping through the properties array to create PropertyCard components */}  
                {filteredProperties.map((item) => (
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