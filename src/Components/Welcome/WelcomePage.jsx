import { Link } from 'react-router-dom';
import './WelcomePage.css';

// create and export the WelcomePage component to display the welcome page.
// It provides links to the login and registration pages.
export const WelcomePage = () => {
 return (
  <div className="welcome-container">
    <h1 className="welcome-title">Welcome to AniDex</h1>
    <p>Gotta Find Them All!</p>
    <div className="welcome-buttons">
      <Link to="/login" className="welcome-button">Login</Link>
      <Link to="/register" className="welcome-button">Sign Up</Link>
    </div>
  </div>
 );
}
