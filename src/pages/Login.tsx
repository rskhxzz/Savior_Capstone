import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ambil data pengguna dari API atau database
      const response = await axios.get('http://localhost:5000/users');
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert(`Welcome, ${user.name}!`);
        // Menyimpan status login ke localStorage
        localStorage.setItem('user', JSON.stringify(user)); 
        navigate('/home'); // Redirect ke halaman home setelah login
      } else {
        alert('Invalid email or password!');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
