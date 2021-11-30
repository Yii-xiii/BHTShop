import {useState, useEffect} from 'react'
import './Product.css'
import api from './Api'

const Product = ({ product }) => {
    // Initializing
    const [images, setImages] = useState([])

    // Fetch data from database
    const fetchImages = async() => {
        const data = await api.getProductImageList(product.id)

        console.log('images: ' + data)
        return data.data
    }

    // Importing data
    useEffect(() => {
        const getImages = async() => {
            const productsFromServer = await fetchImages()
            setImages(productsFromServer)
        }

        getImages()
    }, [])

    return (
        <div>
            {product.title.length > 0 ? (
                <div className='product-box'>
                    {/* getting first image and output it here*/}
                    {/* <img src={images[Object.keys(images)[0]]}/> */}
                    <h3 className='title-text'>{product.title}</h3>
                    <h5 className='desc-text'>{product.description}</h5>
                </div>
            ) : console.log('Empty title product found.')}
        </div>
    )
}

export default Product
