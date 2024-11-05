import React from 'react';
import './App.css';

const Login = ({ setIsLogin }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch('http://localhost:5001/auth/login', { // updated port to 5001
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Login successful');
        console.log('Token:', data.token); // Store the token for authenticated routes
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src="https://raw.githubusercontent.com/kianatruong03/SoftwareCapstone/refs/heads/tariq-dev/queencitysocial/public/undraw_festivities_tvvj__1_-removebg-preview.png" alt="Login Illustration" />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email Address:
            <input type="email" name="email" className="input-field" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" className="input-field" required />
          </label>
          <button type="submit" className="login-button">Go!</button>
        </form>
        <p>
          Don't have an account? <a onClick={() => setIsLogin(false)}>Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
