import React from 'react'
import NavBar from './NavBar'
import RankedProducts from './RankedProducts'
import RandomProducts from './RandomProducts.js'
import RegLog from './RegLog'

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
