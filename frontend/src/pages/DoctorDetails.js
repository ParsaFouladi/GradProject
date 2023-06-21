import React, {useEffect, useState, useRef} from 'react'
import { BsBell } from "react-icons/bs";
import Navbar from '../components/Navbar';
import { FaCaretDown } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { useParams, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import {BsEmojiSmileFill, BsEmojiFrownFill, BsEmojiNeutralFill} from "react-icons/bs"

function DoctorDetails(props) {
    const {id} = useParams()
    console.log(id);
    const [doctor, setDoctor] = useState(null);
    const [rating, setRating] = useState([]);
    const [comment, setComment] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const timeTableRef = useRef(null);
    const location = useLocation();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/doctors/scraped/${id}/`);
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    const fetchDoctorRating = async () => {
      try {
        const response = await fetch(`http://localhost:8000/doctors/reviews/?doctor_id=${id}`);
        const data = await response.json();
        setRating(data.results);
      } catch (error) {
        console.error('Error fetching doctor rating:', error);
      }
    };
    
      const fetchTimeSlots = async () => {
        try {
          const response = await fetch(`http://localhost:8000/doctors/timeslots/${id}/`); // Replace with your API endpoint
          const data = await response.json();
          setTimeSlots(data.results);
        } catch (error) {
          console.error('Error fetching time slots:', error);
        }
      };
    
      fetchTimeSlots();

    fetchDoctorDetails();
    fetchDoctorRating();
  }, [id, currentWeek]);

  // to check if I have a scrollToSection so that I can automatically scoll to timetable when clicking on check schedule
  useEffect(() => {
    if (location.state && location.state.scrollToSection) {
      setTimeout(() => {
        timeTableRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  }, [location]);

  const renderRatingStars = (ratings) => {
    const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
    const filledStars = Math.floor(averageRating);
    const remainingStars = 5 - filledStars;
    const stars = [];
  
    for (let i = 0; i < filledStars; i++) {
      stars.push(<AiFillStar key={i} className="star-filled-icon"/>);
    }
  
    return stars;
  };

  const renderRatingEmojis = (review) => {
    const rating = review.rating;
  
    if (rating < 3) {
      return <BsEmojiFrownFill className="emoji" style={{color: "#ed2939"}} />;
    } else if (rating === 3) {
      return <BsEmojiNeutralFill className="emoji" style={{color: "#fbec5d"}} />;
    } else {
      return <BsEmojiSmileFill className="emoji" style={{color: "#3ded97"}} />;
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const groupedTimeslots = timeSlots.reduce((groups, timeslot) => {
    const day = new Date(timeslot.start_time).toLocaleDateString('en-US', { weekday: 'long' });
    groups[day] = groups[day] || [];
    groups[day].push(timeslot);
    return groups;
  }, {});


  if (!doctor) {
    return <div>Loading...</div>;
  }

  const handlePreviousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };
  

  const renderTimeSlotInfo = (day, index) => {
    if (groupedTimeslots[day]) {
      return groupedTimeslots[day].map((ts) => {
        if (ts.start_time.includes(`T${index.toString().padStart(2, '0')}:`)) {
          return <div key={ts.id} className={ts.status}>{ts.status}</div>;
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  const handleScrollToTimetable = () => {
    timeTableRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  

  return (
    <div className='doctor-details'>
        <div className="oval-horizontal"></div>
        <div className="oval-vertical"></div>
        <div className="header">
            <button>Logout</button>
            <div className="right-side">
                {/* <div className="bell-icon-container">
                    <BsBell className='bell-icon'/>
                </div> */}
                <Navbar />
            </div>
        </div>
        <div className="container">
            <div className="doctor-info-container">
                <div className="doctor">
                    <div className="data">
                        <div className="doctor-img" style={{borderRadius: "20px", overflow: "hidden"}}>
                            <img src={doctor.image_url} alt="doctorIMg" />
                        </div>
                        <div className="doctor-info">
                            <h3>{doctor.name}</h3>
                            <h5>{doctor.speciality}</h5>
                            <h6>{doctor.location}</h6>
                            <div className="rating">
                            {renderRatingStars(rating)}
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button onClick={handleScrollToTimetable}>Check Schedule</button>
                    </div>
                </div>
                <div className="review-holder">
                    {/* <div className="schedule-container">

                    </div> */}
                    <div className="patients-reviews">
                        <h2>Recent Reviews</h2>
                        <div className="boxes-holder">
                          {rating && rating.map((review, index) => (
                            <div className="review" key={index}>
                              <div className="review-header">
                                <div className="emoji">
                                  {renderRatingEmojis(review)}
                                </div>
                                <div className="name-rating">
                                  <h4>Yagmur W. - February. 2023</h4> {/* Update with appropriate date */}
                                  <div className="rating">
                                    {renderRatingStars([review])}
                                  </div>
                                </div>
                              </div>
                              <p>{review.comment}</p>
                              
                            </div>
                          ))}
                        </div>
                        
                    </div>
                </div>
                <div className="table-container">
                  <h2>Check Out Doctor Timetable</h2>
                {timeSlots.length > 0 ? (
                <table className='timetable' ref={timeTableRef}>
                  <thead>
                    <tr>
                      <th>Time</th>
                      {daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 24 }).map((_, index) => (
                      <tr key={index}>
                        <td>{`${index.toString().padStart(2, '0')}:00 - ${index
                          .toString()
                          .padStart(2, '0')}:59`}</td>
                        {daysOfWeek.map((day) => (
                          <td key={day}>
                            {renderTimeSlotInfo(day, index)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No time slots available.</div>
              )}
            </div>
                {/* <div className="week-navigation">
                    <button onClick={handlePreviousWeek}>Previous Week</button>
                    <button onClick={handleNextWeek}>Next Week</button>
                </div> */}
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default DoctorDetails;