import { useState, useEffect } from 'react';
import './CollectionPage.css';

export const CollectionPage = () => {
  const [myCollection, setMyCollection] = useState([]);
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    const fetchMyCollection = async () => {
      try {
        const response = await fetch(`http://localhost:8088/Sightings?userId=${loggedInUser.id}`);
        const sightings = await response.json();

        const animalPromises = sightings.map(async sighting => {
          const animalResponse = await fetch(`http://localhost:8088/Animals/${sighting.animalId}`);
          const animal = await animalResponse.json();
          return { ...animal, sightingId: sighting.id, notes: sighting.notes, sighting: sighting };
        });
        const animals = await Promise.all(animalPromises);
        setMyCollection(animals);
      } catch (error) {
        console.error('Error fetching collection:', error);
      }
    };
    if (loggedInUser) {
      fetchMyCollection();
    }
  }, []);

  const handleDelete = async (sightingId) => {
    await fetch(`http://localhost:8088/Sightings/${sightingId}`, { method: "DELETE" });
    setMyCollection(myCollection.filter(a => a.sightingId !== sightingId));
    setShowModal(false);
  };

  const handleEdit = async (sightingId, newNotes) => {
    await fetch(`http://localhost:8088/Sightings/${sightingId}`, {
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

      {showModal && selected && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={event => event.stopPropagation()}>
            <img src={selected.imageUrl} alt={selected.name} className="modal-image" />
            <h2>{selected.name}</h2>
            <p><strong>Scientific Name:</strong> {selected.scientificName}</p>
            <p><strong>Habitat:</strong> {selected.habitat}</p>
            <p><strong>Description:</strong> {selected.description}</p>
            <p><strong>Your Notes:</strong></p>
            <textarea
              value={selected.notes}
              onChange={event => setSelected({ ...selected, notes: event.target.value })}
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