import React from 'react'
import {useParams} from 'react-router-dom'
import ProductMainInfo from './Components/ProductMainInfo'
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

                <h1>TODO Item:{ productId } Descriptions</h1>
            </div>

            <Footer />
        </div>
        
    )
}

export default ProductPage
