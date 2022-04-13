import {  GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebaseConfig';
import { useEffect } from 'react';

const provider = new GoogleAuthProvider()

const SignUp = () => {
    // react hooks
    const navigate = useNavigate()

    // firebase Hooks
    const [createUserWithEmailAndPassword,user] = useCreateUserWithEmailAndPassword(auth)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    // console.log(name, password, email);

    // check email validity
    
    // check password validity
    
    // google sign in
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => console.log(ressult.user.displayName))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    },[user])
    // register new user
    const handleSignUp = (event) => {
        event.preventDefault()
        console.log('inner');

        createUserWithEmailAndPassword(email, password)
       

    }
    


    return (
        <div>
            <div className='login-page mx-auto'>
                <form onSubmit={handleSignUp} className="log-fild">  
                    <input onBlur={(e) => setName(e.target.value)} className="py-1 px-2" type="text" name='name'  placeholder='Name' required />
                    <input onBlur={(e) => setEmail(e.target.value)} className="py-1 px-2" type="email" name='email'  placeholder='Email' required />
                    { email?.error && <p>{email?.error}</p>}
                    <input onBlur={(e) => setPassword(e.target.value)} className="py-1 px-2" type="password" name='password' autoComplete="off" placeholder='Password' required />
                    { password?.error && <p>{password?.error}</p>}
                    <input onBlur={(e) => setConfirmPassword(e.target.value)}  className="py-1 px-2" type="password" name='confirmPassword' autoComplete="off" placeholder='Confirm Password' />
                    <button className="bg-warning rounded py-1 px-2" type="submit">Sign Up</button>
                </form>
                <p className='mx-auto my-3 text-primary'>
                    Al-ready Registered?
                    <Link className='text-danger ms-2' to='/login'> Let's Login </Link > 
                </p>
                <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Google LogIn</button>
            </div>
        </div>
    );
};

export default SignUp;