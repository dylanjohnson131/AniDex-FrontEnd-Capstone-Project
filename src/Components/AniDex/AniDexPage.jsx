import { useState, useEffect } from 'react';
import './AniDexPage.css';
  
export const AniDexPage = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await fetch('http://localhost:8088/Animals');
      const data = await response.json();
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