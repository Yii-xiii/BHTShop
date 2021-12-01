import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Product.css'
import api from './Api'

const Product = ({ product }) => {
    // Initializing
    const [image, setImages] = useState([])
    let imgPath

    // Fetch data from database
    const fetchImages = async() => {
        const data = await api.getFirstProductImage(product.id)
        
        let returnData = ''

        {data.errorCode === '404' ? (console.log('image not found')) : (returnData = data.data[0])}
        
        console.log(product.title + ' ' + returnData)

        return returnData
    }

    // Importing data
    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        getImages()
    }, [])

    return (
        <div>
            {product.title.length > 0 ? (
                <Link to='/'>
                    <div className='product-box'>
                        {image ? imgPath='"' + image.image_absolute_path + '"' : ''}
                        
                        <img src={imgPath}/>
                        <h3 className='title-text'>{product.title}</h3>
                        <h5 className='desc-text'>{product.description}</h5>
                    </div>
                </Link>
            ) : console.log('Empty title product found.')}
        </div>
    )
}

export default Product
