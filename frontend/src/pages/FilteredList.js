import React from 'react'
import { BsBell } from "react-icons/bs";
import Navbar from '../components/Navbar';
import { FaCaretDown } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FilteredList() {

  const [doctors, setDoctors] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [resetFilters, setResetFilters] = useState(false);
  const [doctorRatings, setDoctorRatings] = useState({});

  useEffect(() => {
    fetchDoctors('http://localhost:8000/doctors/scraped');
    fetchLocationOptions('http://localhost:8000/doctors/locations/?limit=30');
    fetchSpecialtyOptions('http://localhost:8000/doctors/specialities/?limit=533');
  }, []);

  useEffect(() => {
    if (selectedLocation || selectedSpecialty || resetFilters) {
      fetchDoctorsWithFilters();
    }
  }, [selectedLocation, selectedSpecialty, resetFilters]);

  const fetchDoctors = async (url) => {
    try {
      const apiUrl = buildApiUrl(url);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDoctors(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
      await fetchDoctorRatings(data.results);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDoctorsWithFilters = async () => {
    try {
      const baseUrl = 'http://localhost:8000/doctors/scraped';
      let apiUrl = buildApiUrl(baseUrl);
  
      if (resetFilters) {
        setSelectedLocation('');
        setSelectedSpecialty('');
        setResetFilters(false);
        apiUrl = baseUrl;
      }
  
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDoctors(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
      await fetchDoctorRatings(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const buildApiUrl = (baseUrl) => {
    let apiUrl = baseUrl;
    if (selectedLocation) {
      apiUrl += `?location=${selectedLocation}`;
    }
    if (selectedSpecialty) {
      apiUrl += `${selectedLocation ? '&' : '?'}speciality=${selectedSpecialty}`;
    }
    return apiUrl;
  };

  const fetchLocationOptions = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLocationOptions(data.results);
    } catch (error) {
      console.error('Error fetching location options:', error);
    }
  };

  const fetchSpecialtyOptions = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSpecialtyOptions(data.results);
    } catch (error) {
      console.error('Error fetching specialty options:', error);
    }
  };

  const fetchDoctorRatings = async (doctors) => {
    try {
      const ratingsPromises = doctors.map(async (doctor) => {
        const response = await fetch(`http://localhost:8000/doctors/reviews/${doctor.id}`);
        const data = await response.json();
        return { doctorId: doctor.id, rating: data.rating };
      });
      const ratings = await Promise.all(ratingsPromises);
      const ratingsObj = {};
      ratings.forEach((rating) => {
        ratingsObj[rating.doctorId] = rating.rating;
      });
      setDoctorRatings(ratingsObj);
    } catch (error) {
      console.error('Error fetching doctor ratings:', error);
    }
  };


  const handleNextPage = () => {
    if (nextPage) {
      fetchDoctors(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchDoctors(previousPage);
    }
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
  };
  
  const handleSpecialtyChange = (event) => {
    const specialty = event.target.value;
    setSelectedSpecialty(specialty);
  };

  const handleResetFilters = () => {
    setResetFilters(true);
  };

  return (
    <div className='filtered-list-page'>
        <div className="oval-horizontal"></div>
        <div className="oval-vertical"></div>
        <div className="header">
            <button>Logout</button>
            <div className="right-side">
                <div className="bell-icon-container">
                    <BsBell className='bell-icon'/>
                </div>
                <Navbar />
            </div>
        </div>
        <div className="container">
        <div className="search-box">
            <div className="select-box">
                <select 
                    name="specialty"
                    id="specialty"
                    value={selectedSpecialty}
                    onChange={handleSpecialtyChange}
                 >
                    <option value="">Select a specialty</option>
                    {specialtyOptions.map((option, index) => (
                        <option key={index} value={option.speciality}>
                        {option.speciality}
                        </option>
                    ))}
                </select>
                <FaCaretDown className="chevron-down"/>
            </div>
            <div className="select-box">
                <select 
                name="location" id="location" value={selectedLocation} onChange={handleLocationChange}
                >
                <option value="">Select a country</option>
                {locationOptions.map((option, index) => (
                    <option key={index} value={option.location}>{option.location}</option>
                ))}
                </select>
                <FaCaretDown className="chevron-down"/>
            </div>
            <div className="select-box">
                <select name="" id="">
                    <option value="">14:00 - 16:00</option>
                    <option value="">Hour 1</option>
                    <option value="">Hour 2</option>
                    <option value="">Hour 3</option>
                    <option value="">Hour 4</option>
                </select>
                <FaCaretDown className="chevron-down"/>
            </div>
            <div className="select-box">
                <select name="" id="">
                    <option value="">Insu. Available</option>
                    <option value="">Insu. Not Available</option>
                </select>
                <FaCaretDown className="chevron-down"/>
            </div>
            <div className="select-box">
                <select name="" id="">
                   <option value="">Male</option>
                    <option value="">Female</option>
                </select>
                <FaCaretDown className="chevron-down"/>
            </div>
            <div className="select-box">
                <select name="" id="">
                    <option value="">Physician</option>
                    <option value="">Other</option>
                </select>
                <FaCaretDown className="chevron-down"/>
            </div>
                <div className="search-icon-container">
                <BiSearch className='search-icon'/>
                </div>
                <button onClick={handleResetFilters} className='reset-filters-btn'>Reset Filters</button>
            </div>
        <div className="filtered-data">

            {doctors.map((doctor) => (
                    <div key={doctor.id} className="doctor">

                        <div className="data">
                            <div className="doctor-img">
                                <img src={doctor.image_url} alt="doctorIMg" />
                            </div>
                            <div className="doctor-info">
                                <h3>{doctor.name}</h3>
                                <h5>{doctor.speciality}</h5>
                                <h6>{doctor.location}</h6>
                                <div className="rating">
                                    {[...Array(doctorRatings[doctor.id] || 0)].map((_, index) => (
                                        <AiFillStar key={index} className='star-filled-icon' />
                                    ))}
                                </div>                 
                            </div>
                        </div>
                        <div className="buttons">
                        <Link to={`/doctordetails/${doctor.id}`} className="read-feedback-button">
                            <button>Read Feedback</button>
                        </Link>
                            
                            <button>Check Schedule</button>
                        </div>

                    </div>
                ))}
        </div>
        <div className="navigation-buttons">
            <button onClick={handlePreviousPage} disabled={!previousPage}>Previous</button>
            <button onClick={handleNextPage} disabled={!nextPage}>Next</button>
        </div>
        </div>
    </div>
  )
}

export default FilteredList