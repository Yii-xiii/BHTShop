import React from 'react'
import NavBar from './NavBar'
import RandomProducts from './RandomProducts'
import RegLog from './RegLog'

const Home = () => {
    return (
        <div>
            <RegLog />
            <NavBar />
            <RandomProducts />
        </div>
    )
}

export default Home
