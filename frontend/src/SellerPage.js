import React from 'react'
import {useParams} from 'react-router-dom'
import Footer from './Components/Footer'
import Header from './Components/Header'

const SellerPage = () => {
    const { sellerId } = useParams()

    return (
        <div>
            <Header />
                <h1>TODO SELLER PAGE</h1>
            <Footer />
        </div>
    )
}

export default SellerPage
