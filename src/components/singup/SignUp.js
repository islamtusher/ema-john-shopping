import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebaseConfig';

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState({value : '', error : ''})
    const [password, setPassword] = useState({value : '', error : ''})
    const [confirmpassword, setConfirmPassword] = useState({ value: '', error: '' })
    // console.log(password);

    // check email validity
    const emailValidity = (value) => {
        if (value === '') {
            return
        }
        if (/\S+@\S+\.\S+/.test(value)) {
            setEmail({value : value, error: ''})
        } else {
            setEmail({value : '', error: 'invalid Email'})
            
        }
    }
    // check password validity
    const passValidity = (value) => {
        if (value === '') {
            return
        }
        if (!/(?=.*[!#$%&? "])/.test(value)) {
            setPassword({ value: '', error: 'Need at least one spacial characters' })
            return;
        }
        if (!/(?=.*[A-Z])/.test(value)) {
            setPassword({ value: '', error: 'Need at least one Uppercase' })
            return;
        }
        if (!(value.length >= 8)) {
            setPassword({ value: '', error: 'Need at least one 8 characters' })
            return;
        }
        setPassword({ value: value, error: '' })
    }

    // google sign in
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => console.log(ressult.user.displayName))
            .catch(error => console.log(error))
    }
    
    // register new user
    const signUpWithPass = (event) => {
        event.preventDefault()    
        // Email verification sent!
        
            
        
        // create new user 
        if (email.value && password.value) {
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    // send email validity
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('email sent');
                    })
                    .catch((error) => console.log(error.message))
                    console.log(userCredential.user);
                    // update user info
                    updateProfile(auth.currentUser, { displayName: name })
                        .then(() => {
                            console.log('added name');
                        }).catch((error) => {
                          console.log(error.message);
                        });
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setPassword({ value: '', error: errorMessage })
                    console.log(errorMessage);
                });
        }
    }


    return (
        <div>
            <div className='login-page mx-auto'>
                <form  className="log-fild">  
                    <input onChange={(event) => setName(event.target.value)} className="py-1 px-2" type="text" name='name'  placeholder='Name' required />
                    <input onChange={(event) => emailValidity(event.target.value)} className="py-1 px-2" type="email" name='email'  placeholder='Email' required />
                    { email?.error && <p>{email?.error}</p>}
                    <input onChange={(event) => passValidity(event.target.value)} className="py-1 px-2" type="password" name='password' autoComplete="off" placeholder='Password' required />
                    { password?.error && <p>{password?.error}</p>}
                    {/* <input  className="py-1 px-2" type="password" name='confirmPassword' autoComplete="off" placeholder='Confirm Password' /> */}
                    <button onClick={signUpWithPass} className="bg-warning rounded py-1 px-2" type="submit">Sign Up</button>
                </form>
                <p className='mx-auto p-0 m-0 text-primary'>Or</p>
                <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Google LogIn</button>
            </div>
        </div>
    );
};

export default SignUp;