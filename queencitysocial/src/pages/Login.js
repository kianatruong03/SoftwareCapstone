import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Collective.css';
import Logo from '../Photos/CapstoneLogo.png';

const Login = ({ setIsLogin, onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Login successful');
        console.log('Token:', data.token); // Optionally store the token
        onLoginSuccess();
        navigate('/account'); // Redirect to AccountManagement page
      } else {
        alert(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-signup-wrapper">
      <div className="user-container">
        <div className="user-form-section">
          <img className="Logo" src={Logo} alt="Profile Avatar" />
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-form-group">
              <input type="email" name="email" placeholder="Email Address" required />
            </div>
            <div className="user-form-group">
              <input type="password" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="switch-form">
            Don't have an account?{' '}
            <span
              onClick={() => setIsLogin(false)}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            >
              Create Account
            </span>
          </div>
        </div>
        <div className="illustration-section">
          <div className="illustration">
            <img
              src="https://raw.githubusercontent.com/kianatruong03/SoftwareCapstone/refs/heads/tariq-dev/queencitysocial/public/undraw_festivities_tvvj__1_-removebg-preview.png"
              alt="Login Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
