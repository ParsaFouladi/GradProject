import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { FaCaretDown } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import DoctorSlider from '../components/DoctorSlider';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import axios from '../api/axios';

function Home() {

    const [userId, setUserId] = useState(null);

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


    const location = useLocation();
    const isLoggedIn = getLoginStatus(); // Get the isLoggedIn value from the local storage

    // Show the login button only if the user is not logged in and not coming from the login page
    const showLoginButton = !isLoggedIn && !(location.state && location.state.fromLogin);

    useEffect(() => {
        fetchLocationOptions();
        fetchSpecialtyOptions();
        fetchInsuranceOptions();
      }, []);

    const navigate = useNavigate();

    const navigateToDoctorsPage = () => {
        navigate('/doctors');
      };

    function getLoginStatus() {
        return localStorage.getItem('isLoggedIn') === 'true';
      }

      const handleLogout = () => {
        // Clear the isLoggedIn value from local storage
        localStorage.removeItem('isLoggedIn');
      
        // Perform any additional logout-related tasks (e.g., clearing user data)
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
      
        // Redirect the user to the login page or perform any desired navigation
        navigate("/")
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

      const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
      };
    
      const handleInsuranceChange = (event) => {
        const insurance = event.target.value;
        setSelectedInsurance(insurance);
      };

      const generateExperienceOptions = () => {
        const options = [0, 5, 10, 15, 20, 25];
        return options;
      };

      

  return (
    <div className='home-page'>
        <div className="oval-horizontal"></div>
        <div className="oval-vertical"></div>
        <div className="header">
            <div className="buttons">
            {isLoggedIn ? (
            // Render the logout button
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            ) : (
            // Render the login button
            <Link to="/login"><button className="login-button">Login</button></Link>
            )}
                <Link to="/signup"><button className="signup-button">Sign Up</button></Link>
            </div>
            <Navbar />
        </div>
        <div className="main-container container">
            <h1>Find the <span>Best & Nearest Doctor</span><br /> for you and find the time and price that suit you</h1>
            <p>We provide various kind of services for your experience to be unique!</p>
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
                <div className="search-icon-container" onClick={navigateToDoctorsPage}>
                <BiSearch className='search-icon'/>
                </div>
                {/* <button onClick={handleResetFilters} className='reset-filters-btn'><BiReset className='reset-icon'/>Reset Filters</button> */}
          </div>
        </div>
        <DoctorSlider />
        <Footer />
    </div>
  )
}

export default Home