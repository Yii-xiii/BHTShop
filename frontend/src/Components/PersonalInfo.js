import './PersonalInfo.css'
import React from 'react'
import PersonalOptions from './PersonalOptions'
import PersonalDetails from './PersonalDetails'

const PersonalInfo = () => {
    return (
        <div className='personal-info-box'>
            <div className="info-title">
                <h1>个人信息</h1>
            </div>

            <div className='display-box'>
                <PersonalOptions />
                <PersonalDetails />
            </div>
        </div>
    )
}

export default PersonalInfo
