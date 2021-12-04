import {useState, useEffect} from 'react'
import './CartProduct.css'
import api from './Api'
import Cookies from 'js-cookie'

const CartProduct = ({ cartProduct }) => {
    const [image, setImages] = useState([])

    console.log(cartProduct)

    // Fetch data from database
    const fetchImages = async() => {
        const data = await api.getFirstProductImage(cartProduct.productSpec.product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        getImages()
    }, [])

    const deleteItem = async(cartItemSpecId) => {
        const data = await api.deleteCustomerCart(cartItemSpecId)
        window.location.reload(false)
    }

    return (
        <div className='cart-product-outer-box'>
            <div className='cart-product-image-box'>
                <img src={ image? image.image_url : '0'} alt='img'/>
            </div>
            
            <div className='cart-product-descriptions-box'>
                <h3>商品: {cartProduct.productSpec.product.title}</h3>
                <h3>规格: {cartProduct.productSpec.description}</h3>
                <h3>价格: {cartProduct.productSpec.price}</h3>
                <h3>数量: {cartProduct.quantity}</h3>
                <h3>总付金额: ¥ {cartProduct.productSpec.price * cartProduct.quantity}</h3>
            </div>

            <button className='delete-item-button' onClick={() => deleteItem(cartProduct.productSpec.id)}>
                删除
            </button>
        </div>
    )
}

export default CartProduct
