import './OrderPage.css'

import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import OrderPages from './Components/OrderPages'

const OrderPage = () => {

    return (
        <div className='orderpage-box'>
            <Header />

            <div className='head'>
                <h1>订单进度</h1>
            </div>

            <OrderPages />

            <div className='styleFooter'>
                <Footer />
            </div>
        </div>
    )

}

export default OrderPage
