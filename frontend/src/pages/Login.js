import React from 'react'
import Navbar from '../components/Navbar'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { json } from 'react-router-dom';

const LOGIN_URL = '/token/'

export default function Login() {

    const {setAuth} = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // initially
    const [success, setSuccess] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = axios.post(LOGIN_URL,
                JSON.stringify({username: user, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                console.log(JSON.stringify(response.data));
                const accessToken = response.data.access;
            setAuth({username: user, password: pwd, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);


        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

        // useEffect(() => {
        //     // Replace <username> and <password> with the actual credentials
        //     // const username = "<username>";
        //     // const password = "<password>";
        
        //     // Make a request to authenticate the user and obtain the tokens
        //     axios.post("<your_token_endpoint>", {
        //       username: user,
        //       password: pwd
        //     })
        //       .then(response => {
        //         // User authentication successful
        //         const accessToken = response.data.access;
        //         const refreshToken = response.data.refresh;
        
        //         // Set the access token in the default Authorization header for all requests
        //         axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        
        //         // Make subsequent authenticated requests
        //         axios.get("/doctors/")
        //           .then(response => {
        //             // Handle the response from the authenticated endpoint
        //             console.log(response.data);
        //           })
        //           .catch(error => {
        //             // Handle any errors from the authenticated request
        //             console.error(error);
        //           });
        //       })
        //       .catch(error => {
        //         // User authentication failed
        //         console.error(error);
        //       });
        //   }, []);

    }


  return (
    <>
        {success ? <h1>You are logged in!</h1> :
        
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
                <form onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input 
                            type='text' 
                            id='username' 
                            ref={userRef} 
                            autoComplete='off'
                            onChange={(e) => {setUser(e.target.value)}}
                            value={user}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id='password'
                            ref={userRef}
                            onChange={(e) => {setPwd(e.target.value)}}
                            value={pwd}
                            required
                        />
                    </div>
                    <p>forgot password?</p>
                    <button>Login</button>
                    <p>Please enter a valid email and password</p>
                    <p>Don't have an account yet? <a href="#">Sign up</a> it will only take few minutes!</p>
                </form>
            </div>
        </div>
    </div>}
    </>
  )
}
