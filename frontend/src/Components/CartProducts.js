import React from 'react'
import './CartProducts.css'
import {useState, useEffect} from 'react'
import api from './Api'
import CartProduct from './CartProduct'
import Cookies from 'js-cookie'
import { Pagination } from '@mui/material'

const CartProducts = () => {
    const [cart, setCart] = useState([])
    const [pageCart, setPageCart] = useState([])
    const [customer, setCustomer] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(1)

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    let total = 0.00

    const fetchCart = async() => {
        const data = await api.getCustomerCartList()
        return data.data
    }

    const fetchCartByPage = async() => {
        const data = await api.getLatestCustomerCartListByPage(page)
        return data
    }

    const fetchCustomer = async() => {
        const data = await api.getCustomer(Cookies.get('user_id'))

        return data.data[0]
    }

    useEffect(() => {
        const getCart = async() => {
            const specsFromServer = await fetchCart()
            setCart(specsFromServer)
        }

        const getCustomer = async() => {
            const customerFromServer = await fetchCustomer()
            setCustomer(customerFromServer)
        }

        const getCartByPage = async() => {
            const cartByPageFromServer = await fetchCartByPage()
            setPageCart(cartByPageFromServer.data)
            setPageCount(cartByPageFromServer.pageCount)
        }

        getCart()
        getCustomer()
        getCartByPage()
    }, [page, cart])

    cart.map((cartProduct) => (
        cartProduct.productSpec.stock > cartProduct.quantity ?
            (total += cartProduct.productSpec.price * cartProduct.quantity).toFixed(2)
            : (total += cartProduct.productSpec.price * cartProduct.productSpec.stock).toFixed(2)
    ))

    const settleOrder = async(cartProduct) => {
        // create order
        const orderId = await api.createOrder(cartProduct.productSpec.id, cartProduct.quantity, 
            (cartProduct.quantity * cartProduct.productSpec.price).toFixed(2),
            customer.address, customer.phoneNumber);
        
        // update order status to paid
        await api.createOrderStatus(orderId, 'Paid', '')
    }

    const placeOrder = async() => {
        cart.map((cartItem) => (
            settleOrder(cartItem)
        ))
    }

    const deleteItem = async(cartItemSpecId) => {
        await api.deleteCustomerCart(cartItemSpecId)
        window.location.reload(false)
    }

    const clearCart = async() => {
        cart.map((cartItem) => (
            deleteItem(cartItem.productSpec.id)
        ))
    }

    return (
        <div className='cart-box'>
            <h1>我的购物车</h1>

            <div className='cart-outer-box'>
                <div className='cart-list-show-box'>
                    <div className='cart-list-page-box'>
                        <Pagination count={pageCount} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                    </div>

                    <div className='cart-list-box'>
                        {cart.map((cartProduct, index) => (
                            <CartProduct key={index} cartProduct={cartProduct}/>
                        ))}
                    </div>
                </div>

                <div className='cart-price-show-box'>
                    <div className='cart-price-title-box'>
                        <h2>需付金额</h2>
                    </div>
                    
                    <div className='cart-price-box'>
                        <span>¥ {total.toFixed(2)}</span>
                    </div>
                    
                    <div className='cart-pay-box'>
                        <button onClick={() => {placeOrder(); clearCart()}}>
                            <h3>付款</h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProducts
