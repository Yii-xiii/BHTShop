import React from 'react'
import SellerAnalysisOptions from './SellerAnalysisOptions'
import Cookies from 'js-cookie'
import api from './Api'
import {useState, useEffect} from 'react'

const SellerAnalysis = () => {
    let userId = Cookies.get('user_id')
    const [seller, setSeller] = useState([])
    const [sellerSales, setSellerSales] = useState(0)
    const [followCount, setFollowCount] = useState('')
    const [avgRating, setAvgRating] = useState('')

    // Fetch data from database
    const fetchSeller = async() => {
        const data = await api.getSeller(userId)
        return data.data[0]
    }

    const fetchSellerSales = async() => {
        const data = await api.getRecentSellerSales(365);
        return data? data.data[0] : '未有商品'
    }

    const fetchFollowCount = async () => {
        const data = await api.getSellerFollowshipCount(seller.id)
        return data? data.data.count : '0'
    }

    const fetchAvgRating = async () => {
        const data = await api.getSellerAverageRating(seller.id)
        return data? data.data.rating : '未有商品'
    }

    // Importing data
    useEffect(() => {
        const getSeller = async() => {
            const productsFromServer = await fetchSeller()
            setSeller(productsFromServer)
        }

        const getSellerSales = async() => {
            const productFromServer = await fetchSellerSales()
            setSellerSales(productFromServer)
        }

        const getAvgRating = async() => {
            const followCountFromServer = await fetchAvgRating()
            setAvgRating(followCountFromServer)
        }

        const getFollowCount = async() => {
            const followCountFromServer = await fetchFollowCount()
            setFollowCount(followCountFromServer)
        }

        getSeller()
        getAvgRating()
        getSellerSales()
        getFollowCount()
    }, [followCount, avgRating])
    
    return (
        <div className='personal-order-box'>
            <div className="personal-info-title">
                <h1>商家信息</h1>
            </div>

            <div className='display-box'>
                <SellerAnalysisOptions />

                <div className='details-box'>
                    <div className="id-box">
                        <h3>累计营业额:</h3>
                        <span>¥ {sellerSales.sales}</span>
                    </div>

                    <div className="type-box">
                        <h3>关注人数</h3>
                        <span>{followCount}</span>
                    </div>

                    <div className='address-box'>
                        <h3>商店评价:</h3>
                        <span>{parseFloat(avgRating).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerAnalysis
