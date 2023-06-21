import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";

function SampleNextArrow({ onClick }) {
  return (
    <div className="arrow arrow-right" onClick={onClick}>
      <BsFillCaretRightFill />
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div className="arrow arrow-left" onClick={onClick}>
      <BsFillCaretLeftFill />
    </div>
  );
}

function DoctorSlider() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/doctors/top-rated/')
        .then(response => {
            if (Array.isArray(response.data)) {
                setDoctors(response.data);
            } else {
                console.log('Unexpected response data:', response.data);
            }
        })
        .catch(error => {
            console.log('Fetch error:', error);
        });
  }, []);


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
  
  const groupByCountry = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
};


  const doctorsByCountry = groupByCountry(doctors, 'country');

  return (
      <div className='slider-container'>
          {Object.keys(doctorsByCountry).map((country, index) => (
              <div key={index}>
                  <h2>{country}</h2>
                  <Slider {...settings}>
                      {doctorsByCountry[country].map(doctor => (
                          <div className="card" key={doctor.id}>
                              <img src={doctor.image_url} alt="" />
                              <h3>{doctor.name}</h3>
                              <p>{doctor.speciality}</p>
                          </div>
                      ))}
                  </Slider>
              </div>
          ))}
      </div>
  )
}

export default DoctorSlider;