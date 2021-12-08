import React from 'react'
import { useNavigate, useParams } from 'react-router'
import api from './Api'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
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
        return data.data.rating
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

        const getFollowCount = async() => {
            const followCountFromServer = await fetchFollowCount()
            setFollowCount(followCountFromServer)
        }

        const getAvgRating = async() => {
            const followCountFromServer = await fetchAvgRating()
            setAvgRating(followCountFromServer)
        }

        getAvgRating()
        getFollowCount()
        getFollowship()
        getSeller()
    }, [])

    const followSeller = async() => {
        if (Cookies.get('user') === 'Customer') {
            await api.createCustomerFollowship(sellerId)
            window.location.reload(false)
        } else if (Cookies.get('user') === undefined) {
            navigate('/login')
        }
    }

    const unfollowSeller = async() => {
        await api.deleteCustomerFollowship(sellerId)
        window.location.reload(false)
    }

    const reportSellerPath = `/report/${sellerId}`

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
                        <span> {avgRating}</span>
                    </div>
    
                    <div className='seller-desc-buttons-box'>
                        <button className='seller-desc-unfollow-button'
                         onClick={() => {unfollowSeller()}}>
                            取消关注
                        </button>
    
                        <Link to={reportSellerPath}>
                            <button className='seller-desc-report-button'>
                                举报
                            </button>
                        </Link>
                    </div>
                </div>
    
                <div className='seller-filter-box'>
                    <div className='seller-filter-by-type-box'>
                        <h3>按种类排序</h3>
                        <span>女装</span>
                        <span>男装</span>
                        <span>运动</span>
                        <span>美妆</span>
                        <span>饮料</span>
                        <span>零食</span>
                        <span>其他</span>
                    </div>
    
                    <div className='seller-filter-by-rating-box'>
                        <h3>按评价排序</h3>
                        <span>由低到高</span>
                        <span>由高到低</span>
                    </div>
    
                    <div className='seller-filter-by-price-box'>
                        <h3>按价格排序</h3>
                        <span>由低到高</span>
                        <span>由高到低</span>
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
                    <span> {avgRating}</span>
                </div>

                <div className='seller-desc-buttons-box'>
                    <button className='seller-desc-follow-button'
                     onClick={() => {followSeller()}}>
                        关注
                    </button>

                    <button className='seller-desc-report-button'>
                        举报
                    </button>
                </div>
            </div>

            <div className='seller-filter-box'>
                <div className='seller-filter-by-type-box'>
                    <h3>按种类排序</h3>
                    <span>女装</span>
                    <span>男装</span>
                    <span>运动</span>
                    <span>美妆</span>
                    <span>饮料</span>
                    <span>零食</span>
                    <span>其他</span>
                </div>

                <div className='seller-filter-by-rating-box'>
                    <h3>按评价排序</h3>
                    <span>由低到高</span>
                    <span>由高到低</span>
                </div>

                <div className='seller-filter-by-price-box'>
                    <h3>按价格排序</h3>
                    <span>由低到高</span>
                    <span>由高到低</span>
                </div>
            </div>
        </div>
    )
}

export default SellerDescAndFilter
