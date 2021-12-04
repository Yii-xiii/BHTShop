import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { useParams } from 'react-router'

const SearchPage = () => {
    const { searchName } = useParams()

    return (
        <div>
            <Header />
                Searching for {searchName}
            <Footer />
        </div>
    )
}

export default SearchPage
