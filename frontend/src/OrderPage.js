import './OrderPage.css'

import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import OrderPages from './OrderPages'

const OrderPage = () => {

    return (
        <div>
            <Header />

            <div className='head'>
                <h1>订单进度</h1>
            </div>

            <OrderPages />
            <Footer />
        </div>
    )
    
}

export default OrderPage
