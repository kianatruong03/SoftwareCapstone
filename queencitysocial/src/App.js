import React, { useState } from 'react';
import './App.css';
import Login from './login';   // Import Login component
import Signup from './signup'; // Import Signup component

function App() {
  const [isLogin, setIsLogin] = useState(true); // State to choose between login and signup

  return (
    <div className="App">
      <header className="App-header">
        {/* Render Login or Signup based on the state */}
        {isLogin ? <Login setIsLogin={setIsLogin} /> : <Signup setIsLogin={setIsLogin} />}
      </header>
    </div>
  );
}

export default App;
