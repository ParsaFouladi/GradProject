import React, { useRef } from 'react'
import { BsBell } from "react-icons/bs";
import Navbar from '../components/Navbar';
import { FaCaretDown } from "react-icons/fa";
import { BiSearch, BiReset } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from '../api/axios';

function FilteredList() {

  const [doctors, setDoctors] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [resetFilters, setResetFilters] = useState(false);
  const [doctorRatings, setDoctorRatings] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const isLoggedIn = getLoginStatus();

  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors('http://localhost:8000/doctors/scraped');
    fetchLocationOptions();
    fetchSpecialtyOptions();
    fetchInsuranceOptions();
  }, []);

  useEffect(() => {
    if (selectedLocation || selectedSpecialty || selectedExperience || resetFilters || selectedInsurance || searchQuery) {
      fetchDoctorsWithFilters();
    }
  }, [selectedLocation, selectedSpecialty, selectedExperience, resetFilters, selectedInsurance, searchQuery]);

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
        setSelectedExperience('');
        setResetFilters(false);
        apiUrl = baseUrl;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      const filteredDoctors = data.results;

      console.log(filteredDoctors);

      // Fetch and update doctor ratings for filtered doctors
      await fetchDoctorRatings(filteredDoctors);

      setDoctors(filteredDoctors);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const buildApiUrl = (baseUrl) => {
    let apiUrl = baseUrl;
    const params = [];

    if (selectedLocation) {
      params.push(`location=${selectedLocation}`);
    }

    if (selectedSpecialty) {
      params.push(`specialty=${selectedSpecialty}`);
    }

    if (selectedExperience) {
      params.push(`experiance=${selectedExperience}`);
    }

    if (selectedInsurance) {
      params.push(`insurance=${selectedInsurance}`);
    }
    
    if (searchQuery) {
      params.push(`search=${encodeURIComponent(searchQuery)}`);
    }

    if (params.length > 0) {
      apiUrl += `?${params.join('&')}`;
    }

    return apiUrl;
  };

  const fetchLocationOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/doctors/locations/?limit=194');
      const data = response.data;
      setLocationOptions(data.results);
    } catch (error) {
      console.error('Error fetching location options:', error);
    }
  };

  const fetchSpecialtyOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/doctors/specialities/?limit=533');
      const data = response.data;
      setSpecialtyOptions(data.results);
    } catch (error) {
      console.error('Error fetching specialty options:', error);
    }
  };

  const fetchInsuranceOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/insurances');
      const data = response.data;
      setInsuranceOptions(data.results);
    } catch (error) {
      console.error('Error fetching insurance options:', error);
    }
  };

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }
    const totalRating = ratings.reduce((accumulator, rating) => accumulator + rating, 0);
    return totalRating / ratings.length;
  };

  const fetchDoctorRatings = async (doctors) => {
    try {
      const ratingsPromises = doctors.map(async (doctor) => {
        const response = await fetch(`http://localhost:8000/doctors/reviews/?doctor_id=${doctor.id}`);
        const data = await response.json();
        const ratings = data.results.map((review) => review.rating);
        const averageRating = calculateAverageRating(ratings);
        return { doctorId: doctor.id, rating: averageRating };
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

  const generateExperienceOptions = () => {
    const options = [0, 5, 10, 15, 20, 25];
    return options;
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
    console.log('Selected Specialty:', specialty);
    setSelectedSpecialty(specialty);
  };

  const handleExperienceChange = (event) => {
    const experience = event.target.value;
    setSelectedExperience(experience);
  };

  const handleResetFilters = () => {
    setResetFilters(true);
  };

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleInsuranceChange = (event) => {
    const insurance = event.target.value;
    setSelectedInsurance(insurance);
  };

  const handleLogout = () => {
    // Clear the isLoggedIn value from local storage
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    
    localStorage.removeItem('userId');
    
  
    // Redirect the user to the login page or perform any desired navigation
    navigate("/")
  };

  function getLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  return (
    <div className='filtered-list-page'>
        <div className="oval-horizontal"></div>
        <div className="oval-vertical"></div>
        <div className="header">
        {isLoggedIn ? (
            // Render the logout button
            <button className="logout-button" onClick={handleLogout} style={{cursor: "pointer"}}>Logout</button>
            ) : (
            // Render the login button
            <Link to="/login"><button className="login-button" style={{cursor: "pointer"}}>Login</button></Link>
            )}
            <div className="right-side">
                {/* <div className="bell-icon-container">
                    <BsBell className='bell-icon'/>
                </div> */}
                <Navbar />
            </div>
        </div>
        <div className="container">
        <div className="search-box">
            <div className="search-input-box">
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </div>    
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
                <select value={selectedExperience} onChange={handleExperienceChange}>
                  <option value="">Select Experience</option>
                  {generateExperienceOptions().map((experience) => (
                    <option key={experience} value={experience}>
                      {experience}+ Years
                    </option>
                  ))}
                </select>
                <FaCaretDown className="chevron-down"/>
            </div>
            <div className="select-box">
              <select
                name="insurance"
                id="insurance"
                value={selectedInsurance}
                onChange={handleInsuranceChange}
              >
                <option value="">Select insurance</option>
                {insuranceOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              <FaCaretDown className="chevron-down" />
            </div>
                <div className="search-icon-container">
                <BiSearch className='search-icon'/>
                </div>
                <button onClick={handleResetFilters} className='reset-filters-btn'><BiReset className='reset-icon'/>Reset Filters</button>
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
                                  {Array.from({ length: Math.floor(doctorRatings[doctor.id] || 0) }, (_, index) => (
                                    <AiFillStar key={index} className='star-filled-icon' />
                                  ))}
                                </div>                 
                            </div>
                        </div>
                        <div className="buttons">
                        <Link to={`/doctordetails/${doctor.id}`} className="read-feedback-button">
                            Read Feedback
                        </Link>
                            
                        <Link to={{ pathname: `/doctordetails/${doctor.id}`, state: { scrollToSection: true } }} className='check-schedule-button'>
                          Check Schedule
                        </Link>
                        </div>

                    </div>
                ))}
        </div>
        <div className="navigation-buttons">
            <button onClick={handlePreviousPage} disabled={!previousPage}>Previous</button>
            <button onClick={handleNextPage} disabled={!nextPage}>Next</button>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default FilteredList