import React from 'react';
import app from '../../firebaseConfig';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import './Header.css';

const auth = getAuth(app)

const Header = () => {
    const provider = new GoogleAuthProvider()
    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(ressult => console.log(ressult.user))
            .catch(error => console.log(error))
            
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                {/* <Link onClick={googleSignIn}>LogIn</Link> */}
                <button onClick={googleSignIn} className="ms-4 bg-warning rounded py-1 px-2" type="submit">Log In</button>
            </div>
        </nav>
    );
};

export default Header;