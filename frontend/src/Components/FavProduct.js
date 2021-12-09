import {useState, useEffect} from 'react'
import './FavProduct.css'
import api from './Api'
import {Link} from 'react-router-dom'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const FavProduct = ({ favProduct }) => {
    const [image, setImages] = useState([])
    const [price, setPrice] = useState('0.00')

    // Fetch data from database
    const fetchImages = async() => {
        const data = await api.getFirstProductImage(favProduct.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchSpecs = async() => {
        const data = await api.getProductSpecList(favProduct.id)
        // const data = await response.json()

        if (data !== undefined) return data.data
    }

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        const getSpecs = async() => {
            const specsFromServer = await fetchSpecs()
            setPrice(specsFromServer[0].price)
        }

        getSpecs()
        getImages()
    }, [])

    const path = `/product/${favProduct.id}`

    const deleteCollection = async(favProductId) => {
        await api.deleteCustomerCollection(favProductId)
        window.location.reload(false)
    }

    return (
        <div>
            <div className='fav-product-box'>
                <Link className='image-link' to={path}>
                    <div>
                        <img className='image-item' src={ image? image.image_url : '0'} alt='img'/>
                    </div>
                </Link>

                <div className='fav-details-box'>
                    <div className='fav-product-description'>
                        <h3>商品: </h3> 
                        <span>{favProduct.title}</span>
                    </div>

                    <div className='fav-product-description'>
                        <h3>描述: </h3>
                        <span>{favProduct.description}</span>
                    </div>
                    
                    <div className='fav-product-description'>
                        <h3>价格: </h3>
                        <span>¥ {price}</span>
                    </div>

                    <div className='fav-buttons-box'>
                        <button className='delete-item-button' onClick={() => deleteCollection(favProduct.id)}>
                            <DeleteOutlineOutlinedIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavProduct
