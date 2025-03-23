// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import ViewPlan from './components/ViewPlan';
// import Community from './pages/Community';
// import CalorieIntake from './components/CalorieIntake';
// import Settings from './pages/Settings';
// import ChangePassword from './pages/ChangePassword';

// function App() {
//   return (
    
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Register/>}></Route>
//         <Route path="/dashboard" element={<Dashboard/>}></Route>
//         <Route path="/view-plan" element={<ViewPlan/>}></Route>
//         <Route path="/community" element={<Community />} />
//         <Route path='/calorie' element={<CalorieIntake/>}></Route>
//         <Route path='/setting' element={<Settings/>}></Route>
//         <Route path='/change-password' element={<ChangePassword/>}></Route>
//       </Routes>
//     </Router>
    
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ViewPlan from './components/ViewPlan';
import Community from './pages/Community';
import CalorieIntake from './components/CalorieIntake';
import Settings from './pages/Settings';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/view-plan" element={<ViewPlan />} />
      <Route path="/community" element={<Community />} />
      <Route path="/calorie" element={<CalorieIntake />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
