import React from 'react'
import AdminGraph from './Components/AdminGraph'
import AdminLinks from './Components/AdminLinks'
import Footer from './Components/Footer'
import Header from './Components/Header'

const AdminPage = () => {
    return (
        <div>
            <Header />
            <AdminGraph />
            <AdminLinks />
            <Footer />
        </div>
    )
}

export default AdminPage
