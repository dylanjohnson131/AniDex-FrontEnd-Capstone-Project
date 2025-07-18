import { useState, useEffect } from 'react';
import './CollectionPage.css';

export const CollectionPage = () => {
  // state to hold the list of users, users collection, 
  // and selected animal for modal
  const [myCollection, setMyCollection] = useState([]);
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false);
  // useEffect hook to fetch the current logged in users collection from the api,
  useEffect(() => {
    //using localStorage.getItem to get the string value of the logged in 
    // user key in localStorage. Then we use json.parse to convert
    //  the string into an object.
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
// creating a async function called fetchMyCollection so that we can try to 
// fetch all of the logged in users data. if there is an error when rendering,
// we will catch the error and alert the user saying error fetching
// collection
    const fetchMyCollection = async () => {
      try {
        const response = await fetch(`http://localhost:3000/Sightings?userId=${loggedInUser.id}`);
        const sightings = await response.json();

        // Fetch full animal details for each sighting
        const animalPromises = sightings.map(async sighting => {
          const animalResponse = await fetch(`http://localhost:3000/Animals/${sighting.animalId}`);
          const animal = await animalResponse.json();
          // return both the sighting data and animal data. we also use the
          // spread operator which expands the animal data.
          return { ...animal, sightingId: sighting.id, notes: sighting.notes, sighting: sighting };
        });
        // We are waiting for all the animals to be fetched.
        const animals = await Promise.all(animalPromises);
        setMyCollection(animals);
        // Catch an error if it occurs
      } catch (error) {
        console.error('Error fetching collection:', error);
      }
    };
// only if a user is logged in will we fetch the users collection
    if (loggedInUser) {
      fetchMyCollection();
    }
  }, []);

  // Delete log handler; creating delete option for users sighting log
  const handleDelete = async (sightingId) => {
    await fetch(`http://localhost:3000/Sightings/${sightingId}`, { method: "DELETE" });
    setMyCollection(myCollection.filter(a => a.sightingId !== sightingId));
    setShowModal(false);
  };

  // Edit log handler (simple notes edit for demo)
  const handleEdit = async (sightingId, newNotes) => {
    await fetch(`http://localhost:3000/Sightings/${sightingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: newNotes })
    });
    setMyCollection(myCollection.map(animals =>
      animals.sightingId === sightingId ? { ...animals, notes: newNotes } : animals
    ));
    setSelected({ ...selected, notes: newNotes });
  };

  return (
    <div className="collection-container">
      <header className="collection-header">
        <h1>MY COLLECTION</h1>
      </header>
      <div className="collection-grid">
        {myCollection.map(animal => (
          <div
            key={animal.sightingId}
            className="collection-card"
            onClick={() => { setSelected(animal); setShowModal(true); }}
            style={{ cursor: "pointer" }}
          >
            <img src={animal.imageUrl} alt={animal.name} className="animal-image" />
            <div className="animal-info">
              <h3>{animal.name}</h3>
              <p className="scientific-name">{animal.scientificName}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup for viewing and editing animal details*/}
      {showModal && selected && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selected.imageUrl} alt={selected.name} className="modal-image" />
            <h2>{selected.name}</h2>
            <p><strong>Scientific Name:</strong> {selected.scientificName}</p>
            <p><strong>Habitat:</strong> {selected.habitat}</p>
            <p><strong>Description:</strong> {selected.description}</p>
            <p><strong>Your Notes:</strong></p>
            <textarea
              value={selected.notes}
              onChange={e => setSelected({ ...selected, notes: e.target.value })}
              rows={3}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => handleEdit(selected.sightingId, selected.notes)}
                className="modal-btn edit"
              >
                Save Notes
              </button>
              <button
                onClick={() => handleDelete(selected.sightingId)}
                className="modal-btn delete"
              >
                Delete Log
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="modal-btn close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};