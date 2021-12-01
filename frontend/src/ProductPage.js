import React from 'react'
import {useParams} from 'react-router-dom'
import ProductMainInfo from './Components/ProductMainInfo'
import './ProductPage.css'

const ProductPage = () => {
    const { productId } = useParams()

    return (
        <div className='product-page-box'>
            <ProductMainInfo productId={ productId }/>

            <h1>TODO Item:{ productId } Descriptions</h1>
        </div>
    )
}

export default ProductPage
