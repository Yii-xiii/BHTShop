import React from 'react'
import RankedProducts from './Components/RankedProducts.js'
import RandomProducts from './Components/RandomProducts.js'

const HomePage = () => {
    return (
        <div>
            <RankedProducts />
            <RandomProducts />
        </div>
    )
}

export default HomePage
