import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 3000);

    }, [])
    
  return (
    <>
    <h1>Page is not found</h1>
    <h3>You will be redirected to the home page in 3 seconds...</h3>
    </>
  )
}

export default NotFound