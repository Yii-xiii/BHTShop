import {useState, useEffect} from 'react'
import './ProductMainInfo.css'
import api from './Api'

const ProductMainInfo = ({ productId }) => {
    // Initializing
    const [product, setProduct] = useState([])
    const [image, setImages] = useState([])
    const [specs, setSpecs] = useState([])

    // Fetch Product from database
    const fetchProduct = async() => {
        const data = await api.getProduct(productId)
        // const data = await response.json()

        return data.data[0]
    }

    const fetchSpecs = async() => {
        const data = await api.getProductSpecList(productId)
        // const data = await response.json()

        console.log(data.data)
        return data.data
    } 

    const fetchImages = async() => {
        const data = await api.getFirstProductImage(productId)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    // Importing data
    useEffect(() => {
        const getProduct = async() => {
            const productsFromServer = await fetchProduct()
            setProduct(productsFromServer)
        }

        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        const getSpecs = async() => {
            const specsFromServer = await fetchSpecs()
            setSpecs(specsFromServer)
        }

        getProduct()
        getImages()
        getSpecs()
    }, [])

    return (
        <div className='main-info-box'>
            <div className='main-info-show-box'>
                <div className='main-info-photo-box'>
                    <img className='main-image' src={ image? image.image_url : '0'} alt='img'/>
                </div>
                
                <div className='main-info-name-box'>
                    <h2>{product.title}</h2>
                </div>
            </div>
        </div>
    )
}

export default ProductMainInfo
