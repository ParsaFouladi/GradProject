import React from 'react'
import { BsBell } from "react-icons/bs";
import Navbar from '../components/Navbar';
import { FaCaretDown } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import doctorImg from "../imgs/doctor.png"

function FilteredList() {
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
                <select name="" id="">
                    <option value="">TRNC</option>
                    <option value="">Location 1</option>
                    <option value="">Location 2</option>
                    <option value="">Location 3</option>
                    <option value="">Location 4</option>
                </select>
                <FaCaretDown className="chevron-down"/>
            </div>
            <div className="select-box">
                <select name="" id="">
                    <option value="">14 April 2023</option>
                    <option value="">Date 1</option>
                    <option value="">Date 2</option>
                    <option value="">Date 3</option>
                    <option value="">Date 4</option>
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
            </div>
        </div>
        </div>
    </div>
  )
}

export default FilteredList