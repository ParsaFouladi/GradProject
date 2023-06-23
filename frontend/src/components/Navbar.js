import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const isOnDoctorsPage = location.pathname === '/doctors';

    let accountUrl = '';
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');
        

        if (role === 'doctor') {
            accountUrl = `/doctors/${userId}`;
        } else if (role === 'patient') {
            accountUrl = `/patients/${userId}`;
        } else {
        // Handle the case when the role is unknown or not set
        // You can redirect the user to an error page or a default account page
        // navigate('/error');
        }

  return (
    <div className='navigation-bar'>
        <ul className='nav-links'>
                <li>
                    {isOnDoctorsPage ? (
                        <Link to="/" className='nav-link'>Home</Link>
                    ) : (
                        <Link to="/doctors" className='nav-link'>Our Doctors</Link>
                    )}
                </li>
                <li>
                    <Link to={accountUrl} className='nav-link'>Account</Link>
                </li>
                <li>
                    <a href="#footer" className='nav-link'>About</a>
                </li>
                
                <li>
                    <a href="#footer" className='nav-link'>Contact Us</a>
                </li>
        </ul>
    </div>
  )
}

export default Navbar