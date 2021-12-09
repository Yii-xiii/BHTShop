import React from 'react'
import {Link} from 'react-router-dom'
import './Favourite.css'
import favLogo from './Favourite.png'
import Cookies from 'js-cookie'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorder';

const Favourite = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            // link to userId fav list
            <Link className='fav-link' to='/favProducts'>
                <FavoriteBorderOutlinedIcon color='action'/>
            </Link>
        )
    }

    return (
        <Link className='fav-link' to='/login'>
            <FavoriteBorderOutlinedIcon color='action'/>
        </Link>
    )
}

export default Favourite
