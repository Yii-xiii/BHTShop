import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import api from './Api'

import './Search.css'

const Search = () => {
    var page = 1
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const [category, setCategory] = useState('none')

    const submitSearch = async (e) => {
        e.preventDefault()
        if (category == 'none' && keyword.length == 0) {
            return
        }

        if (category != 'none') {
            Cookies.set("category", category)
        } else {
            Cookies.remove("category")
        }
        if (keyword.length != 0) {
            Cookies.set("keyword", keyword)
        } else {
            Cookies.remove("keyword")
        }
        
        window.location.reload()
        navigate(`/search`)
    }

    return (
        <div className='navbar-search'>
            <form className='navbar-search' onSubmit={submitSearch}>
                
                <select className="navbar-category-input"  name="category" value={category} onChange={event => setCategory(event.target.value)}>
                    <option value='none' default>类型</option>

                    <option value='women clothes'>女装</option>
                    <option value='men clothes'>男装</option>
                    <option value='sports'>运动</option>
                    <option value='cosmetics'>美妆</option>
                    <option value='drinks'>饮料</option>
                    <option value='snacks'>零食</option>
                    <option value='others'>其他</option>
                </select>

                <input 
                    type='text' 
                    className='navbar-search-input' 
                    placeholder='搜索'
                    id='header-search'
                    value={keyword}
                    onChange={event => setKeyword(event.target.value)}
                    />
                
                <button type='submit' className='navbar-search-button' onSubmit={submitSearch}><SearchIcon className='navbar-search-icon' /></button>
            </form>
        </div>
    )
}

export default Search
