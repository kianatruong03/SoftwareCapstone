import React from 'react';
import './App.css';

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
      const response = await fetch('http://localhost:5001/auth/signup', { // updated port to 5001
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully');
        setIsLogin(true); // Redirect to login
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src="https://raw.githubusercontent.com/kianatruong03/SoftwareCapstone/refs/heads/tariq-dev/queencitysocial/public/undraw_Newspaper_re_syf5-removebg-preview.png" alt="Signup Illustration" />
      </div>
      <div className="form-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" className="input-field" required />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" className="input-field" required />
          </label>
          <label>
            Email Address:
            <input type="email" name="email" className="input-field" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" className="input-field" required />
          </label>
          <button type="submit" className="signup-button">Go!</button>
        </form>
        <p>
          Already have an account? <a onClick={() => setIsLogin(true)}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
