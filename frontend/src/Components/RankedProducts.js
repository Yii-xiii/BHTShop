import {useState, useEffect} from 'react'
import './RankedProducts.css'
import api from './Api'
import Products from './Products'

const RankedProducts = () => {
    // Initializing
    const [products, setProducts] = useState([])

    // Fetch data from database
    const fetchProducts = async() => {
        const data = await api.getProductList()

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
        <div className='ranked-box'>
            <h1>销量排名</h1>
            
            <div className='ranked-show-box'>
                {products.length > 0 ? <Products products={ products }/>
                : console.log('No product founds.')}
            </div>
        </div>
    )
}

export default RankedProducts
