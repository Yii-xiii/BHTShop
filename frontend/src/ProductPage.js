import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import ProductMainInfo from './Components/ProductMainInfo'
import ProductDescription from './Components/ProductDescription'
import ProductReviews from './Components/ProductReviews'
import './ProductPage.css'
import Header from './Components/Header'
import api from './Components/Api'
import Footer from './Components/Footer'

const ProductPage = ({ paramId }) => {
    const { productId } = useParams()
    const [product, setProduct] = useState([])

    // Fetch data from database
    // Fetch Product from database
    const fetchProduct = async() => {
        const data = await api.getProduct(productId)
        // const data = await response.json()

        console.log(data.data[0])
        return data.data[0]
    }

    // Importing data
    useEffect(() => {
        const getProduct = async() => {
            const productFromServer = await fetchProduct()
            setProduct(productFromServer)
        }

        getProduct()
    }, [])

    return (
        <div>
            <Header />

            <div className='product-page-box'>
                <ProductMainInfo productId={ productId }/>
                
                <ProductDescription product={product} />
                <ProductReviews productId={ productId }/>
            </div>

            <Footer />
        </div>
        
    )
}

export default ProductPage
