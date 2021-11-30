import {useState, useEffect} from 'react'
import './RankedProducts.css'
import api from './Api'
import Products from './Products'
import HorizontalScroll from 'react-scroll-horizontal'

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
            
            <HorizontalScroll 
                pageLock={true} 
                reverseScroll={true}
                style={{width: `100%`, height: `300px`}}>

                <div className='ranked-show-box'>
                    {products.length > 0 ? <Products products={ products }/>
                    : console.log('No product founds.')}
                </div>
            </HorizontalScroll>
        </div>
    )
}

export default RankedProducts
