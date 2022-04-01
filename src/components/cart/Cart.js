import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <div className='cart-info'>
                <p>Selected Items: {cart.length}</p>
                <p>Total Price: {cart.length}</p>
                <p>Shipping Charge: {cart.length}</p>
                <p>Tax {cart.length}</p>
            </div>
            <h4>Grand Total: </h4>
            <div className='cart-btn-grp'>
                <button className='cart-btn' type="submit">Clear Cart</button>
                <button className='cart-btn' type="submit">Review Order</button>
            </div>
        </div>
    );
};

export default Cart;