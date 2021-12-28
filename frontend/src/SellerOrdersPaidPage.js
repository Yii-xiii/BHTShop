import Cookies from 'js-cookie'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import api from './Components/Api'
import { useState, useEffect } from 'react'
import SellerOrdersPaidList from './Components/SellerOrdersPaidList'

const SellerOrdersPaidPage = () => {
    const [value, setValue] = React.useState(0);
    const [orders, setOrders] = useState([])
    const [returnList, setReturnList] = useState([])
    const [receivedId, setReceivedId] = useState(0);
    const sellerId = Cookies.get('user_id')

    const fetchOrders = async () => {
        const data = await api.getSellerOrderListByStatusAndPage('paid', 1)
        return data.data
    }

    useEffect(() => {
        const getOrders = async () => {
            const ordersFromServer = await fetchOrders()
            setOrders(ordersFromServer)
        }

        getOrders()
    }, [])

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Header />
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="已付款" disabled {...a11yProps(0)} />
                    <Tab label="待退款" to='/sOrders/refunding' component={ Link } {...a11yProps(1)} />
                    <Tab label="已退款" to='/sOrders/refunded' component={Link} {...a11yProps(2)} />
                    <Tab label="已发货" to='/sOrders/shipped' component={Link} {...a11yProps(3)} />
                    <Tab label="已签收" to='/sOrders/delivered' component={Link} {...a11yProps(4)} />
                    <Tab label="待退货" to='/sOrders/returning' component={Link} {...a11yProps(5)} />
                    <Tab label="已退货" to='/sOrders/returned' component={Link} {...a11yProps(6)} />
                    <Tab label="已完成" to='/sOrders/completed' component={Link} {...a11yProps(7)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {orders.length > 0 ? orders.map((order, index) => (
                        <SellerOrdersPaidList order={ order }/>
                    )) : console.log("wrong status")}
                </TabPanel>
            </Box>
            <Footer />
        </div>
    );
}

export default SellerOrdersPaidPage
