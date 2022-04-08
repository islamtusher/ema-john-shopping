import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import app from '../../firebaseConfig';

const auth = getAuth(app)

const Login = () => {
    const provider = new GoogleAuthProvider()
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => console.log(ressult.user.displayName))
            .catch(error => console.log(error))
    }
    return (
        <div>
            <h1>Log In</h1>
            <button onClick={googleSignIn} className="ms-4 bg-warning rounded py-1 px-2" type="submit">Log In</button>
        </div>
    );
};

export default Login;