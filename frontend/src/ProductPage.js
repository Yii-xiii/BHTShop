import React from 'react'
import {useParams} from 'react-router-dom'
import ProductMainInfo from './Components/ProductMainInfo'
import ProductDescription from './Components/ProductDescription'
import ProductReviews from './Components/ProductReviews'
import './ProductPage.css'
import Header from './Components/Header'
import Footer from './Components/Footer'

const ProductPage = () => {
    const { productId } = useParams()

    return (
        <div>
            <Header />

            <div className='product-page-box'>
                <ProductMainInfo productId={ productId }/>
                <ProductDescription productId={ productId }/>
                <ProductReviews productId={ productId }/>
            </div>

            <Footer />
        </div>
        
    )
}

export default ProductPage
