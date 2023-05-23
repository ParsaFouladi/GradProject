import React from 'react'
import Navbar from '../components/Navbar'

export default function Login() {
  return (
    <div className='login-page'>
        <div className="oval-horizontal"></div>
        <div className="oval-vertical"></div>
        <Navbar />
        <div className="login-container container">
            <div className="text">
                <h1>Login Form</h1>
                <h3>Log into our website and be a member of our family !</h3>
            </div>
            <div className="login-form">
                <form action="">
                    <div className="input-field">
                        <label htmlFor="">Email</label>
                        <input type='email' />
                    </div>
                    <div className="input-field">
                        <label htmlFor="">Password</label>
                        <input type="password" />
                    </div>
                    <p>forgot password?</p>
                    <button>Login</button>
                    <p>Please enter a valid email and password</p>
                    <p>Don't have an account yet? <a href="#">Sign up</a> it will only take few minutes!</p>
                </form>
            </div>
        </div>
    </div>
  )
}
