import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [recentSightings, setRecentSightings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  
    const fetchSightings = async () => {
      if (!loggedInUser) return;
      const sightingsResponse = await fetch(`http://localhost:8088/Sightings?userId=${loggedInUser.id}`);
      const sightings = await sightingsResponse.json();

      const animalPromises = sightings.map(async sighting => {
        const animalResponse = await fetch(`http://localhost:8088/Animals/${sighting.animalId}`);
        const animal = await animalResponse.json();
        return {
          id: sighting.id,
          name: animal.name,
          imageUrl: animal.imageUrl,
          notes: sighting.notes,
          date: sighting.date
        };
      });

      const recent = await Promise.all(animalPromises);
      setRecentSightings(recent);
    };

    fetchSightings();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="home-container">
      <header className="welcome-header">
        <h1>Welcome Back, {user ? user.userName : "Guest"}</h1>
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>   
      </header>
      
      <section className="recents-section">
        <h2>Recents</h2>
        <div className="recents-grid">
          {recentSightings.map(sighting => (
            <div key={sighting.id} className="recent-card">
              <img src={sighting.imageUrl} alt={sighting.name} />
              <h3>{sighting.name}</h3>
              <p>{sighting.notes}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}