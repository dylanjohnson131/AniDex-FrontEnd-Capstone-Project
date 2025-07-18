import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
// create and export the RegisterPage component to handle user registration
// and redirects the user to the login on success
export const RegisterPage = () => {
  const navigate = useNavigate();
  // State to hold userName, email, password, and error messages
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
// handle the registration form submission process
// event.preventDefault() prevents the default form submission behavior (page reload).
// attempts to fetch user data from the database. If successful, redirects
// the user to the login page.
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, password }),
      });
      if (response.ok) {
        // Registration successful
        navigate('/login');
        //Shows a specific error message if the registration fails, or
        // a general error if there is a network/server error.
      } else {
        setError('Registration failed. Try again.');
      }
    } catch (error) {
      setError('Error registering user.');
    }
  };

  return (
    <div className="register-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};