import React from 'react'
import {Link} from 'react-router-dom'
import './AddItem.css'
import addItemLogo from './AddItem.png'
import Cookies from 'js-cookie'

const AddItem = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Seller') {
        return (
            // link to userId fav list
            <Link className='addItem-link' to='/addProduct'>
                <img className='addItem-logo' src={addItemLogo} alt='logo'/>
            </Link>
        )
    }

    return (
        <Link className='addItem-link' to='/'>
            <img className='addItem-logo' src={addItemLogo} alt='logo'/>
            {/* getting favourite count and pass in */}
        </Link>
    )
}

export default AddItem
