import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import cartLogo from './Cart.png'
import Notification from './Notification'
import './Cart.css'
import api from './Api'
import Cookies from 'js-cookie'

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
                <img className='cart-logo' src={cartLogo} alt='logo'/>
                {/* getting cart count and pass in */}
                <Notification count={cart.length} type='cart'/>
            </Link>
        )
    }
    
    return (
        <Link className='cart-link' to='/login'>
            <img className='cart-logo' src={cartLogo} alt='logo'/>
            {/* getting cart count and pass in */}
            <Notification count='0' type='cart'/>
        </Link>
    )
}

export default Cart
