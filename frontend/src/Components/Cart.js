import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import cartLogo from './Cart.png'
import Notification from './Notification'
import './Cart.css'
import api from './Api'
import Cookies from 'js-cookie'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material'

const Cart = () => {
    const loggedInType = Cookies.get('user')
    const [cart, setCart] = useState([])

    const fetchCart = async() => {
        const data = await api.getCustomerCartList()

        if (loggedInType === 'Customer') {
            return data.data
        } 
    }

    useEffect(() => {
        const getCart = async() => {
            const specsFromServer = await fetchCart()
            setCart(specsFromServer)
        }

        getCart()
    }, [])

    if (loggedInType === 'Customer') {
        return (
            <Link className='cart-link' to='/cart'>
                <Badge badgeContent={cart.length} color='primary' max='99'
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    <ShoppingCartOutlinedIcon color='action'/>
                </Badge>
                {/* getting cart count and pass in */}
            </Link>
        )
    }
    
    return (
        <Link className='cart-link' to='/login'>
            <ShoppingCartOutlinedIcon color='action'/>
            {/* getting cart count and pass in */}
            <Notification count='0' type='cart'/>
        </Link>
    )
}

export default Cart
