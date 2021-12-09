import {useState, useEffect} from 'react'
import './RandomProducts.css'
import api from './Api'
import Products from './Products'
import { Pagination } from '@mui/material'

const RandomProducts = () => {
    // Initializing
    const [products, setProducts] = useState([])
    const [productsByPage, setProductsByPage] = useState([])
    const [page, setPage] = useState(1)

    // Fetch data from database
    const fetchProductsByPage = async() => {
        const data = await api.getProductListByPage(page)
        // const data = await response.json()

        return data.data
    }

    const fetchProducts = async() => {
        const data = await api.getProductList()
        // const data = await response.json()

        return data.data
    }


    const handlePageChange = (event, value) => {
        setPage(value)
    }

    // Importing data
    useEffect(() => {
        const getProductsByPage = async() => {
            const productsByPageFromServer = await fetchProductsByPage()
            setProductsByPage(productsByPageFromServer)
        }
        
        const getProducts = async() => {
            const productsFromServer = await fetchProducts()
            setProducts(productsFromServer)
        }

        getProductsByPage()
        getProducts()
    }, [page])
    
    // Output
    return (
        <div className='random-box'>
            <div className='random-box-title-page-box'>
                <h1>商品库</h1>
                {console.log(products.length % 10)}
                <Pagination count={products.length % 10 === 0 ? Math.floor(products.length / 10) : Math.ceil(products.length / 10)} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
            </div>
            
            
            <div className='random-show-box'>
                <div className='random-show-box-inner-part'>
                    {productsByPage.length > 0 ? <Products products={ productsByPage }/>
                    : console.log('No product founds.')}
                </div>
            </div>
        </div>
    )
}

export default RandomProducts
