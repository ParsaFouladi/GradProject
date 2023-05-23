import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import FilteredList from './pages/FilteredList';
import Signup from './pages/Signup';
import DoctorDetails from './pages/DoctorDetails';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from './components/NotFound';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <Routes>
      <AuthProvider>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/filteredlist' element={<FilteredList/>}/>
        <Route path='/doctordetails' element={<DoctorDetails/>}/>
        <Route path='*' element={<NotFound/>}/>
      </AuthProvider>
    </Routes>
  )
}

export default App;

