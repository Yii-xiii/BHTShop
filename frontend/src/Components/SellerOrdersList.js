import React from 'react'
import {useState, useEffect} from 'react'
import api from './Api'
import SellerOrder from './SellerOrder'
import './SellerOrdersList.css'

const SellerOrdersList = ({ status }) => {
    const [orders, setOrders] = useState([])

    const fetchOrders = async() => {
        const data = await api.getSellerOrderListByStatus(status)
        console.log(data)
        return data.data
    }

    useEffect(() => {
        const getOrders = async() => {
            const ordersFromServer = await fetchOrders()
            setOrders(ordersFromServer)
        }

        getOrders()
    }, [])

    return (
        <div className='seller-orders-show-box'>
            {orders.length > 0 ? orders.map((order, index) => (
                <SellerOrder key={index} order={order}/>
            )) : <span>暂时没有{status}的订单哦。</span>}
        </div>
    )
}

export default SellerOrdersList