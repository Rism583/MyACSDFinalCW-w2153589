import PropertyGallery from './Components/PropertyGallery.jsx';
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  //State to hold favourite properties
  const [favourites, setFavourites] = useState([]);

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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <PropertyGallery 
                favourites={favourites} 
                addToFavourites={addToFavourites} 
                removeFromFavourites={removeFromFavourites} 
                clearFavourites={clearFavourites} 
              />
            } 
          />
          {/*<Route
            path="/property/:id" 
            element={<PropertyPage />}
          />*/}
        </Routes>
      </div>
    </Router>
  )
}
  
export default App;