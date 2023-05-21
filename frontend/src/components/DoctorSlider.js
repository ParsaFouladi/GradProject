import React from 'react'
import Slider from "react-slick";
import doctorImg from "../imgs/doctor.png"
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";

function SampleNextArrow({onClick}) {
    
    return (
      <div className="arrow arrow-right" onClick={onClick}>
        <BsFillCaretRightFill />
      </div>
    );
  }
  
  function SamplePrevArrow({onClick}) {
    
    return (
      <div className="arrow arrow-left" onClick={onClick}>
        <BsFillCaretLeftFill />
      </div>
    );
  }

function DoctorSlider() {

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
    
  return (
    <div className='slider-container'>
        <Slider {...settings}>
            <div className="card">
                <img src="../imgs/doctor.png" alt="" />
                <h3>Dr.Farida lvdsagkh</h3>
                <p>ds;jgalksdhg;ds</p>
            </div>
            <div className="card">
                <doctorImg />
                <h3>Dr.Farida lvdsagkh</h3>
                <p>ds;jgalksdhg;ds</p>
            </div>
            <div className="card">
                <doctorImg />
                <h3>Dr.Farida lvdsagkh</h3>
                <p>ds;jgalksdhg;ds</p>
            </div>
            <div className="card">
                <doctorImg />
                <h3>Dr.Farida lvdsagkh</h3>
                <p>ds;jgalksdhg;ds</p>
            </div>
            <div className="card">
                <doctorImg />
                <h3>Dr.Farida lvdsagkh</h3>
                <p>ds;jgalksdhg;ds</p>
            </div>
            <div className="card">
                <doctorImg />
                <h3>Dr.Farida lvdsagkh</h3>
                <p>ds;jgalksdhg;ds</p>
            </div>
            <div className="card">
                <doctorImg />
                <h3>Dr.Farida lvdsagkh</h3>
                <p>ds;jgalksdhg;ds</p>
            </div>
            <div className="card">
                <doctorImg />
                <h3>Dr.Farida lvdsagkh</h3>
                <p>ds;jgalksdhg;ds</p>
            </div>
        </Slider>
    </div>
  )
}

export default DoctorSlider