import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebaseConfig';

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    
    // google sign in
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => console.log(ressult.user.displayName))
            .catch(error => console.log(error))
    }
    // get input email and pass value
    const signUpWithPass = (event) => {
        event.preventDefault()

        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           console.log(userCredential.user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    // create new user 
    const createNewUser = () => {
        // createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //    console.log(userCredential.user);
        // })
        // .catch((error) => {
        //     const errorMessage = error.message;
        //     console.log(errorMessage)
        // });

    }
    return (
        <div>
            <div className='login-page'>
                <form onSubmit={signUpWithPass} className="log-fild">  
                    <input  className="py-1 px-2" type="email" name='email'  placeholder='Email' />
                    <input  className="py-1 px-2" type="password" name='password' autoComplete="off" placeholder='Password' />
                    {/* <input  className="py-1 px-2" type="password" name='confirmPassword' autoComplete="off" placeholder='Confirm Password' /> */}
                    <button className="bg-warning rounded py-1 px-2" type="submit">Sign Up</button>
                    <p className='mx-auto p-0 m-0 text-primary'>Or</p>
                    <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Google LogIn</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;