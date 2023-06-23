import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FiChevronsRight} from 'react-icons/fi'
import {BsEmojiKiss, BsEmojiHeartEyes, BsEmojiSunglasses, BsEmojiWink, BsFillTelephoneFill,BsFillHeartFill} from 'react-icons/bs'

export default function Footer() {

    const navigate = useNavigate();

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
    <div className='footer' id='footer'>
        <div className="container ">
            <div className="col about">
                <h2>About Us</h2>
                <p>Welcome to our Physicians' Website! We specialize in web scraping technology to provide you with the most accurate and up-to-date information about physicians in your area. Our user-friendly interface allows you to easily search and find healthcare professionals based on their specialties, certifications, and affiliations. Trust us to simplify your physician search and empower you with the information you need to make informed healthcare decisions.
                </p>

            </div>
            <div className="col team">
                <h2>Meet Our Team</h2>
                <ul className='team-members'>
                    <li>
                        <div className="icon"><BsEmojiSunglasses className='emoji'/></div>
                        <div className="info">
                            <h4>Roa'a Alqaisi</h4>
                            <p><BsFillTelephoneFill/> : 05391051070</p>
                        </div>
                    </li>
                    <li>
                        <div className="icon"><BsEmojiWink className='emoji'/></div>
                        <div className="info">
                            <h4>Parsa Fouladi</h4>
                            <p><BsFillTelephoneFill/> : 05391051070</p>
                        </div>
                    </li>
                    <li>
                        <div className="icon"><BsEmojiHeartEyes className='emoji'/></div>
                        <div className="info">
                            <h4>Dalal Totah</h4>
                            <p><BsFillTelephoneFill/> : 05391051070</p>
                        </div>
                    </li>
                    <li>
                        <div className="icon"><BsEmojiKiss className='emoji'/></div>
                        <div className="info">
                            <h4>Mohammad Murra</h4>
                            <p><BsFillTelephoneFill/> : 05391051070</p>
                        </div>
                    </li>
                </ul>

            </div>
            <div className="col links">
                <h2>Useful Links</h2>
                <ul className='useful-links'>
                    <li>
                        <FiChevronsRight className='arrow-icon'/>
                        <Link to="/doctors" className='nav-link'>Our Doctors</Link>
                    </li>
                    <li>
                        <FiChevronsRight className='arrow-icon'/>
                        <a className='nav-link' href="#">About Us</a>
                    </li>
                    <li>
                        <FiChevronsRight className='arrow-icon'/>
                        <Link to={accountUrl} className='nav-link'>Account</Link>
                    </li>
                    <li>
                        <FiChevronsRight className='arrow-icon'/>
                        <a className='nav-link' href="#">Contact Us</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="ending">
            <p className="copyright">&copy; Copyright: doctorscout.com</p>
            <p>Made With <BsFillHeartFill  style={{color: "#f09a29"}}/> By Our Team</p>
        </div>
    </div>
  )
}
