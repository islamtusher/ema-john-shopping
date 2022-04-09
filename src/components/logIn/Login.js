import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React from 'react';
import app from '../../firebaseConfig';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app)

const Login = () => {
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()
    // google login
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => navigate('/'))
            .catch(error => console.log(error))
    }
    // pass login
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
          });
    }
    
    return (
        <div className='login-page'>
            <form onSubmit={LoginWithPass} className="log-fild">
                <input  className="py-1 px-2" type="email" name='email'  placeholder='Email' />
                <input  className="py-1 px-2" type="password" name='password' autoComplete="off" placeholder='Password' />
                <button className="bg-warning rounded py-1 px-2" type="submit">Login</button>
                <p className='mx-auto p-0 m-0 text-primary'>Or</p>
                <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Google LogIn</button>
            </form>
        </div>
    );
};

export default Login;