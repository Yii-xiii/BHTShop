import React from 'react'
import './NavBar.css'
import Logo from './Logo.png'
import Operate from './Operate'
import {Link} from 'react-router-dom'
import Search from './Search'

const NavBar = () => {
    return (
        <header>
            <nav className='navbar'>
                <Link className='home-logo' to='/'>
                    <img className='navbar-logo' src={Logo} alt='logo'/>
                </Link>

                <Search />

                <div>
                    <Operate className='operate-box'/>
                </div>
            </nav>
            <hr className='navbar-line'/>
        </header>
    )
}

export default NavBar
