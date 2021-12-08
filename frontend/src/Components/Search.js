import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { useNavigate, useNavigationType } from 'react-router'

import './Search.css'

const Search = () => {
    const navigate = useNavigate()
    const [searchName, setSearchName] = useState('')

    function navigateToPage() {
        if (searchName.length > 0) {
            navigate(`/s/${searchName}`)
        } else {
            navigate('/')
        }
    }

    return (
        <div className='navbar-search'>
            <form className='navbar-search'>
                <input 
                    type='text' 
                    className='navbar-search-input' 
                    placeholder='搜索'
                    id='header-search'
                    value={searchName}
                    onChange={event => setSearchName(event.target.value)}
                    />
                
                <button type='submit' className='navbar-search-button' onClick={() => navigateToPage()}><SearchIcon className='navbar-search-icon' /></button>
            </form>
        </div>
    )
}

export default Search
