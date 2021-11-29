import {useState, useEffect} from 'react'
import Api from './Api'
import './RandomProducts.css'
import Products from './Products'

const RandomProducts = () => {
    // Initializing
    const [products, setProducts] = useState([])

    // Fetch data from database
    const fetchProducts = async() => {
        const response = await fetch('http://localhost:8000/products')
        const data = await response.json()

        console.log(data)
        return data
    }

    useEffect(() => {
        const getProducts = async() => {
            const productsFromServer = await fetchProducts()
            setProducts(productsFromServer)
        }

        getProducts()
    }, [])

    return (
        <div className='random-box'>
            <h1>随机商品</h1>

            {products.length > 0 ? <Products products={products}/>
            : console.log('no tasks.')}
        </div>
    )
}

export default RandomProducts
