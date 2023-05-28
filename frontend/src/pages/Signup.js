import React, {useState} from 'react'
import Navbar from "../components/Navbar"
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        userType: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        birthDate: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
        medicalSpecialty: '',
        hospitalName: '',
        photo: null,
    });

    const navigate = useNavigate();

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    
    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })

        if (currentPage === 1) {
            nextPage();
          }
    }
    
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form submission or data processing here
        try {
            if (formData.userType === 'doctor') {
              const {userType, firstName, lastName, phoneNumber, address, birthDate, gender, email, password, hospitalName, medicalSpecialty, photo } = formData;
        
              const doctorRequestBody = {
                department: { name: hospitalName },
                user: { username: email, password },
                specialty: medicalSpecialty,
                availability: 'isAvailable',
              };

              
        
              await axios.post('/doctors/create/', doctorRequestBody);
              console.log('Registered as a doctor!');
              navigate('/doctorpanel')
            } else if (formData.userType === 'patient') {

                const {userType, firstName, lastName, phoneNumber, address, birthDate, gender, email, password, hospitalName, medicalSpecialty, photo } = formData;

                const patientRequestBody = {
                    insurance: [{ id: 1 }],
                    user: { username: email, password },
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                    address: address,
                  }
              // Handle patient registration
              await axios.post('/patients/create/', patientRequestBody);
              console.log('Registered as a patient!');
              navigate('/')
            }
          } catch (error) {
                console.error(error);
            }

        console.log(formData);
        // Reset form state
        // setCurrentPage(1);
        setFormData({
          userType: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          birthDate: '',
          gender: '',
          email: '',
          password: '',
          confirmPassword: '',
          medicalSpecialty: '',
          hospitalName: '',
          photo: null,
        });
    };

    const renderPage = () => {
        switch (currentPage) {
          case 1:
            return (
                <div className="body-1">
                    <p>Register As</p>
                    <h3>Choose Your Role</h3>
                    <button type='button' onClick={() => handleChange({ target: { name: 'userType', value: 'doctor' } })}>A Doctor</button>
                    <button type='button' onClick={() => handleChange({ target: { name: 'userType', value: 'patient' } })}>A Patient</button>
                </div>
            );
          case 2:
            return (
            //   <div>
            //     <h2>Personal Information</h2>
            //     <input
            //       type="text"
            //       name="firstName"
            //       placeholder="First Name"
            //       value={formData.firstName}
            //       onChange={handleChange}
            //     />
            //     {/* Add other fields for the patient */}
            //     {formData.userType === 'doctor' && (
            //       <div>
            //         <input
            //           type="text"
            //           name="medicalSpecialty"
            //           placeholder="Medical Specialty"
            //           value={formData.medicalSpecialty}
            //           onChange={handleChange}
            //         />
            //         <input
            //           type="text"
            //           name="hospitalName"
            //           placeholder="Hospital Name"
            //           value={formData.hospitalName}
            //           onChange={handleChange}
            //         />
            //       </div>
            //     )}
            //   </div>
                <div className="body-2">
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            onChange={handleChange}
                            name="firstName"
                            value={formData.firstName}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            onChange={handleChange}
                            name="lastName"
                            value={formData.lastName}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            name="phoneNumber"
                            value={formData.phoneNumber}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            placeholder="Address"
                            onChange={handleChange}
                            name="address"
                            value={formData.address}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="birthDate">Birth Date</label>
                        <input
                            type='date'
                            placeholder="Birth Date"
                            onChange={handleChange}
                            name="birthDate"
                            value={formData.birthDate}
                        />
                    </div>
                    <div className="input-field gender-field">
                        <span>Gender</span>
                        <div className="gender-category">
                        <input 
                            type="radio"
                            id="male"
                            name="gender"
                            value="unemployed"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                        />
                        <label htmlFor="male" className='radio-label'>Male</label>
                        <input 
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        <label htmlFor="female" className='radio-label'>Female</label>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    {formData.userType === "doctor" && (
                        <>
                        <div className="input-field">
                            <label htmlFor="medicalSpecialty">Medical Speciality</label>
                            <select 
                                id="medicalSpecialty" 
                                value={formData.medicalSpecialty}
                                onChange={handleChange}
                                name="medicalSpecialty"
                            >
                                <option value="">-- Choose --</option>
                                <option value="speciality1">Speciality 1</option>
                                <option value="speciality2">Speciality 2</option>
                                <option value="speciality3">Speciality 3</option>
                                <option value="speciality4">Speciality 4</option>
                                <option value="speciality5">Speciality 5</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <label htmlFor="hospitalName">Hospital Name</label>
                            <input
                                type="text"
                                placeholder="Hospital Name"
                                onChange={handleChange}
                                name="hospitalName"
                                value={formData.hospitalName}
                            />
                        </div>

                        </>
                    )}
                    <button type="button" onClick={previousPage}>
                        Previous
                    </button>
                    <button type="button" onClick={nextPage}>
                        Next
                    </button>
                </div>
            );
          case 3:
            return (
              <div className='body-3'>
                <div className="image-container">
                    <h2>Upload Your Image</h2>
                    <p>png, jpg files are allowed only</p>
                    <div className="upload-icon-container">
                        <AiOutlineCloudUpload />
                    </div>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                </div>
                <button>Add to profile</button>
                <button type="button" onClick={previousPage}>
                    Previous
                </button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
              </div>
            );
          default:
            return null;
        }
      };
    
  return (
    <div className='sign-up'>
        <div className="oval-horizontal"></div>
        <div className="oval-vertical"></div>
        <div className="header">
            <Navbar />
        </div>
        
        <div className="form-container container">
            <div className="header">
                <div>1</div>
                <h1>Registration Form</h1>
            </div>
            {renderPage()}
            {/* <div className="body">
                <p>Register As</p>
                <h3>Choose Your Role</h3>
                <button>A Doctor</button>
                <button>A Patient</button>
            </div> */}

        </div>
    </div>
  )
}

export default Signup;