import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { FaCaretDown } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import DoctorSlider from '../components/DoctorSlider';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate, } from 'react-router-dom';

function Home() {

    const [userId, setUserId] = useState(null);

    const location = useLocation();
    const isLoggedIn = getLoginStatus(); // Get the isLoggedIn value from the local storage

    // Show the login button only if the user is not logged in and not coming from the login page
    const showLoginButton = !isLoggedIn && !(location.state && location.state.fromLogin);

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
            <div className="search-filters-container">
                <div className="row-1">
                    <div className="select-box">
                        <select name="" id="">
                            <option value="">Location</option>
                            <option value="">Location 1</option>
                            <option value="">Location 2</option>
                            <option value="">Location 3</option>
                            <option value="">Location 4</option>
                        </select>
                        <FaCaretDown className="chevron-down"/>
                    </div>
                    <div className="select-box">
                        <select name="" id="">
                            <option value="">Date</option>
                            <option value="">Date 1</option>
                            <option value="">Date 2</option>
                            <option value="">Date 3</option>
                            <option value="">Date 4</option>
                        </select>
                        <FaCaretDown className="chevron-down"/>
                    </div>
                    <div className="select-box">
                        <select name="" id="">
                            <option value="">Hour</option>
                            <option value="">Hour 1</option>
                            <option value="">Hour 2</option>
                            <option value="">Hour 3</option>
                            <option value="">Hour 4</option>
                        </select>
                        <FaCaretDown className="chevron-down"/>
                    </div>
                    <div className="select-box">
                        <select name="" id="">
                            <option value="">Insurance </option>
                            <option value="">Available</option>
                            <option value="">Not Available</option>
                        </select>
                        <FaCaretDown className="chevron-down"/>
                    </div>
                </div>
                <div className="row-2">
                    <div className="select-box">
                        <select name="" id="">
                            <option value="">Category</option>
                            <option value="">Category 1</option>
                            <option value="">Category 2</option>
                            <option value="">Category 3</option>
                            <option value="">Category 4</option>
                        </select>
                        <FaCaretDown className="chevron-down"/>
                    </div>
                    <div className="search-icon-container" onClick={navigateToDoctorsPage}>
                        <BiSearch className='search-icon' />
                    </div>
                </div>
            </div>
        </div>
        <DoctorSlider />
        <Footer />
    </div>
  )
}

export default Home