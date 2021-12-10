import {useState, useEffect} from 'react'
import './SellerRankedProducts.css'
import api from './Api'
import Products from './Products'
import HorizontalScroll from 'react-scroll-horizontal'
import { useParams } from 'react-router'


const SellerRankedProducts = () => {
    // switch getSellerBestSellingProductList api to sellerId
    const { sellerId } = useParams()

    // Initializing
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)

    // Fetch data from database
    const fetchProducts = async() => {
        const data = await api.getSellerBestSellingProductListByPage(sellerId, 1)

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
    if (products.length > 0) {
        return (
            <div className='seller-ranked-box'>
                <h1>本店热销</h1>
                
                <HorizontalScroll 
                    pageLock={true} 
                    reverseScroll={true}
                    style={{width: `100%`, height: `320px`}}>
    
                    <div className='seller-ranked-show-box'>
                        {products.length > 0 ? <Products products={ products } type='ranked'/>
                        : console.log('No product founds.')}
                    </div>
                </HorizontalScroll>
            </div>
        )
    }
    
    return (
        <div className='seller-ranked-box'>
            <h2>本店目前未上架任何商品。</h2>
        </div>
    )
}

export default SellerRankedProducts
