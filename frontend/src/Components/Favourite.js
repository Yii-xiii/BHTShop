import React from 'react'
import {Link} from 'react-router-dom'
import './Favourite.css'
import Cookies from 'js-cookie'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorder';

const Favourite = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            // link to userId fav list
            <Link className='fav-link' to='/favProducts'>
                <div className='fav-link-button'>
                    <FavoriteBorderOutlinedIcon />
                </div>
            </Link>
        )
    }

    return (
        <Link className='fav-link' to='/login'>
            <div className='fav-link-button'>
                <FavoriteBorderOutlinedIcon />
            </div>
        </Link>
    )
}

export default Favourite
