
export const fetchAnimals = async () => {
  const response = await fetch('http://localhost:3000/Animals');
  return response.json();
};

export const fetchAnimalById = async (animalId) => {
  const response = await fetch(`http://localhost:3000/Animals/${animalId}`);
  return response.json();
};


export const fetchCategories = async () => {
  const response = await fetch('http://localhost:3000/Categories');
  return response.json();
};

export const fetchSightingsByUser = async (userId) => {
  const response = await fetch(`http://localhost:3000/Sightings?userId=${userId}`);
  return response.json();
};

export const createSighting = async (sightingData) => {
  const response = await fetch('http://localhost:3000/Sightings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sightingData),
  });
  return response;
};

export const deleteSighting = async (sightingId) => {
  return fetch(`http://localhost:3000/Sightings/${sightingId}`, { method: 'DELETE' });
};

export const updateSightingNotes = async (sightingId, newNotes) => {
  return fetch(`http://localhost:3000/Sightings/${sightingId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes: newNotes }),
  });
};


export const fetchUserByCredentials = async (email, password) => {
  const response = await fetch(
    `http://localhost:3000/users?email=${email}&password=${password}`
  );
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response;
};