import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Forgot from './Components/Forgot';
import TopBar from './Components/TopBar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </div>
  );
}

export default App;
