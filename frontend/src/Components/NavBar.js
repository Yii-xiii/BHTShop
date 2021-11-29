import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './NavBar.css'
import Logo from './Logo.png'
import Operate from './Operate'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <header>
            <nav className='navbar'>
                <Link className='home-logo' to='/'>
                    <img className='navbar-logo' src={Logo} alt='logo'/>
                </Link>

                <div className='navbar-search'>
                    <form className='navbar-search'>
                        <input type='text' className='navbar-search-input' placeholder='搜索'/>
                        <button type='submit' className='navbar-search-button'><SearchIcon className='navbar-search-icon' /></button>
                    </form>
                </div>

                <div>
                    <Operate className='operate-box'/>
                </div>
            </nav>
            <hr className='navbar-line'/>
        </header>
    )
}

export default NavBar
