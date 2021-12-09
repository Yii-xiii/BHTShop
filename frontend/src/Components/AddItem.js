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
                <AddCircleOutlineOutlinedIcon className='addItem-logo' color='action'/>
            </Link>
        )
    }

    return (
        <Link className='addItem-link' to='/'>
            <AddCircleOutlineOutlinedIcon className='addItem-logo' color='action'/>
            {/* getting favourite count and pass in */}
        </Link>
    )
}

export default AddItem
