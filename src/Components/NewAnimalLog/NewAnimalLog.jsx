import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchAnimals, createSighting } from '../../services/apiService';
import './NewAnimalLog.css';

export const LogNewAnimalPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [formData, setFormData] = useState({
    region: '',
    category: '',
    animalId: '',
    notes: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);

        const animalData = await fetchAnimals();
        setAnimals(animalData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = animals.filter(animal => {
      const matchesCategory = !formData.category || animal.categoryID === parseInt(formData.category);
      const matchesRegion = !formData.region || animal.region.split(', ').includes(formData.region);
      return matchesCategory && matchesRegion;
    });
    setFilteredAnimals(filtered);
  }, [formData.region, formData.category, animals]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await createSighting({
        userId: user.id,
        animalId: parseInt(formData.animalId),
        region: formData.region,
        date: new Date().toISOString(),
        notes: formData.notes
      });
      if (response.ok) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error logging new animal:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="log-page">
      <h1>Log New Animal</h1>
      <form onSubmit={handleSubmit} className="log-form">
        <div className="form-group">
          <label>Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          >
            <option value="">Select Region</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {(formData.region && formData.category) && (
          <div className="form-group">
            <label>Animal</label>
            {filteredAnimals.length === 0 ? (
              <p>No animals found for this region and category.</p>
            ) : (
              filteredAnimals.map(animal => (
                <div key={animal.id} style={{ marginBottom: "0.5rem" }}>
                  <label>
                    <input
                      type="radio"
                      name="animalId"
                      value={animal.id}
                      checked={formData.animalId === String(animal.id)}
                      onChange={handleChange}
                      required
                    />
                    {animal.name}
                  </label>
                </div>
              ))
            )}
          </div>
        )}

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any observations or notes..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit" className="submit-button">
          Log Sighting
        </button>
      </form>
    </div>
  );
};