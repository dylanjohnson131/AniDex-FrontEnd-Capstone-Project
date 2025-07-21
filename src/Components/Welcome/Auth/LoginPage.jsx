import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      const data = await response.json();

      if (data.length === 1) {
        localStorage.setItem('user', JSON.stringify(data[0]));
        navigate('/home'); 
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError("Incorrect email or password. Don't have an account? Sign up now!");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome Back!</h1>
      <p>Please log in to continue</p>
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign up now!</Link>
        </p>
      </form>
    </div>
  );
};
