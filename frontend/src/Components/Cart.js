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
        if (loggedInType === 'Customer') {
            const data = await api.getCustomerCartList()
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
                <div className='cart-link-button'>
                    <Badge badgeContent={cart.length} color='primary' max={99}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}>
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </div>
            </Link>
        )
    }
    
    return (
        <Link className='cart-link' to='/login'>
            <div className='cart-link-button'>
                <Badge badgeContent={0} color='primary' max={99}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </div>
        </Link>
    )
}

export default Cart
