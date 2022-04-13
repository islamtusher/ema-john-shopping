import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import './Header.css';


const Header = () => {
    const navigate = useNavigate()
    const [logedInUser, setLogedInUser] = useState({})
    
    // get the current user
    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         setLogedInUser(user)
        //     } else {
        //         setLogedInUser({})
        //     }
        // });
    }, [])
    
    // signout 
    const logoutUser = () => {
        // signOut(auth)
        // navigate('/login')
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <p className='text-light'>{logedInUser.email}</p>
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
                <Link to="/signup" className='login-btn'>Sign Up</Link>  
            </div>
        </nav>
    );
};

export default Header;