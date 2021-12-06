import React from 'react'
import { useParams } from 'react-router'
import Footer from './Components/Footer'
import Header from './Components/Header'

const SellerPage = () => {
    const { sellerId } = useParams()

    return (
        <div>
            <Header />
            {sellerId}
            <Footer />
        </div>
    )
}

export default SellerPage
