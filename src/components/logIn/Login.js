import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebaseConfig';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

// const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const Login = () => {
    // firebase hooks
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    // google login
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => navigate('/'))
            .catch(error => console.log(error))
    }
    if (user) {
        navigate('/')
    }
    // login with password
    const LoginWithPass = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(email, password)
    }
    console.log(user);

    // Password reset email sent!
    const resetPassword = () => {
        
    }
    return (
        <div className='login-page mx-auto'>
            <form onSubmit={LoginWithPass} className="log-fild">
                <input onBlur={(event) => setEmail(event.target.value)} className="py-1 px-2" type="email" name='email'  placeholder='Email' />
                <input onBlur={(event) => setPassword(event.target.value)} className="py-1 px-2" type="password" name='password' autoComplete="off" placeholder='Password' />
                {error && <p>{error.message}</p>}
                <p onClick={resetPassword}>Forget Password</p>
                <button className="bg-warning rounded py-1 px-2" type="submit">Login</button>
            </form>
            <p className='mx-auto my-3 text-primary'>
                    New to Ema-jhon?
                    <Link className='text-danger ms-2' to='/signup'> Let's SignUp </Link > 
                </p>
            <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Google LogIn</button>
        </div>
    );
};

export default Login;