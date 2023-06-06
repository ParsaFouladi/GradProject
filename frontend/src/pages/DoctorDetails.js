import React, {useEffect, useState, useRef} from 'react'
import { BsBell } from "react-icons/bs";
import Navbar from '../components/Navbar';
import { FaCaretDown } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { useParams } from 'react-router-dom';


function DoctorDetails(props) {
    const {id} = useParams()
    console.log(id);
    const [doctor, setDoctor] = useState(null);
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const timeTableRef = useRef(null)

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
          const response = await fetch(`http://localhost:8000/doctors/reviews/${id}`);
          const data = await response.json();
          setRating(data.rating);
          setComment(data.comment);
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

  const renderRatingStars = () => {
    const filledStars = rating ? Math.floor(rating) : 0;
    const remainingStars = 5 - filledStars;
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<AiFillStar key={i} className="star-filled-icon" />);
    }



    return stars;
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
            <div className="doctor-info-container">
                <div className="doctor">
                    <div className="data">
                        <div className="doctor-img">
                            <img src={doctor.image_url} alt="doctorIMg" />
                        </div>
                        <div className="doctor-info">
                            <h3>{doctor.name}</h3>
                            <h5>{doctor.speciality}</h5>
                            <h6>{doctor.location}</h6>
                            <div className="rating">
                            {rating && (
                                <>
                                {renderRatingStars()}
                                </>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button onClick={handleScrollToTimetable}>Check Schedule</button>
                    </div>
                </div>
                <div className="review-holder">
                    <div className="schedule-container">

                    </div>
                    <div className="patients-reviews">
                        <h3>Recent Reviews</h3>
                        <div className="review">
                            <p>{comment}</p>
                            <h6>-Yagmur W. - February. 2023</h6>
                        </div>
                        <div className="review">
                            <p>Very thorough: explained the entire procedure with all possible treatments. The nurse
                            was also very nice. Highly recommend.</p>
                            <h6>-Mariella G.- March 22,2023</h6>
                        </div>
                    </div>
                </div>
                <div className="table-container">
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
    </div>
  )
}

export default DoctorDetails