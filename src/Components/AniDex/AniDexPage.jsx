import { useState, useEffect } from 'react';
import './AniDexPage.css';

// We are creating and exporting a function called AniDexPage 
export const AniDexPage = () => {
 // State to hold the list of animals
  const [animals, setAnimals] = useState([]);
//useEffect hook so that we can fetch the data from
// the animals array in the database from the API
  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await fetch('http://localhost:3000/Animals');
      //here we will turn the response into json format
      const data = await response.json();
    //Update state with fetched animal data
      setAnimals(data);
    };
    fetchAnimals();
  }, []);

  return (
    <div className="anidex-container">
      <h1>AniDex</h1>
      <div className="animals-grid">
        {animals.map(animal => (
          <div key={animal.id} className="animal-card">
            <img 
              src={animal.imageUrl} 
              alt={animal.name}
              className="animal-image"
            />
            <div className="animal-info">
              <h3>{animal.name}</h3>
              <p className="scientific-name">{animal.scientificName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};