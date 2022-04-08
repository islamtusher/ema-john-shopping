import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import './Header.css';
import app from '../../firebaseConfig';

const auth = getAuth(app);

const Header = () => {
    const [logedInUser, setLogedInUser] = useState({})

    const logoutUser = () => {
        signOut(auth)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogedInUser(user)
            } else {
                setLogedInUser({})
            }
        });
    },[])
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <p className='text-light'>{logedInUser.displayName}</p>
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                {
                    logedInUser?.email ?
                        <button onClick={logoutUser} className='ms-4 bg-warning rounded py-1 px-2'>LogOut</button>
                        :
                        <Link to="/login" className='login-btn'>Login</Link>   
                }
            </div>
        </nav>
    );
};

export default Header;