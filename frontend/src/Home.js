import React from 'react'
import NavBar from './Components/NavBar.js'
import RegLog from './Components/RegLog.js'
import RankedProducts from './Components/RankedProducts.js'
import RandomProducts from './Components/RandomProducts.js'

const Home = () => {
    return (
        <div>
            <RegLog />
            <NavBar />
            <RankedProducts />
            <RandomProducts />
        </div>
    )
}

export default Home
