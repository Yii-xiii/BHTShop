import React from 'react'
import {Link} from 'react-router-dom'
import './AddItem.css'
import addItemLogo from './AddItem.png'
import Cookies from 'js-cookie'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

const AddItem = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Seller') {
        return (
            // link to userId fav list
            <Link className='addItem-link' to='/addProduct'>
                <div className='seller-add-item-circle-black-logo'>
                    <AddCircleOutlineOutlinedIcon className='addItem-logo'/>
                </div>
                
            </Link>
        )
    }

    return (
        <Link className='addItem-link' to='/'>
            <div className='seller-add-item-circle-black-logo'>
                <AddCircleOutlineOutlinedIcon className='addItem-logo'/>
            </div>
        </Link>
    )
}

export default AddItem
