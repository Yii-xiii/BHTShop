import React from 'react'
import {Link} from 'react-router-dom'
import './Favourite.css'
import favLogo from './Favourite.png'
import Cookies from 'js-cookie'

const Favourite = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            // link to userId fav list
            <Link className='fav-link' to='/favProducts'>
                <img className='fav-logo' src={favLogo} alt='logo'/>
            </Link>
        )
    }

    return (
        <Link className='fav-link' to='/login'>
            <img className='fav-logo' src={favLogo} alt='logo'/>
        </Link>
    )
}

export default Favourite
