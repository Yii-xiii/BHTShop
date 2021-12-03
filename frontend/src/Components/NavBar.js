import React from 'react'
import './NavBar.css'
import Logo from './Logo.png'
import Operate from './Operate'
import {Link} from 'react-router-dom'
import Search from './Search'
import Cookies from 'js-cookie'

const NavBar = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
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
    } else if (loggedInType === 'Seller') {

        return (
            <header>
                <nav className='navbar'>
                    <Link className='home-logo' to='/seller'>
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
