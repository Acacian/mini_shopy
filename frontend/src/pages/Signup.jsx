import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        username,
        password,
        email,
      });
      console.log('Signup successful', response.data);
    } catch (error) {
      console.error('Signup error', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
