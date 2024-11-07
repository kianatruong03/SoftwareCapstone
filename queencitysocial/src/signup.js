import React from 'react';
import './login_signup.css';
import Logo from './Photos/CapstoneLogo.png';

const Signup = ({ setIsLogin }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch('http://localhost:5001/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully');
        setIsLogin(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="illustration-section">
        <div className="illustration">
          <img src="https://raw.githubusercontent.com/kianatruong03/SoftwareCapstone/refs/heads/tariq-dev/queencitysocial/public/undraw_Newspaper_re_syf5-removebg-preview.png" alt="Signup Illustration" />
        </div>
      </div>
      <div className="form-section">
      <img className="Logo" src={Logo} alt="Profile Avatar" />
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="firstName" placeholder="First Name" required />
          </div>
          <div className="form-group">
            <input type="text" name="lastName" placeholder="Last Name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email Address" required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="switch-form">
          Already have an account? <a onClick={() => setIsLogin(true)}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
