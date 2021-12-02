import './PersonalInfo.css'

import React from 'react'
import { Link } from 'react-router-dom'

const PersonalInfo = () => {
    return (
        <Link className='personal-link' to='/personalinfo'>
            <div className='text'>
                <h1>个人信息</h1>
            </div>
        </Link>
    )
}

export default PersonalInfo