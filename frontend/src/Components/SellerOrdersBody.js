import React from 'react'
import './SellerOrdersBody.css'
import { Link, useParams } from 'react-router-dom'
import api from './Api'

const SellerOrdersBody = () => {
    const { status } = useParams()

    if (status === 'processing') {
        

        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/processing'>
                            <h4>待出货</h4>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/delivering'>
                            <span>待派送</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/completed'>
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
                        {status}
                    </div>
                </div>
            </div>
        )
    } else if (status === 'delivering') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/processing'>
                            <span>待出货</span>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/delivering'>
                            <h4>待派送</h4>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/completed'>
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
                        {status}
                    </div>
                </div>
            </div>
        )
    } else if (status === 'completed') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/processing'>
                            <span>待出货</span>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/delivering'>
                            <span>待派送</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/completed'>
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
                        {status}
                    </div>
                </div>
            </div>
        )
    } else if (status === 'returning') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/processing'>
                            <span>待出货</span>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/delivering'>
                            <span>待派送</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/completed'>
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
                        {status}
                    </div>
                </div>
            </div>
        )
    } else if (status === 'returned') {
        return (
            <div>
                <div className='status-options-outer-box'>
                    <div className='status-options'>
                        <Link className='status-links' to='/sOrders/processing'>
                            <span>待出货</span>
                        </Link>
                        
                        <Link className='status-links' to='/sOrders/delivering'>
                            <span>待派送</span>
                        </Link>
        
                        <Link className='status-links' to='/sOrders/completed'>
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
                        {status}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='status-options-outer-box'>
                <div className='status-options'>
                    <Link className='status-links' to='/sOrders/processing'>
                        <h4>待出货</h4>
                    </Link>
                    
                    <Link className='status-links' to='/sOrders/delivering'>
                        <span>待派送</span>
                    </Link>
    
                    <Link className='status-links' to='/sOrders/completed'>
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
                    {status}
                </div>
            </div>
        </div>
    )
}

export default SellerOrdersBody
