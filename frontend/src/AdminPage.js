import React from 'react'
import AdminGraph from './Components/AdminGraph'
import AdminWorkspace from './Components/AdminWorkspace'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './AdminPage.css'

const AdminPage = () => {
    return (
        <div>
            <Header />
            <div>
                <AdminGraph/>
            </div>
            <div className='admin-page-workspace-limit-box'>
                <AdminWorkspace />
            </div>
            
            <Footer />
        </div>
    )
}

export default AdminPage
