import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewAnimalLog.css';
//create and export the logNewAnimalPage component. We will use state
//to hold the list of categories, animals, and filtered animals.
//We will also use state to hold the form data for logging a 
// new animal sighting and set its initial values as empty strings.
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

  // Fetch categories and animals when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await fetch('http://localhost:3000/Categories');
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        // Fetch all animals
        const animalResponse = await fetch('http://localhost:3000/Animals');
        const animalData = await animalResponse.json();
        setAnimals(animalData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

 
  // We are using the useEffect hook to filter the animals based on the
  // selected region and category. The filtered animals will be used to 
  // display the animal options in the form.

  //Update the list of animals shown as radio buttons based on 
  // the users selections
  useEffect(() => {
    //animals.filter goes through every animal in the database
    const filtered = animals.filter(animal => {
      // !formData.category checks if the user has not selected a category
      //yet. If formData.category is an empty string, !formData.category is 
      // true. this means if no category is selected, all animals will match.
      // If a category is selected, it checks if the animal's categoryID matches
      // this is basically saying if a user hasn't selected a region and category,
      // all animals will render but if the user has selected a region and category
      // then only the animals that match the selected region and category will be rendered.

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
      const response = await fetch('http://localhost:3000/Sightings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          animalId: parseInt(formData.animalId),
          region: formData.region,
          // create a string to represent the current date and time in ISO format
          date: new Date().toISOString(),
          notes: formData.notes
        }),
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

        {/* Animal radio buttons */}
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