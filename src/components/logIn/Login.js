import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebaseConfig';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    // google login
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => navigate('/'))
            .catch(error => console.log(error))
    }
    // password login
    const LoginWithPass = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              console.log(userCredential.user);
              navigate('/')
          })
          .catch((error) => {
              console.log(error.message);
              setError(error.message)
          });
    }
    // Password reset email sent!
    const reserPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('pass reset');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <div className='login-page mx-auto'>
            <form onSubmit={LoginWithPass} className="log-fild">
                <input onChange={(event) => setEmail(event.target.value)} className="py-1 px-2" type="email" name='email'  placeholder='Email' />
                <input className="py-1 px-2" type="password" name='password' autoComplete="off" placeholder='Password' />
                {error && <p>{error}</p>}
                <p onClick={reserPassword}>Forget Password</p>
                <button className="bg-warning rounded py-1 px-2" type="submit">Login</button>
            </form>
            <p className='mx-auto p-0 m-0 text-primary'> Or </p>
            <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Google LogIn</button>
        </div>
    );
};

export default Login;