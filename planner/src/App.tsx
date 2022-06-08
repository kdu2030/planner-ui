import React, { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Forgot from './Components/Forgot';
import TopBar from './Components/TopBar';
import Verify from './Components/Verify';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<Verify email="test@test.com"/>} />
      </Routes>
    </div>
  );
}

export default App;
