import React from 'react'
import './SellerPreview.css'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const SellerPreview = () => {
    const path=`/seller/${Cookies.get('user_id')}`

    return (
        <div className='preview-box'>
            <Link className='store-link' to={path}>
                <span>点击此处预览您的商店页面。</span>
            </Link>
        </div>
    )
}

export default SellerPreview
