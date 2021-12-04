import {useState, useEffect} from 'react'
import './FavProduct.css'
import api from './Api'
import {Link} from 'react-router-dom'

const FavProduct = ({ favProduct }) => {
    const [image, setImages] = useState([])

    // Fetch data from database
    const fetchImages = async() => {
        const data = await api.getFirstProductImage(favProduct.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        getImages()
    }, [])

    const path = `/product/${favProduct.id}`

    return (
        <div>
            <Link to={path}>
                <div className='fav-product-box'>
                    <div className='fav-image-box'>
                        <img src={ image? image.image_url : '0'} alt='img'/>
                    </div>

                    <div className='fav-details-box'>
                        <span>商品名称: {favProduct.title}</span>
                        <span>商品价格: {favProduct.title}</span>
                        <span>商品库存: {favProduct.title}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default FavProduct
