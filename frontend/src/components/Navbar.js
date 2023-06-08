import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navigation-bar'>
        <ul className='nav-links'>
                <li>
                    <Link to="/doctors" className='nav-link'>Our Doctors</Link>
                </li>
                <li>
                    <a className='nav-link' href="#">About</a>
                </li>
                <li>
                    <a className='nav-link' href="#">Account</a>
                </li>
                <li>
                    <a className='nav-link' href="#">Contact Us</a>
                </li>
        </ul>
    </div>
  )
}

export default Navbar