import React from 'react'
import Header from './Components/Header'
import RankedProducts from './Components/RankedProducts.js'
import RandomProducts from './Components/RandomProducts.js'
import Footer from './Components/Footer'

const HomePage = () => {
    return (
        <div>
            
            <Header />
            <RankedProducts />
            <RandomProducts />
            <Footer />
        </div>
    )
}

export default HomePage
