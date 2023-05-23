import React from 'react'

function Navbar() {
  return (
    <div className='navigation-bar'>
        <ul className='nav-links'>
                <li>
                    <a className='nav-link' href="#">Services</a>
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