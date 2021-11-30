import React from 'react'
import './Product.css'
import api from './Api'

const Product = ({ product }) => {
    // const [images, setImages] = useState([])

    const fetchImages = async() => {
        // const response = await fetch(Api.getProductImageList(product.id))
        // const data = await response.json()
    }

    return (
        <div>
            {product.title.length > 0 ? (
                <div className='product-box'>
                    <h3 className='title-text'>{product.title}</h3>
                    <h5 className='desc-text'>{product.description}</h5>
                </div>
            ) : console.log('empty product')}
        </div>
    )
}

export default Product
