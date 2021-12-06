import ProductMainInfo from './Components/ProductMainInfo'
import ProductDescription from './Components/ProductDescription'
import './ProductPage.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import ProductComments from './Components/ProductComments'

const ProductPage = () => {
    return (
        <div>
            <Header />

            <div className='product-page-box'>
                <ProductMainInfo />
                <ProductDescription />
                <ProductComments />
            </div>

            <Footer />
        </div>
    )
}

export default ProductPage
