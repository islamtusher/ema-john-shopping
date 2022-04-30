import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import useCarts from '../../customHooks/useCarts';
import useProducts from '../../customHooks/useProducts';
import { addToDb, getData } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // const [products, setProducts] = useProducts();
    const [products, setProducts] = useState([]);
    const [carts, setCart] = useCarts();
    const [pagesNumber, setPagesNumber] = useState(0) 
    const [currentPage, setCurrentPage] = useState(0)
    const [productsOnPage, setProductsOnPage] = useState(10)

    useEffect( () =>{
        fetch(`http://localhost:5000/products?currentPage=${currentPage}&productsOnPage=${productsOnPage}`)
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, [currentPage, productsOnPage]);

    useEffect(() => {
        fetch('http://localhost:5000/productsLength')
            .then(res => res.json())
            .then(data => {
                const pagesNeed = Math.ceil(data.productsLength / 10)
                setPagesNumber(pagesNeed)
            })
    },[])

    const handleAddToCart = (clickedProduct) => {
        const matchedProduct = carts.find(product => product._id === clickedProduct._id)
        let newCart = [];

        if (matchedProduct) {
            const remainProducets = carts.filter( product => product._id !== clickedProduct._id )
            matchedProduct.quantity = matchedProduct.quantity + 1
            newCart = [...remainProducets, matchedProduct];
            
        } else {
            
            clickedProduct.quantity = 1
            newCart = [...carts, clickedProduct];
        }
        // do not do this: cart.push(product);
        setCart(newCart);
        addToDb(clickedProduct._id)
    }
    console.log(currentPage, productsOnPage);
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
                <div className='page-btn'>
                    {
                        [...Array(pagesNumber).keys()].map(number =>
                            <Button
                                // className={page === number ? 'page-active-btn' : ''}
                                className='active-btn'
                                onClick={() => setCurrentPage(number)}>
                                {number + 1}
                            </Button>)    
                    }
                    <select onChange={e => setProductsOnPage(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
            <div className="cart-container">
                <Cart carts={carts}></Cart>
            </div>
        </div>
    );
};

export default Shop;