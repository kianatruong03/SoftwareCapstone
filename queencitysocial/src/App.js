// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './login';   // Import Login component
// import Signup from './signup'; // Import Signup component
// import './AccountManagement.css';
// import AccountManagement from './AccountManagement';

// function App() {
//   const [isLogin, setIsLogin] = useState(true); // State to choose between login and signup

//   return (
//     <>
//       <Router>
//         <Routes>
//           {/* Redirect the root path "/" to "/account" */}
//           <Route path="/" element={<Navigate to="/account" replace />} />
          
//           {/* The Account Management page */}
//           <Route path="/account" element={<AccountManagement />} />
//         </Routes>
//       </Router>
      
//       <div className="App">
//         <header className="App-header">
//           {/* Render Login or Signup based on the state */}
//           {isLogin ? <Login setIsLogin={setIsLogin} /> : <Signup setIsLogin={setIsLogin} />}
//         </header>
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Login from './login';
import Signup from './signup';
import AccountManagement from './AccountManagement';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is logged in
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authenticated to true upon successful login
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        // Render AccountManagement component when logged in
        <AccountManagement />
      ) : (
        // Show Login or Signup based on `isLogin`
        isLogin ? (
          <Login setIsLogin={setIsLogin} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )
      )}
    </div>
  );
};

export default App;
