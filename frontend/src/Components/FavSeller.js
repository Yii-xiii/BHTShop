import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import api from './Api'
import './FavSeller.css'

const FavSeller = ({favSeller}) => {
    const [followCount, setFollowCount] = useState('')
    const [avgRating, setAvgRating] = useState('')

    const fetchFollowCount = async () => {
        const data = await api.getSellerFollowshipCount(favSeller.id)
        return data.data.count
    }

    const fetchAvgRating = async () => {
        const data = await api.getSellerAverageRating(favSeller.id)
        return data.data.rating
    }

    useEffect(() => {
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
    }, [])

    const sellerPath = `/seller/${favSeller.id}`

    return (
        <div>
            <div className='user-fav-seller-out-box'>
                <div className='user-fav-seller-desc-box'>
                    <Link className='fav-seller-to-seller-link' to={sellerPath}>
                        <div className='user-fav-seller-desc'>
                            <h3>{favSeller.username}</h3>
                        </div>
                    </Link>

                    <div className='user-fav-seller-desc'>
                        <h4>粉丝数: </h4>
                        <span>{followCount}</span>
                    </div>

                    <div className='user-fav-seller-desc'>
                        <h4>评价: </h4>
                        <span>{avgRating}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavSeller