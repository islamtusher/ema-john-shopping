import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import app from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import './Login.css'
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app)



const Login = () => {
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => navigate('/'))
            .catch(error => console.log(error))
    }
    // get input value
    const getValue = (event) => {
        console.log(event.target.value);
    }
    return (
        <div className='login-page'>
            <div className="log-fild">
                <input onBlur={getValue} className="py-1 px-2" type="text" name='email' placeholder='Email' />
                <input onBlur={getValue} className="py-1 px-2" type="text" name='password' placeholder='Password' />
                <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Log In</button>
                <p className='mx-auto p-0 m-0 text-primary'>Or</p>
                <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Google LogIn</button>
            </div>
        </div>
    );
};

export default Login;