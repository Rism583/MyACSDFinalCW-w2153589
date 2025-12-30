import PropertyGallery from './Components/PropertyGallery.jsx';
import './App.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyPage from './Components/PropertyPage.jsx';

//Function to get initial favourites from local storage
const getInitialFavourites = () => {
  const savedFavourites = localStorage.getItem('favourite_props');
  return savedFavourites ? JSON.parse(savedFavourites) : [];//return empty array if nothing in local storage
}
function App() {
  //State to hold all properties
  const [properties, setProperties] = useState([]);

  //const useEffect hook to fetch properties data on component mount
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

  //State to hold favourite properties
  const [favourites, setFavourites] = useState(getInitialFavourites);

  //Function to add a property to favourites list
  const addToFavourites = (property) => {
      if (!favourites.find((favourite) => favourite.id === property.id)) {
          setFavourites([...favourites, property]);
      }else{
          alert("This property is already in the list")};
  };

  //Function to remove a property from favourites list
  const removeFromFavourites = (id) => {

      const updatedFavourites = favourites.filter((favourite) => favourite.id !== id);
      setFavourites (updatedFavourites);
  };

  //Function to clear all favourites
  const clearFavourites = () => {
      setFavourites ([]);
  };

  //saving favourites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('favourite_props', JSON.stringify(favourites));
  }, [favourites]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <PropertyGallery
                properties={properties}
                favourites={favourites} 
                addToFavourites={addToFavourites} 
                removeFromFavourites={removeFromFavourites} 
                clearFavourites={clearFavourites} 
              />
            } 
          />
          <Route
            path="/property/:id" 
            element={<PropertyPage properties={properties} />}
          />
        </Routes>
      </div>
    </Router>
  )
}
  
export default App;