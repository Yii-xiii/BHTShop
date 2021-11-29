import './Operate.css'
import Cart from './Cart'
import Favourite from './Favourite'

const Operate = () => {
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
