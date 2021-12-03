import ProductMainInfo from './Components/ProductMainInfo'
import ProductDescription from './Components/ProductDescription'
import ProductReviews from './Components/ProductReviews'
import './ProductPage.css'
import Header from './Components/Header'
import Footer from './Components/Footer'

const ProductPage = () => {
    return (
        <div>
            <Header />

            <div className='product-page-box'>
                <ProductMainInfo />
                <ProductDescription />
                <ProductReviews />
            </div>

            <Footer />
        </div>
    )
}

export default ProductPage
