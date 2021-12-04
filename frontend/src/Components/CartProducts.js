import React from 'react'
import './CartProducts.css'
import {useState, useEffect} from 'react'
import api from './Api'
import CartProduct from './CartProduct'
import { CardHeader } from '@material-ui/core'

const CartProducts = () => {
    const [cart, setCart] = useState([])
    let total = 0.00

    const fetchCart = async() => {
        const data = await api.getCustomerCartList()
        return data.data
    }

    useEffect(() => {
        const getCart = async() => {
            const specsFromServer = await fetchCart()
            setCart(specsFromServer)
        }

        getCart()
    }, [])

    {cart.map((cartProduct) => (
        total += cartProduct.productSpec.price * cartProduct.quantity
    ))}

    return (
        <div className='cart-box'>
            <h1>我的购物车</h1>

            <div className='cart-outer-box'>
                <div className='cart-list-show-box'>
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
                        <button>
                            付款
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProducts
