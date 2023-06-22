import React, { useEffect, useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineUserCircle, HiCalendarDays, HiOutlineLanguage } from "react-icons/hi";
import { FaEarthAsia } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import { MdOutlineLanguage } from "react-icons/md";
import { GiEarthAmerica } from "react-icons/gi";
import {  BsCalendarRange } from "react-icons/bs";
import { BiMaleFemale } from "react-icons/bi";
import axios from '../api/axios';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


function Account() {

    const [patient, setPatient] = useState(null);
  const patientId = localStorage.getItem('userId');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8000/patients/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.log('Error fetching patient data:', error);
        return null;
      }
    };

    if (patientId) {
      fetchPatientData(patientId)
        .then((patientData) => {
          if (patientData) {
            setPatient(patientData);
          } else {
            console.log('Failed to fetch patient data');
          }
        })
        .catch((error) => {
          console.log('Error fetching patient data:', error);
        });
    }
  }, [patientId]);

  // Retrieve the booked timeslot from localStorage
  const bookedTimeslot = JSON.parse(localStorage.getItem('bookedTimeslot'));

  // Extract the start_time and end_time from the bookedTimeslot object
  const { start_time, end_time } = bookedTimeslot || {};
  
  const handleLogout = () => {
    // Clear the isLoggedIn value from local storage
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    
    localStorage.removeItem('userId');
    localStorage.removeItem('bookedTimeslot');
    
  
    // Redirect the user to the login page or perform any desired navigation
    navigate("/")
  };


  return (
    <div className='account'>
        <div className="oval-horizontal"></div>
        <div className="oval-vertical"></div>
        <div className="container">
            <div className="header">
                <h2>Medfinder Account</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
            
            {patient ? (
              <>
                 <div className="body">
                <div className="left-side">
                    <div className="image-container">
                        {/* <AiOutlineUser className="user-icon" /> */}
                        <img src={patient.image} style={{width: "140px", height: "140px", borderRadius: "50%"}} alt="" />
                    </div>
                    <h2>{patient.first_name} {patient.last_name}</h2>
                    <h4>{patient.user.username}</h4>
                    <h2>Personal information</h2>
                </div>
                <div className="right-side">
                    <h1>Personal information</h1>
                    <p>Manage your personal information, including phone number and email address where you can be contacted</p>
                    <div className="wrapper">
                        <div className="box">
                            <div className="data">
                                <h4>Name</h4>
                                <p>{patient.first_name} {patient.last_name}</p>
                            </div>
                            <div className="icon">
                                <HiOutlineUserCircle className="box-icon"/>
                            </div>
                        </div>
                        <div className="box">
                            <div className="data">
                                <h4>Date Of Birth</h4>
                                <p>{patient.birth_date}</p>
                            </div>
                            <div className="icon">
                                <BsCalendarRange className="box-icon"/>
                            </div>
                        </div>
                        <div className="box">
                            <div className="data">
                                <h4>Country/Region</h4>
                                <p>{patient.address}</p>
                            </div>
                            <div className="icon">
                                <GiEarthAmerica className="box-icon"/>
                            </div>
                        </div>
                        <div className="box">
                            <div className="data">
                                <h4>Language</h4>
                                <p>English (UK)</p>
                            </div>
                            <div className="icon">
                                <MdOutlineLanguage className="box-icon"/>
                            </div>
                        </div>
                        <div className="box">
                            <div className="data">
                                <h4>Phone Number</h4>
                                <p>{patient.phone_number}</p>
                            </div>
                            <div className="icon">
                                <AiOutlinePhone className="box-icon"/>
                            </div>
                        </div>
                        <div className="box">
                            <div className="data">
                                <h4>Gender</h4>
                                <p>{patient.gender}</p>
                            </div>
                            <div className="icon">
                                <BiMaleFemale className="box-icon"/>
                            </div>
                        </div>
                        {localStorage.getItem("bookedTimeslot") && (
                          <div className="box">
                            <div className="data">
                                <h4>Appointment</h4>
                                <p>{start_time} - {end_time}</p>
                            </div>
                            <div className="icon">
                                <BiMaleFemale className="box-icon"/>
                            </div>
                          </div>
                        )}
                    </div>
                </div>
            </div> 
              </>
            ) : (
              <p>Loading patient data...</p>
            )}
        </div>
        <Footer />
    </div>
  )
}

export default Account