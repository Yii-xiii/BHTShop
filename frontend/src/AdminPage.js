import React from 'react'
import AdminGraph from './Components/AdminGraph'
import AdminWorkspace from './Components/AdminWorkspace'
import Footer from './Components/Footer'
import Header from './Components/Header'

const AdminPage = () => {
    return (
        <div>
            <Header />
            <AdminGraph />
            <AdminWorkspace />
            <Footer />
        </div>
    )
}

export default AdminPage
