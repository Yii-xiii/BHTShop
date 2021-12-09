import React, { useContext, useState } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { useParams } from 'react-router'
import { useNavigation , Link } from 'react-router'
import api from './Components/Api'
import Search from './Components/Search'

const SearchPage = () => {
    const {search, category} = useParams()
    // const [page, setPage] = useState(1)
    console.log(search)
    console.log(category)

    return (
        <div>
            <Header />
                Searching for 

            <Footer />
        </div>
    )
}   

export default SearchPage
