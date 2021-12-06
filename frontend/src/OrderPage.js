import React from 'react'
import { useParams } from 'react-router'
import Footer from './Components/Footer'
import Header from './Components/Header'

const OrderPage = () => {
    const { orderId } = useParams()

    return (
        <div>
            <Header />
            <h1>TODO ORDER PAGE</h1>
            <Footer />
        </div>
    )
}

export default OrderPage
