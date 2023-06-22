import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';


function DoctorSlider() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchDoctors();
  }, []);

  // const sliderRef = useRef(null);

  // const nextSlide = () => {
  //   sliderRef.current.slickNext();
  // };

  // const prevSlide = () => {
  //   sliderRef.current.slickPrev();
  // };

  function SampleNextArrow() {
    return (
      <div className="arrow arrow-right" >
        <BsFillCaretRightFill />
      </div>
    );
  }

  function SamplePrevArrow() {
    return (
      <div className="arrow arrow-left" >
        <BsFillCaretLeftFill />
      </div>
    );
  }

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/doctors/top-rated');
      setDoctors(response.data.results);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const navigateToDoctorDetails = (doctorId) => {
    // Perform any necessary logic before navigating to the doctor details page
  
    // Navigate to the doctor details page
    window.location.href = `/doctordetails/${doctorId}`;
  };

  const renderDoctors = () => {
    return  doctors.map((doctor) => (
      <div className='doctor-card' key={doctor.id} onClick={() => navigateToDoctorDetails(doctor.id)}>
        <img className='doctor-img' src={doctor.image_url} alt={doctor.name} />
        <h3>{doctor.name}</h3>
        <p>{doctor.speciality}</p>
        {/* Add more doctor details as needed */}
      </div>
    ));
  };


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
//   const groupByCountry = (array, key) => {
//     return array.reduce((result, currentValue) => {
//         (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
//         return result;
//     }, {});
// };


//   const doctorsByCountry = groupByCountry(doctors, 'country');

  return (
      <div className='slider-container'>
          <h1>Meet Our Top Rated Doctors</h1>
          <Slider {...settings}>
            {renderDoctors()}
          </Slider>
      </div>
  )
}

export default DoctorSlider;