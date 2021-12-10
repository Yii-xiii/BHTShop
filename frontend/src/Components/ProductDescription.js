import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import './ProductDescription.css'
import api from './Api'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

const ProductDescription = () => {    
    const { productId } = useParams()
    const [product, setProduct] = useState([])
    const [sellerName, setSellerName] = useState([])
    const [sellerId, setSellerId] = useState([])

    // Fetch data from database
    // Fetch Product from database
    const fetchProduct = async() => {
        const data = await api.getProduct(productId)
        // const data = await response.json()
        return data.data[0]
    }

    // Importing data
    useEffect(() => {
        const getProduct = async() => {
            const productFromServer = await fetchProduct()
            setProduct(productFromServer)
            setSellerName(productFromServer.seller.username)
            setSellerId(productFromServer.seller.id)
        }

        getProduct()
    }, [])

    const sellerPath = `/seller/${sellerId}`

    return (
        <div className='description-outer-box'>
            <div className='description-seller-profile-link'>
                <Link className='seller-page-link' to={sellerPath}>
                    <StoreOutlinedIcon fontSize='large'/>
                    <h3>{sellerName}</h3>
                </Link>
            </div>

            <div className='description-spec-title'>
                <h5>商品规格</h5>
            </div>

            <div className='description-seller-box'>
                <h5>库存</h5>
                {/* stock count here */}
                <span>{product.stock}</span>
            </div>

            <div className='description-details-title'>
                <h5>商品描述</h5>
            </div>

            <div className='description-details-text-box'>
                <span>{product.description}</span> 
            </div>
        </div>
    )
}

export default ProductDescription
