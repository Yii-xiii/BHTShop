import React from 'react'
import { useParams } from 'react-router'
import Footer from './Components/Footer'
import Header from './Components/Header'

const ProductCommentsPage = () => {
    const { productId } = useParams()
    return (
        <div>
            <Header />
            <h1>TODO PRODUCT {productId} COMMENTS</h1>
            <Footer />
        </div>
    )
}

export default ProductCommentsPage
