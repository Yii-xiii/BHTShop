import {useState, useEffect} from 'react'
import './FavProducts.css'
import api from './Api'
import FavProduct from './FavProduct'
import FavProductOptions from './FavProductOptions'

const FavProducts = () => {
    // Initializing
    const [favProducts, setFavProducts] = useState([])

    // Fetch data from database
    const fetchFavProducts = async() => {
        const data = await api.getCustomerCollectionList()

        console.log(data.data)
        // get back list of favProducts
        return data.data
    }

    useEffect(() => {
        const getFavProducts = async() => {
            const productsFromServer = await fetchFavProducts()
            setFavProducts(productsFromServer)
        }

        getFavProducts()
    }, [])

    return (
        <div className='fav-box'>
            <h1>我的收藏</h1>
            
            <div className='fav-show-box'>
                <FavProductOptions />

                <div className='fav-list-box'>
                    {favProducts.map((favProduct, index) => (
                    <FavProduct key={index} favProduct={favProduct.product}/>
                    ))} 
                </div>
                
            </div>
        </div>
    )
}

export default FavProducts
