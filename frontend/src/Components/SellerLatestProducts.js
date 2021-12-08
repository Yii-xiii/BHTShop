import './SellerLatestProducts.css'
import {useState, useEffect} from 'react'
import './RandomProducts.css'
import api from './Api'
import Products from './Products'
import { useParams } from 'react-router'
import SellerLatestProduct from './SellerLatestProduct'

const SellerLatestProducts = () => {
    // switch getSellerLatestProductList api to sellerId
    const { sellerId } = useParams()
    let count = 1

    // Initializing
    const [products, setProducts] = useState([])

    // Fetch data from database
    const fetchProducts = async() => {
        const data = await api.getSellerLatestProductList(sellerId)
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

    
    if (products.length > 0) {
        return (
            <div className='seller-latest-box'>
                <h1>新品上架</h1>
    
                <div className='seller-latest-show-box'>
                    {products.length > 0 ? products.map((product, index) => (
                        <SellerLatestProduct key={index} product={product} count={count++}/>
                    )) : console.log('No product founds.')}
                </div>
            </div>
        )
    }
    
    return (
        <div>
            
        </div>
    )
}

export default SellerLatestProducts
