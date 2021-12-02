import './Operate.css'
import Cart from './Cart.js'
import Favourite from './Favourite.js'
import AddItem from './AddItem.js'
import SellerOrders from './SellerOrders.js'
import Cookies from 'js-cookie'

const Operate = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            <nav className='operatebar'>
                <div className='operatebar-fav'>
                    <Favourite />
                </div>
                
                <div className='operatebar-cart'>
                    <Cart />
                </div>
            </nav>
        )
    } else if (loggedInType === 'Seller') {
        return (
            <nav className='operatebar'>
                <div className='operatebar-addItem'>
                    <AddItem />
                </div>
                
                <div className='operatebar-orders'>
                    <SellerOrders />
                </div>
            </nav>
        )
    }

    return (
        <nav className='operatebar'>
            <div className='operatebar-fav'>
                <Favourite />
            </div>
            
            <div className='operatebar-cart'>
                <Cart />
            </div>
        </nav>
    )
}

export default Operate
