import React from 'react'
import {Link} from 'react-router-dom'
import './Favourite.css'
import favLogo from './Favourite.png'
import Notification from './Notification'
import Cookies from 'js-cookie'

const Favourite = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            // link to userId fav list
            <Link className='fav-link' to='/fav'>
                <img className='fav-logo' src={favLogo} alt='logo'/>
                {/* getting favourite count and pass in */}
                <Notification count='0' type='fav'/>
            </Link>
        )
    }

    return (
        <Link className='fav-link' to='/login'>
            <img className='fav-logo' src={favLogo} alt='logo'/>
            {/* getting favourite count and pass in */}
            <Notification count='0' type='fav'/>
        </Link>
    )
}

export default Favourite
