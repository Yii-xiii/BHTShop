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

        console.log('data: ' + data)
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
            
            <div className='random-show-box'>
                {/*products.size > 0 ? <Products products={ products }/>
                : console.log('no product.')*/}
            </div>
        </div>
    )
}

export default RandomProducts
