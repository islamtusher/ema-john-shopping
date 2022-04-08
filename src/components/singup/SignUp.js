import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import app from '../../firebaseConfig';

const auth = getAuth(app)

const SignUp = () => {
    const provider = new GoogleAuthProvider()
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => console.log(ressult.user.displayName))
            .catch(error => console.log(error))
    }
    // get input value
    const getValue = (event) => {
        console.log(event.target.value);
    }
    return (
        <div>
            <div className='login-page'>
            <div className="log-fild">
                <input onBlur={getValue} className="py-1 px-2" type="text" name='email' placeholder='Email' />
                <input onBlur={getValue} className="py-1 px-2" type="text" name='password' placeholder='Password' />
                <input onBlur={getValue} className="py-1 px-2" type="text" name='password' placeholder='Confirm Password' />
                <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Sign Up</button>
                <p className='mx-auto p-0 m-0 text-primary'>Or</p>
                <button onClick={googleSignIn} className="bg-warning rounded py-1 px-2" type="submit">Google LogIn</button>
            </div>
        </div>
        </div>
    );
};

export default SignUp;