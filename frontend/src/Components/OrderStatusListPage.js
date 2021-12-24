import './OrderStatusListPage.css'

import React from 'react'
import api from './Api'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import PaidIcon from './Paid.png';
import RefundingIcon from './Refunding.png';
import ShippedIcon from './Shipped.png';
import DeliveredIcon from './Delivery.png';
import ReturningIcon from './Returning.png';
import ReturnedIcon from './Returned.png';
import DoneIcon from './Done.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const OrderStatusListPage = ({ statusId, status, time, description }) => {
    const { orderId } = useParams()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [value1, setValue1] = React.useState(0);
    const [des1, setDes1] = useState('不想要了');
    const [des2, setDes2] = useState('确认收货');
    const [des3, setDes3] = useState('incorrect product');
    const [des4, setDes4] = useState([]);
    const [refundflag, setRefundflag] = useState(0);
    const [returningflag, setReturningflag] = useState(0);
    const [orders, setOrders] = useState([])
    const [orderStatus, setOrderStatus] = useState([])

    const confirmReceived = async (reason, description) => {
        console.log(orderId, reason, description)
        const data = await api.createReturnRequest(orderId, reason, description)
        console.log(data)
        window.location.reload(false)
    }

    const confirmReceived1 = async (reason, description) => {
        console.log(orderId, reason, description)
        const data = await api.customerUpdateReturnRequest(orderId, reason, description)
        console.log(data)
        window.location.reload(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleTypeChange3 = (event) => {
        setDes4(event.target.value)
        console.log(des4);
    }

    const handleTypeChange2 = (event) => {
        setDes3(event.target.value)
        console.log(des3);
    }

    const handleTypeChange1 = (event) => {
        setDes2(event.target.value)
        console.log(des2);
    }

    const handleTypeChange = (event, value) => {
        setDes1(value)
        console.log(des1);
    }

    //new refund requests
    const newRefundStatus = async (reason, description) => {
        console.log(orderId, reason, description)
        const data = await api.createReturnRequest(orderId, reason, description)
        console.log(data)
        window.location.reload(false)
    }

    const newComment = async (des, rating) => {
        if (rating === 0) {
            console.log("error");
            console.log(status);
        }
        else {
            console.log(orderId, des, rating);
            const data = await api.createProductComment(orderId, des, rating)
            console.log(data)
            window.location.reload(false)
        }
    }


    //check the order with or without refund/return requests
    const fetchOrders = async () => {
        const data = await api.getReturnRequest(orderId)
        console.log(data.data[0])
        return data.data
    }

    //get the latest order status to check send in status is the latest or not
    const fetchOrderStatus = async () => {
        const data = await api.getLatestOrderStatus(orderId)
        console.log(data.data[0]);
        return data.data[0]
    }

    useEffect(() => {
        const getOrders = async () => {
            const ordersFromServer = await fetchOrders()
            setOrders(ordersFromServer)
        }
        const getOrderStatus = async () => {
            const orderStatusFromServer = await fetchOrderStatus()
            setOrderStatus(orderStatusFromServer)
        }

        getOrders()
        getOrderStatus()
    }, [])

    function CompletedTimelinewithComment() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='DoneIcon-logo' src={DoneIcon} alt='done' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                已完成
                            </Typography>
                            <Typography>{description}</Typography>
                            <Typography>已完成评价</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function CompletedTimeline() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='DoneIcon-logo' src={DoneIcon} alt='done' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                已完成
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <div className='ratingbox'>
                    <Button size="small" variant="contained" onClick={handleClickOpen3}>
                        评价
                    </Button>
                    <Dialog open={open3} onClose={handleClose3}>
                        <DialogTitle>评价</DialogTitle>
                        <DialogContent>
                            <Rating sx={{ ml: '40px' }}
                                name="rating"
                                value={value1}
                                onChange={(event) => {
                                    setValue1(event.target.value);
                                }}
                            />

                            <DialogContentText>
                                请输入评价：
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="rating"
                                label="评价内容"
                                fullWidth
                                variant="standard"
                                value={des4}
                                onChange={(event) => {
                                    setDes4(event.target.value);
                                }}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose3}>取消</Button>
                            <Button onClick={() => newComment(des4, value1)}>提交</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }

    function ApplyReturningTimeline() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='ReturningIcon-logo' src={ReturningIcon} alt='returning' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                申请退货中
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function FailedReturnTimeline() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='ReturningIcon-logo' src={ReturningIcon} alt='returning' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                申请退货失败
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function ReturningTimeline() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='ReturningIcon-logo' src={ReturningIcon} alt='returning' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                退货中
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );

    }

    function ReturnedTimeline() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='ReturnedIcon-logo' src={ReturnedIcon} alt='returned' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                已退货
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );

    }

    function DeliveredwithoutButton() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px', mb: '10px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='DeliveredIcon-logo' src={DeliveredIcon} alt='delivered' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                已签收
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );

    }

    function DeliveredwithButtonReceivedOnly() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px', mb: '10px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='DeliveredIcon-logo' src={DeliveredIcon} alt='delivered' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                已签收
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <div>
                    <div className='deliveredbox1'>
                        <Button size="small" variant="contained" onClick={handleClickOpen2}>确认签收</Button>
                        <Dialog
                            open={open2}
                            onClose={handleClose2}
                            onChange={handleTypeChange3}
                            aria-labelledby="confirm-dialog-title"
                            aria-describedby="confirm-dialog-description"
                        >
                            <DialogTitle id="confirm-dialog-title">
                                {"确认签收?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="confirm-dialog-description">
                                    确认签收后不能再退货了。
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose2}>取消</Button>
                                <Button onClick={() => confirmReceived1("others", "received")}>确认</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }

    function DeliveredwithButton() {
        return(
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px', mb: '10px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='DeliveredIcon-logo' src={DeliveredIcon} alt='delivered' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                已签收
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <div>
                    <div className='deliveredbox1'>
                        <Button size="small" variant="contained" onClick={handleClickOpen}>确认签收</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            onChange={handleTypeChange1}
                            aria-labelledby="confirm-dialog-title"
                            aria-describedby="confirm-dialog-description"
                        >
                            <DialogTitle id="confirm-dialog-title">
                                {"确认签收?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="confirm-dialog-description">
                                    确认签收后不能再退货了。
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>取消</Button>
                                <Button onClick={() => confirmReceived("others", "received")}>确认</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div className='deliveredbox2'>
                        <Button size="small" variant="contained" onClick={handleClickOpen1}>
                            退货申请
                        </Button>
                        <Dialog open={open1} onClose={handleClose1}>
                            <DialogTitle>退货申请</DialogTitle>
                            <DialogContent>
                                <FormControl component="refundoption">
                                    <FormLabel component="refund-option">请选择退货原因：</FormLabel>
                                    <RadioGroup
                                        aria-label="reason"
                                        name="radio-buttons-group"
                                        value={des3}
                                        onChange={handleTypeChange2}
                                    >
                                        <FormControlLabel value="incorrect product" control={<Radio />} label="商家发错商品了" />
                                        <FormControlLabel value="incorrect spec" control={<Radio />} label="商家发错尺码/颜色/数量等" />
                                        <FormControlLabel value="product does not match description" control={<Radio />} label="商品与描述不符合" />
                                        <FormControlLabel value="product was damaged" control={<Radio />} label="商品已损坏" />
                                        <FormControlLabel value="product does not match customer's expectation" control={<Radio />} label="商品不符合预期" />
                                        <FormControlLabel value="others" control={<Radio />} label="其他" />
                                    </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose1}>取消</Button>
                                <Button onClick={() => newRefundStatus(des3, "returning")} >提交</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </div>

            </div>
        );

    }

    function ShippedTimeline() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='ShippedIcon-logo' src={ShippedIcon} alt='shipped' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                运输中
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );

    }

    function RefundingTimeline() {
        return (
            <div className='timeline-box'>
                <div className='timeline-box1'>
                    <Timeline>
                        <TimelineItem>
                            <TimelineContent
                                sx={{ mt: '15px', mr: '0px', ml: '0px', mb: '10px' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                            >{time}</TimelineContent>
                            <TimelineSeparator>
                                <TimelineDot>
                                    <img className='PaidIcon-logo' src={PaidIcon} alt='paid' width="25" />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ mt: '10px' }}>
                                <Typography variant="h6" component="span">
                                    已付款
                                </Typography>
                                <Typography>{description}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>

                <div className='timeline-box2'>
                    <Timeline>
                        <TimelineItem>
                            <TimelineContent
                                sx={{ mt: '15px', mr: '0px', ml: '0px', mb: '10px' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                            >{time}</TimelineContent>
                            <TimelineSeparator>
                                <TimelineDot>
                                    <img className='RefundingIcon-logo' src={RefundingIcon} alt='returning' width="25" />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ mt: '10px' }}>
                                <Typography variant="h6" component="span">
                                    退款中
                                </Typography>
                                <Typography>{orders.description}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            </div>
        )
    }

    function PaidwithoutButton() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px', mb: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='PaidIcon-logo' src={PaidIcon} alt='paid' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                已付款
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        )
    }

    function PaidwithButton() {
        return (
            <div className='timeline-box'>
                <Timeline>
                    <TimelineItem>
                        <TimelineContent
                            sx={{ mt: '15px', mr: '0px', ml: '0px', mb: '0px' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >{time}</TimelineContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <img className='PaidIcon-logo' src={PaidIcon} alt='paid' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                已付款
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>


                <div className='refundbox'>
                    <Button size="small" variant="contained" onClick={handleClickOpen}>
                        退款申请
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>退款申请</DialogTitle>
                        <DialogContent>
                            <FormControl component="refundoption">
                                <FormLabel component="refund-option">请选择退款原因：</FormLabel>
                                <RadioGroup
                                    aria-label="reason"
                                    name="radio-buttons-group"
                                    value={des1}
                                    onChange={handleTypeChange}
                                >
                                    <FormControlLabel value="不想要了" control={<Radio />} label="不想要了" />
                                    <FormControlLabel value="未按约定发货" control={<Radio />} label="未按约定发货" />
                                    <FormControlLabel value="拍错了" control={<Radio />} label="拍错了" />
                                    <FormControlLabel value="其他" control={<Radio />} label="其他" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>取消</Button>
                            <Button onClick={() => newRefundStatus("others", "refunding")}>提交</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }

    function CheckRefunding() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefunddes(order.description)
                    (order.description === 'refunding')?setRefundflag(1):setRefundflag(0)
                )) : console.log("wrong status") }
            </div>
        )
    }

    function CheckReturning() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //<h1>{order.description}</h1>
                    (order.description === 'received') ? setReturningflag(1) : setReturningflag(0)
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckReturnFailedorSuccess() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    (order.status === 'failed') ?
                        <div>
                            <FailedReturnTimeline />
                            <DeliveredwithButtonReceivedOnly />
                        </div>
                        :
                        <div>
                            <ApplyReturningTimeline />
                            <ReturningTimeline />
                        </div>
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckReturningStatus() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //<h1>{order.description}</h1>
                    (order.status === 'pending') ?
                        <div>
                            <DeliveredwithoutButton />
                            <ApplyReturningTimeline />
                        </div>
                        : <CheckReturnFailedorSuccess />
                )) : console.log("wrong status")}
            </div>
        )
    }

    if (status === 'paid') {
        // if orderStatus.status != status means not lastest status, do not need refund button
        if (orderStatus.status != status) {
            return (
                <PaidwithoutButton />
            )
        }
        // else means just reach paid (with refund button) or waiting refund
        else {
            return (
                <div>
                    <CheckRefunding />
                    {(refundflag === 1) ? <RefundingTimeline /> : <PaidwithButton />}
                </div>
            )
        }
    }
    else if (status === 'shipped') {
        return (
            <ShippedTimeline />
        );
    }
    else if (status === 'delivered') {
        if (orderStatus.status != status) {
            return (
                <DeliveredwithoutButton />
            )
        }
        else if (orders.length === 0) {
            return (
                <DeliveredwithButton />
            )
        }
        else {
            return (
                <div>
                    <CheckReturning />

                    {(returningflag === 1) ?
                        <div>
                            <DeliveredwithoutButton />
                            <CompletedTimeline />
                        </div>
                        : <CheckReturningStatus />}
                </div>
            )
        }
    }
    else if (status === 'returning') {
        return (
            <ReturningTimeline />
        )
    }
    else if (status === 'returned') {
        return (
            <ReturnedTimeline />
        )
    }
    else if (status === 'completed') {
        return (
            <div>
                <CompletedTimeline />
            </div>
        )
    }
    

    return (
        <div><span>wrong status</span></div>
    )
}

export default OrderStatusListPage
