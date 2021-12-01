import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './Search.css'

const Search = () => {
    return (
        <div className='navbar-search'>
            <form action='/' method='get' className='navbar-search'>
                <input 
                    type='text' 
                    className='navbar-search-input' 
                    placeholder='搜索'
                    id='header-search'
                    name='s'/>
                <button type='submit' className='navbar-search-button'><SearchIcon className='navbar-search-icon' /></button>
            </form>
        </div>
    )
}

export default Search
