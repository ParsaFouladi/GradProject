import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleAuth = () => {
    const responseGoogle = (response) => {
        console.log(response);
        axios.post('http://localhost:8000/dj-rest-auth/google/', {
            access_token : response.accessToken
        })
        .then(response => {
            console.log("Google login response", response);
            // handle successful authentication response here
        })
        .catch(error => {
            console.log("Google login error", error);
            // handle error response here
        });
    }

    return (
        <GoogleLogin
            clientId="748160997720-4b0ppcvfvpj79g8uql68p13vai5r7qb5.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    );
}

export default GoogleAuth;
