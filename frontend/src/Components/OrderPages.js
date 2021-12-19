import './OrderPages.css'

import React from 'react'
import api from './Api'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import OrderStatusListPage from './OrderStatusListPage'

const OrderPages = () => {
    const { orderId } = useParams()
    const [orderStatusList, setOrderStatusList] = useState([])

    const fetchOrderStatusList = async () => {
        const data = await api.getLatestOrderStatusList(orderId)
        console.log(data.data);
        return data.data
    }


    useEffect(() => {
        const getOrderStatusList = async () => {
            const orderStatusListFromServer = await fetchOrderStatusList()
            setOrderStatusList(orderStatusListFromServer)
        }

        getOrderStatusList()
    }, [])

    orderStatusList.reverse()
 
    return (
        <div className='order-statuslist-box'>
            {orderStatusList.length > 0 ? orderStatusList.map((statuslist, index) => (
                <OrderStatusListPage key={index} status={statuslist.status} time={statuslist.time} description={statuslist.description} />
            )): <h2>订单暂时没有更新</h2>}
        </div>  
   )

}

export default OrderPages
