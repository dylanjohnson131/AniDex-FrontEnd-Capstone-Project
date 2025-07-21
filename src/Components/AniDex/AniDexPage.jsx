import { useState, useEffect } from 'react';
import './AniDexPage.css';
import { fetchAnimals } from '../../services/apiService';
  
export const AniDexPage = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const getAnimals = async () => {
      const data = await fetchAnimals();
      setAnimals(data);
    };
    getAnimals();
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