import React from 'react';
import './Cart.css'

const Cart = ({ carts }) => {

    let totalPrice = 0;
    let shippingCost = 0;
    let quantity = 0;
    if(carts){
        for (const cart of carts) {
            quantity = quantity + cart.quantity
            totalPrice = totalPrice + cart.price * cart.quantity
            shippingCost = shippingCost + cart.shipping
        }
    }
    const grandTotal = totalPrice + shippingCost
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <div className='cart-info'>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: {totalPrice}</p>
                <p>Shipping Charge: {shippingCost}</p>
            </div>
            <h4>Grand Total: {grandTotal}</h4>
            <div className='cart-btn-grp'>
                <button className='cart-btn' type="submit">Clear Carts</button>
                <button className='cart-btn' type="submit">Review Order</button>
            </div>
        </div>
    );
};

export default Cart;