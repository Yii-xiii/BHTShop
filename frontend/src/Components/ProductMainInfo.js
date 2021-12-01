import {useState, useEffect} from 'react'
import './ProductMainInfo.css'
import api from './Api'

const ProductMainInfo = ({ productId }) => {
    // Initializing
    const [product, setProduct] = useState([])

    // Fetch Product from database
    const fetchProduct = async() => {
        const data = await api.getProduct(productId)
        // const data = await response.json()

        return data.data[0]
    }

    // Importing data
    useEffect(() => {
        const getProduct = async() => {
            const productsFromServer = await fetchProduct()
            setProduct(productsFromServer)
        }

        getProduct()
    }, [])

    return (
        <div className='main-info-box'>
            <div className='main-info-show-box'>
                <div className='main-info-photo-box'>
                    {/* TODO, slide photos here */}
                </div>
                
                <div className='main-info-name-box'>
                    <h2>{product.title}</h2>
                </div>
            </div>
        </div>
    )
}

export default ProductMainInfo
