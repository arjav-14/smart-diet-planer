import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ViewPlan from './components/ViewPlan';
import Community from './pages/Community';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/view-plan" element={<ViewPlan/>}></Route>
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
