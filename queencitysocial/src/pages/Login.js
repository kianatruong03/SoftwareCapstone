import '../css/main.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        console.log('Token:', data.token);
        onLoginSuccess();
        navigate('/account');
      } else {
        alert(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card border rounded-3 shadow-lg overflow-hidden" style={{ maxWidth: '1000px' }}>
        <div className="row g-0">
          {/* Left side - Login Form */}
          <div className="col-md-6 p-4">
            <div className="text-center mb-5">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-5">
                <a href='/'>
                <img 
                  src={Logo} 
                  alt="QueenCitySocial Logo" 
                  className="img-fluid" 
                  style={{ maxWidth: '70%' }}
                />
                </a>
              </div>
              <h2 className="mb-4">Login</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input 
                  type="email" 
                  name="email" 
                  className="form-control form-control bg-light" 
                  placeholder="Email Address" 
                  required 
                  style={{ backgroundColor: '#E8F5E9',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 20px' }}
                />
              </div>
              <div className="mb-5">
                <input 
                  type="password" 
                  name="password" 
                  className="form-control form-control bg-light" 
                  placeholder="Password" 
                  required 
                  style={{ backgroundColor: '#E8F5E9',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 20px'}}
                />
              </div>
              <div className="d-grid gap-2 mb-5">
                <button 
                  type="submit" 
                  className="btn btn-lg"
                  style={{ 
                    backgroundColor: '#A4B7B9',
                    color: 'white',
                    borderRadius: '25px'
                  }}
                >
                  Login
                </button>
              </div>
            </form>
            
            <div className="text-center">
              <p className="mb-0">
                Don't have an account?{' '}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-primary"
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  Create Account
                </span>
              </p>
            </div>
          </div>
          
          {/* Right side - Illustration */}
          <div className="col-md-6" style={{ backgroundColor: '#A4B7B9' }}>
            <div className="h-100 d-flex align-items-center justify-content-center p-4">
              <img
                src="https://raw.githubusercontent.com/kianatruong03/SoftwareCapstone/refs/heads/tariq-dev/queencitysocial/public/undraw_festivities_tvvj__1_-removebg-preview.png"
                alt="Login Illustration"
                className="img-fluid"
                style={{ maxWidth: '120%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;