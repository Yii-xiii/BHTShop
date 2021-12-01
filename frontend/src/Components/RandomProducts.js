import {useState, useEffect} from 'react'
import './RandomProducts.css'
import api from './Api'
import Products from './Products'

const RandomProducts = () => {
    // Initializing
    const [products, setProducts] = useState([])

    // Fetch data from database
    const fetchProducts = async() => {
        const data = await api.getProductList()
        // const data = await response.json()

        return data.data
    }

    // Importing data
    useEffect(() => {
        const getProducts = async() => {
            const productsFromServer = await fetchProducts()
            setProducts(productsFromServer)
        }

        getProducts()
    }, [])
    
    // Output
    return (
        <div className='random-box'>
            <h1>商品库</h1>
            
            <div className='random-show-box'>
                {products.length > 0 ? <Products products={ products }/>
                : console.log('No product founds.')}
            </div>
        </div>
    )
}

export default RandomProducts
