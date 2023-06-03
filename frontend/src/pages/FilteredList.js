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

    // const [doctors, setDoctors] = useState([]);
    // const [previousPage, setPreviousPage] = useState('');
    // const [nextPage, setNextPage] = useState('');
    
  
    // useEffect(() => {
    //   fetchData('http://localhost:8000/doctors/scraped/');
    // }, []);
  
    // const fetchData = async (url) => {
    //   try {
    //     const response = await axios.get(url);
    //     const { results, previous, next } = response.data;
    //     setDoctors(results);
    //     setPreviousPage(previous);
    //     setNextPage(next);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    // const handlePreviousPage = () => {
    //   if (previousPage) {
    //     fetchData(previousPage);
    //   }
    // };
  
    // const handleNextPage = () => {
    //   if (nextPage) {
    //     fetchData(nextPage);
    //   }
    // };

    const [doctors, setDoctors] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    fetchDoctors('http://localhost:8000/doctors/scraped');
    fetchLocationOptions('http://localhost:8000/doctors/locations/?limit=30');
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchDoctorsWithLocation();
    }
  }, [selectedLocation]);

  const fetchDoctors = async (url) => {
    try {
      const apiUrl = selectedLocation ? `${url}?location=${selectedLocation}` : url;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDoctors(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDoctorsWithLocation = async () => {
    try {
      const response = await fetch(`http://localhost:8000/doctors/scraped?location=${selectedLocation}`);
      const data = await response.json();
      setDoctors(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
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
                //name="specialty" id="specialty" value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}
                 >
                <option value="">Select a specialty</option>
                {/* {specialties.map((specialty, index) => (
                    <option key={index} value={specialty.speciality}>
                        {specialty.speciality}
                    </option>
                ))} */}
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
            </div>
        <div className="filtered-data">
            {/* <div className="doctor">
                <div className="data">
                    <div className="doctor-img">
                        <img src={doctorImg} alt="doctorIMg" />
                    </div>
                    <div className="doctor-info">
                        <h3>Dr. Mohammad Deeb, ENT PHY</h3>
                        <h5>Ear-Nose-Throat physician</h5>
                        <h6>Kolan British Hospital - located in Kyrenia</h6>
                        <div className="rating">
                            <AiFillStar className='star-filled-icon'/>
                            <AiFillStar className='star-filled-icon'/>
                            <AiFillStar className='star-filled-icon'/>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button>Read Feedback</button>
                    <button>Check Schedule</button>
                </div>
            </div> */}

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
                                    <AiFillStar className='star-filled-icon'/>
                                    <AiFillStar className='star-filled-icon'/>
                                    <AiFillStar className='star-filled-icon'/>
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

            {/* <div className="doctor">
                <div className="data">
                    <div className="doctor-img">
                        <img src={doctorImg} alt="doctorIMg" />
                    </div>
                    <div className="doctor-info">
                        <h3>Dr. Mohammad Deeb, ENT PHY</h3>
                        <h5>Ear-Nose-Throat physician</h5>
                        <h6>Kolan British Hospital - located in Kyrenia</h6>
                        <div className="rating">
                            <AiFillStar className='star-filled-icon'/>
                            <AiFillStar className='star-filled-icon'/>
                            <AiFillStar className='star-filled-icon'/>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button>Read Feedback</button>
                    <button>Check Schedule</button>
                </div>
            </div>
            <div className="doctor">
                <div className="data">
                    <div className="doctor-img">
                        <img src={doctorImg} alt="doctorIMg" />
                    </div>
                    <div className="doctor-info">
                        <h3>Dr. Mohammad Deeb, ENT PHY</h3>
                        <h5>Ear-Nose-Throat physician</h5>
                        <h6>Kolan British Hospital - located in Kyrenia</h6>
                        <div className="rating">
                            <AiFillStar className='star-filled-icon'/>
                            <AiFillStar className='star-filled-icon'/>
                            <AiFillStar className='star-filled-icon'/>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button>Read Feedback</button>
                    <button>Check Schedule</button>
                </div>
            </div> */}
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