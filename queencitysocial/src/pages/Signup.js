import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Photos/CapstoneLogo.png';
import '../css/main.css';

const Signup = ({ setIsLogin }) => {
  const navigate = useNavigate();

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
        navigate('/account');
      } else {
        alert(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card border-0 shadow-lg" style={{ borderRadius: '20px', maxWidth: '1000px' }}>
        <div className="row g-0">
          {/* Illustration Section */}
          <div className="col-md-6" style={{ backgroundColor: '#9CB4B4', borderRadius: '20px 0 0 20px' }}>
            <div className="d-flex align-items-center justify-content-center h-100 p-4" style={{ backgroundColor:'#85baa1', borderRadius: '20px 0 0 20px'}} >
              <a href='/home'>
                <img
                  src="https://raw.githubusercontent.com/kianatruong03/SoftwareCapstone/refs/heads/tariq-dev/queencitysocial/public/undraw_Newspaper_re_syf5-removebg-preview.png"
                  alt="Signup Illustration"
                  className="img-fluid"
                  style={{ maxWidth: '100%' }}
                />
              </a>
            </div>
          </div>

          {/* Form Section */}
          <div className="col-md-6">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center gap-2 mb-5">
                  <img 
                    src={Logo} 
                    alt="Logo" 
                    className="img-fluid" 
                    style={{ maxWidth: '80%' }}
                  />
                </div>
                <h2 className="mb-4">Create Account</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    style={{ 
                      backgroundColor: '#E8F5E9',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '12px 20px'
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    style={{ 
                      backgroundColor: '#E8F5E9',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '12px 20px'
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                    style={{ 
                      backgroundColor: '#E8F5E9',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '12px 20px'
                    }}
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    style={{ 
                      backgroundColor: '#E8F5E9',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '12px 20px'
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100 mb-4"
                  style={{ 
                    backgroundColor: '#9CB4B4',
                    color: 'white',
                    borderRadius: '25px',
                    padding: '12px',
                    border: 'none'
                  }}
                >
                  Sign Up
                </button>
              </form>

              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <span
                    onClick={() => setIsLogin(true)}
                    style={{ 
                      cursor: 'pointer', 
                      color: '#0000EE',
                      textDecoration: 'underline'
                    }}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;