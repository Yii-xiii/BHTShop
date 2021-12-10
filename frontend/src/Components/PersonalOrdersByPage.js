import React from 'react'
import api from './Api'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import PersonalOrder from './PersonalOrder'
import { useParams } from 'react-router'
import './PersonalOrdersByPage.css'
import { Pagination } from '@mui/material'

const PersonalOrdersByPage = () => {
    const [orderListByPage, setOrderListByPage] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(1)

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const fetchOrderListByPage = async() => {
        const data = await api.getLatestCustomerOrderListByPage(Cookies.get('user_id'), page)
        return data
    }

    useEffect(() => {
        const getOrderListByPage = async() => {
            const specsFromServer = await fetchOrderListByPage()
            setOrderListByPage(specsFromServer.data)
            setPageCount(specsFromServer.pageCount)
        }

        getOrderListByPage()
    }, [page])

    return (
        <div className='orders-out-box'>
            <div className='orders-page-box'>
                <Pagination count={pageCount} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
            </div>
            
            {orderListByPage.map((order, index) => (
                <PersonalOrder key={index} order={order}/>
            ))}
        </div>
    )
}

export default PersonalOrdersByPage
