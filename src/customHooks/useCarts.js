import { useEffect, useState } from "react"
import { getData } from "../utilities/fakedb"
import useProducts from "./useProducts";

const useCarts = ()=> {
    const [carts, setCarts] = useState([]) 
    const [products, setProducts] = useProducts();
    useEffect(() => {
        const storedProducts = getData()

        const selectedProducts = []
        for (const key in storedProducts) {
            const matchedProduct = products.find(product => product.id === key)
            if (matchedProduct) {
                matchedProduct.quantity = storedProducts[key]
                selectedProducts.push(matchedProduct)
            }
        }
        setCarts(selectedProducts)
    }, [products])
    
    return [carts, setCarts]

}
export default useCarts