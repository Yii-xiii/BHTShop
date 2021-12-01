import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Product.css'
import api from './Api'

const Product = ({ product }) => {
    // Initializing
    const [image, setImages] = useState([])

    // Fetch data from database
    const fetchImages = async() => {
        const data = await api.getFirstProductImage(product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    // Importing data
    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        getImages()
    }, [])

    const path = `/product/${product.id}`

    return (
        <div className='product-out-box'>
            {product.title.length > 0 ? (
                <Link to={path}>
                    <div className='product-box'>
                        <div className='image-box'>
                            <img src={ image? image.image_url : '0'} alt='img'/>
                        </div>

                        <h3 className='title-text'>{product.title}</h3>
                        <h5 className='desc-text'>{product.description}</h5>
                    </div>
                </Link>
            ) : console.log('Empty title product found.')}
        </div>
    )
}

export default Product
