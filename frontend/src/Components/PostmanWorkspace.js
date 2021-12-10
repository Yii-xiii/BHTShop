import { FormControlLabel, Pagination, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import {useState, useEffect} from 'react'
import './PostmanWorkspace.css'
import api from './Api'
import PostmanOrder from './PostmanOrder'

const PostmanWorkspace = () => {
    const [page, setPage] = useState(1)
    const [orderStatusFilter, setOrderStatusFilter] = useState('pending')
    const [orders, setOrders] = useState([])
    const [pageCount, setPageCount] = useState(0)

    const handleOrderStatusFilter = (event, value) => {
        setOrderStatusFilter(value)
        setPage(1)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const fetchOrders = async() => {
        if (orderStatusFilter === 'pending') {
            const data = await api.getShippedOrderList(page)
            return data
        } else if (orderStatusFilter === 'delivered') {
            const data = await api.getPostmanDeliveredOrderList(page)
            return data
        }
    }

    useEffect(() => {
        const getOrders = async() => {
            const ordersFromServer = await fetchOrders()
            setOrders(ordersFromServer.data)
            setPageCount(ordersFromServer.pageCount)
        }

        getOrders()
    }, [orderStatusFilter, page])

    return (
        <div className='admin-workspace-out-box'>
            <div className='admin-workspace-filter-box'>
                <h3>筛选</h3>

                <div className='admin-workspace-type-filter-box'>
                    <h4>订单分类</h4>
                    
                    <RadioGroup defaultValue="pending" name="radio-buttons-group" onChange={handleOrderStatusFilter}>
                        <FormControlLabel value="pending" control={<Radio size="small" color="default"/>} label="待派送" />
                        <FormControlLabel value="delivered" control={<Radio size="small" color="default"/>} label="已完成" />
                    </RadioGroup>
                </div>
            </div>

            <div className='admin-workspace-show-box'> 
                <div className='admin-workspace-show-page-box'>
                    {/* change to report page */}
                    <Pagination count={pageCount} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                </div>

                <div className='admin-workspace-report-show-box'>
                    {orders.map((order, index) => (
                        <div className='admin-workspace-report-box'>
                            <PostmanOrder order={order} orderStatusFilter={orderStatusFilter}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostmanWorkspace
