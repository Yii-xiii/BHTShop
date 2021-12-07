import './SellerOrdersBody.css'
import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import api from './Api'

const SellerOrdersBody = () => {
    const { status } = useParams()
    const [orders, setOrders] = useState([])

    const fetchOrders = async() => {
        const data = await api.getSellerOrderListByStatus(status)

        console.log(data)
    }

    useEffect(() => {
        const getOrders = async() => {
            const ordersFromServer = await fetchOrders(status)
            setOrders(ordersFromServer)
        }

        getOrders()
    }, [])

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
                        {status}
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
                        {status}
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
                    {status}
                </div>
            </div>
        </div>
    )
}

export default SellerOrdersBody
