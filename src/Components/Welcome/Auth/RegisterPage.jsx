import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/apiService';
import './RegisterPage.css';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser({ userName, email, password });
      if (response.ok) {
        navigate('/login');
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