import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import FilteredList from './pages/FilteredList';
import Signup from './pages/Signup';
import DoctorDetails from './pages/DoctorDetails';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorHome from './pages/DoctorHome';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/doctorpanel" element={<DoctorHome />} />
      <Route path="/doctordetails/:id" element={<DoctorDetails/>} />
      <Route path="/doctors" element={<FilteredList />} />
    </Routes>
  );
}

export default App;

