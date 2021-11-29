import React from 'react'
import {Link} from 'react-router-dom'
import './Favourite.css'
import favLogo from './Favourite.png'
import Notification from './Notification'

const Favourite = () => {
    return (
        <Link className='fav-link' to='/fav'>
            <img className='fav-logo' src={favLogo} alt='logo'/>
            {/* getting favourite count and pass in */}
            <Notification count='0' type='fav'/>
        </Link>
    )
}

export default Favourite
