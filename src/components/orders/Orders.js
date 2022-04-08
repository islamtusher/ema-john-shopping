import React from 'react';
import './Orders.css'
import useCarts from '../../customHooks/useCarts';
import Cart from '../cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { removeFromDb } from '../../utilities/fakedb';
const Orders = () => {
    let [carts, setCarts] = useCarts()
    const delteItem = (id) => {
        const remaainProducts = carts.filter(product => product.id !== id)
        setCarts(remaainProducts)
        removeFromDb(id)
    }
    return (
        <div>
            <h1>Orders</h1>
            <div className='orders-contain' >
                <div className="orders  w-50">
                    {
                        carts.map(product => 
                        <div key={product.id} className='w-75 mx-auto d-flex justify-content-between align-items-center'>
                            <img className='w-25' src={product.img} alt="" />
                            <div className=''>
                                <h4 className='fw-normal'>{product.name}</h4>
                                <p className='m-0'>Price: {product.price}</p>
                                <p className='m-0'>Sipping Charge: {product.shipping}</p>
                                <p className='m-0'>Quantity: {product.quantity}</p>
                            </div>
                            <FontAwesomeIcon onClick={() => delteItem(product.id)} className='delete-btn' icon={faTrashCan}></FontAwesomeIcon>
                        </div>)

                    }
                </div>
                <div className="account-cart  w-50">
                    <div className='w-50 mx-auto'>
                        <Cart carts={carts}>
                            <p>Children</p>
                        </Cart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;