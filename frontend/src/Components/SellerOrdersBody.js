import './SellerOrdersBody.css'

import { Link, useParams } from 'react-router-dom'
import SellerOrdersList from './SellerOrdersList'

const SellerOrdersBody = ({ status }) => {
    if (status === 'paid') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/paid'>
                            <h4>待出货</h4>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/shipped'>
                            <span>待派送</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/delivered'>
                            <span>已完成</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returning'>
                            <span>待退款</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returned'>
                            <span>已退款</span>
                        </Link>
                    </div>
                    
                    <div className='status-orders'>
                        <SellerOrdersList status={status}/>
                    </div>
                </div>
            </div>
        )
    } else if (status === 'shipped') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/paid'>
                            <span>待出货</span>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/shipped'>
                            <h4>待派送</h4>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/delivered'>
                            <span>已完成</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returning'>
                            <span>待退款</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returned'>
                            <span>已退款</span>
                        </Link>
                    </div>
                    
                    <div className='status-orders'>
                        <SellerOrdersList status={status}/>
                    </div>
                </div>
            </div>
        )
    } else if (status === 'delivered') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/paid'>
                            <span>待出货</span>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/shipped'>
                            <span>待派送</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/delivered'>
                            <h4>已完成</h4>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returning'>
                            <span>待退款</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returned'>
                            <span>已退款</span>
                        </Link>
                    </div>
                    
                    <div className='status-orders'>
                        <SellerOrdersList status={status}/>
                    </div>
                </div>
            </div>
        )
    } else if (status === 'returning') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/paid'>
                            <span>待出货</span>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/shipped'>
                            <span>待派送</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/delivered'>
                            <span>已完成</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returning'>
                            <h4>待退款</h4>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returned'>
                            <span>已退款</span>
                        </Link>
                    </div>
                    
                    <div className='status-orders'>
                        <SellerOrdersList status={status}/>
                    </div>
                </div>
            </div>
        )
    } else if (status === 'returned') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/paid'>
                            <span>待出货</span>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/shipped'>
                            <span>待派送</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/delivered'>
                            <span>已完成</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returning'>
                            <span>待退款</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/returned'>
                            <h4>已退款</h4>
                        </Link>
                    </div>
                    
                    <div className='status-orders'>
                        <SellerOrdersList status={status}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            STATUS NOT FOUND
        </div>
    )
}

export default SellerOrdersBody
