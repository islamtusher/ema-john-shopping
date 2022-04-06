import React, { useEffect, useState } from 'react';
import useCarts from '../../customHooks/useCarts';
import useProducts from '../../customHooks/useProducts';
import { addToDb, getData } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useProducts();
    const [carts, setCart] = useCarts();
    // console.log(carts)
    // console.log(products)

    const handleAddToCart = (clickedProduct) => {
        const matchedProduct = carts.find(product => product.id === clickedProduct.id)
        let newCart = [];

        if (matchedProduct) {
            const remainProducets = carts.filter( product => product.id !== clickedProduct.id )
            matchedProduct.quantity = matchedProduct.quantity + 1
            newCart = [...remainProducets, matchedProduct];
            
        } else {
            
            clickedProduct.quantity = 1
            newCart = [...carts, clickedProduct];
        }
        // do not do this: cart.push(product);
        setCart(newCart);
        addToDb(clickedProduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart carts={carts}></Cart>
            </div>
        </div>
    );
};

export default Shop;