import React from 'react'
import { Link } from 'react-router-dom';
import './FavSeller.css'

export const FavSeller = ({favSeller}) => {
    return (
        <div>
            <div className='user-fav-seller-out-box'>
                <div className='user-fav-seller-desc-box'>
                    <Link className='fav-seller-to-seller-link' to=''>
                        <div className='user-fav-seller-desc'>
                            <h3>{favSeller.username}</h3>
                        </div>
                    </Link>

                    <div className='user-fav-seller-desc'>
                        <h4>粉丝数: </h4>
                        <span>0</span>
                    </div>

                    <div className='user-fav-seller-desc'>
                        <h4>评价: </h4>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
