import React from 'react'
import './SellerLatestProduct.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import api from './Api'

const SellerLatestProduct = ({ product, count }) => {
    const [spec, setSpec] = useState([])
    const [image, setImages] = useState([])

    const fetchImages = async() => {
        const data = await api.getFirstProductImage(product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchSpec = async() => {
        const data = await api.getProductSpecList(product.id)
        // const data = await response.json()
        
        if (data !== 'undefined') return data.data[0]
    } 

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        const getSpec = async() => {
            const specsFromServer = await fetchSpec()
            setSpec(specsFromServer)
        }

        getImages()
        getSpec()
    }, [product, count])

    const productPath = `/product/${product.id}`

    if (count <= 10) {
        return (
            <div>
                <div className='seller-latest-product-out-box'>
                    <div className='seller-latest-product-count-box'>
                        <h3>{count}</h3>
                    </div>

                    <Link className='seller-latest-product-link' to={productPath}>
                        <div className='seller-latest-product-image-box'>
                            <img src={ image? image.image_url : '0'} alt='img'/>
                        </div>
                    </Link>
    
                    <div className='seller-latest-product-desc-box'>
                        <h5>{product.title}</h5>
                        <span>{product.description}</span>
                        <span>¥ {spec.price}</span>
                    </div>
                    
                </div>
            </div>
        )
    }
    
    return (
        <div>

        </div>
    )
}

export default SellerLatestProduct
