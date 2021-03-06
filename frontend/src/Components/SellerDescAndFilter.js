import React from 'react'
import { useNavigate, useParams } from 'react-router'
import api from './Api'
import {useState, useEffect} from 'react'
import './SellerDescAndFilter.css'
import Cookies from 'js-cookie'

const SellerDescAndFilter = () => {
    const { sellerId } = useParams()
    const navigate = useNavigate()
    const [seller, setSeller] = useState([])
    const [followship, setFollowship] = useState([])
    const [followCount, setFollowCount] = useState('')
    const [avgRating, setAvgRating] = useState('')

    const fetchFollowCount = async () => {
        const data = await api.getSellerFollowshipCount(sellerId)
        return data.data.count
    }

    const fetchAvgRating = async () => {
        const data = await api.getSellerAverageRating(sellerId)
        return data? data.data.rating : '未有商品'
    }

    // Fetch data from database
    const fetchSeller = async() => {
        const data = await api.getSeller(sellerId)
        // const data = await response.json()

        return data.data[0]
    }

    const fetchFollowship = async() => {
        if (Cookies.get('user') === 'Customer') {
            const data = await api.getCustomerFollowship(sellerId)

            return data.data
        }
    }

    const getFollowCount = async() => {
        const followCountFromServer = await fetchFollowCount()
        setFollowCount(followCountFromServer)
    }

    // Importing data
    useEffect(() => {
        const getSeller = async() => {
            const sellerFromServer = await fetchSeller()
            setSeller(sellerFromServer)
        }

        const getFollowship = async() => {
            if (Cookies.get('user') === 'Customer') {
                const followshipFromServer = await fetchFollowship()
                setFollowship(followshipFromServer)
            }
        }

        const getAvgRating = async() => {
            const followCountFromServer = await fetchAvgRating()
            setAvgRating(followCountFromServer)
        }

        getAvgRating()
        getFollowCount()
        getFollowship()
        getSeller()
    }, [followCount])

    const followSeller = async() => {
        if (Cookies.get('user') === 'Customer') {
            await api.createCustomerFollowship(sellerId)
            getFollowCount()
        } else if (Cookies.get('user') === undefined) {
            navigate('/login')
        }
    }

    const unfollowSeller = async() => {
        await api.deleteCustomerFollowship(sellerId)
        getFollowCount()
    }

    const reportSellerPath = `/report/user/${sellerId}`

    function reportUser() {
        if (Cookies.get('user') === 'Customer') {
            navigate(reportSellerPath)
        } else if (Cookies.get('user') === undefined) {
            navigate('/login')
        }
    }

    if (Cookies.get('user') === 'Seller') {
        return (
            <div className='seller-desc-and-filter-outer-box'>
                <div className='seller-desc-box'>
                    <h2>{seller.username}</h2>
                    
                    <div className='seller-desc-texts-box'>
                        <h4>注册于: </h4>
                        <span>{seller.joinDate}</span>
                    </div>
    
                    <div className='seller-desc-texts-box'>
                        <h4>粉丝数: </h4>
                        <span> {followCount}</span>
                    </div>
    
                    <div className='seller-exclusive-desc-texts-box'>
                        <h4>评价: </h4>
                        <span> {parseFloat(avgRating).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (followship.length > 0) {
        return (
            <div className='seller-desc-and-filter-outer-box'>
                <div className='seller-desc-box'>
                    <h2>{seller.username}</h2>
                    
                    <div className='seller-desc-texts-box'>
                        <h4>注册于: </h4>
                        <span>{seller.joinDate}</span>
                    </div>
    
                    <div className='seller-desc-texts-box'>
                        <h4>粉丝数: </h4>
                        <span> {followCount}</span>
                    </div>
    
                    <div className='seller-desc-texts-box'>
                        <h4>评价: </h4>
                        <span> {parseFloat(avgRating).toFixed(2)}</span>
                    </div>
    
                    <div className='seller-desc-buttons-box'>
                        <button className='seller-desc-unfollow-button'
                         onClick={() => {unfollowSeller()}}>
                            取消关注
                        </button>
    
                        <button className='seller-desc-report-button' onClick={() => reportUser()}>
                            举报
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='seller-desc-and-filter-outer-box'>
            <div className='seller-desc-box'>
                <h2>{seller.username}</h2>
                
                <div className='seller-desc-texts-box'>
                    <h4>注册于: </h4>
                    <span>{seller.joinDate}</span>
                </div>

                <div className='seller-desc-texts-box'>
                    <h4>粉丝数: </h4>
                    <span> {followCount}</span>
                </div>

                <div className='seller-desc-texts-box'>
                    <h4>评价: </h4>
                    <span> {parseFloat(avgRating).toFixed(2)}</span>
                </div>

                <div className='seller-desc-buttons-box'>
                    <button className='seller-desc-follow-button'
                     onClick={() => {followSeller()}}>
                        关注
                    </button>

                    <button className='seller-desc-report-button' onClick={() => reportUser()}>
                        举报
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SellerDescAndFilter
