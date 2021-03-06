import './OrderStatusListPage.css'

import React from 'react'
import api from './Api'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
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
import TextInput from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const OrderStatusListPage = ({ statusId, status, time, description }) => {
    const { orderId } = useParams()
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [des3, setDes3] = useState("incorrect product");
    const [orderStatus, setOrderStatus] = useState([])
    const [comment, setComment] = useState([])
    const [orders, setOrders] = useState([])
    const [refundflag, setRefundflag] = useState(0);
    const [refundpendingflag, setRefundpendingflag] = useState(0);
    const [refundfailedflag, setRefundfailedflag] = useState(0);
    const [receivedflag, setReceivedflag] = useState(0);
    const [commentflag, setCommentflag] = useState(0);
    const [returningflag, setReturningflag] = useState(0);
    const [returnedflag, setReturnedflag] = useState(0);
    const [returningfailedflag, setReturningfailedflag] = useState(0);
    const [returningpendingflag, setReturningpendingflag] = useState(0);
    var des4;
    var ratevalue;

    const fetchOrderStatus = async () => {
        const data = await api.getLatestOrderStatus(orderId)
        console.log(data.data[0]);
        return data.data[0]
    }

    const fetchOrders = async () => {
        const data = await api.getReturnRequest(orderId)
        console.log(data.data[0])
        return data.data
    }

    const fetchComment = async () => {
        const data = await api.getOrderComment(orderId)
        if (data === undefined) {
            setCommentflag('null')
        }
        else {
            console.log(data.data[0])
            return data.data
        }
        setCommentflag('null')
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

    const handleTypeChange2 = (event) => {
        setDes3(event.target.value)
        console.log(des3);
    }

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

    const deleteRefundFailed = async () => {
        console.log(orderId)
        const data = await api.customerDeleteReturnRequest(orderId)
        console.log(data)
        window.location.reload(false)
    }

    const deleteRequest = async () => {
        console.log(orderId)
        const data = await api.customerDeleteReturnRequest(orderId)
        console.log(data)
        window.location.reload(false)
    }

    const newRefundStatus = async (reason, description) => {
        console.log(orderId, reason, description)
        const data = await api.createReturnRequest(orderId, reason, description)
        console.log(data)
        window.location.reload(false)
    }

    const newComment = async (des, rating) => {
        if (rating === 0) {
            return (
                console.log("please enter rating")
            )
        }
        console.log(orderId, des, rating);
        const data = await api.createProductComment(orderId, des, rating)
        console.log(data)
        window.location.reload(false)
    }
    
    const changeRatevalue = (value) => {
        ratevalue = value
    }

    const changeDes4 = (value) => {
        des4 = value
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

        const getComment = async () => {
            const commentFromServer = await fetchComment()
            setComment(commentFromServer)
        }


        getOrders()
        getOrderStatus()
        getComment()
    }, [])

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
                                ?????????
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
                                ?????????
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function ReturningPendingTimeline() {
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
                                ???????????????
                            </Typography>
                            <Typography>Return Pending</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <div>
                    <div className='deliveredbox1'>
                        <Button size="small" variant="contained" onClick={handleClickOpen3}>????????????</Button>
                        <Dialog
                            open={open3}
                            onClose={handleClose3}
                            aria-labelledby="confirm-dialog-title"
                            aria-describedby="confirm-dialog-description"
                        >
                            <DialogTitle id="confirm-dialog-title">
                                {"??????????????????"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="confirm-dialog-description">
                                    ????????????????????????
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose2}>??????</Button>
                                <Button onClick={() => deleteRequest()}>??????</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }

    function CompletedTimelinewithoutButton() {
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
                                ?????????
                            </Typography>
                            <Typography>Completed.</Typography>
                            <Typography>???????????????</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function CompletedTimelinewithButton() {
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
                                ?????????
                            </Typography>
                            <Typography>Completed.</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <div className='ratingbox'>
                    <Button size="small" variant="contained" onClick={handleClickOpen3}>
                        ??????
                    </Button>
                    <Dialog open={open3} onClose={handleClose3}>
                        <DialogTitle>??????</DialogTitle>
                        <DialogContent>
                            <Rating sx={{ ml: '40px' }}
                                name="rating"
                                onChange={(event) => changeRatevalue(event.target.value)}
                            />
                        </DialogContent>

                        <DialogContent>
                            <DialogContentText>
                                ??????????????????
                            </DialogContentText>
                            <TextInput
                                type="text"
                                onChange={(event) => changeDes4(event.target.value)} 
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={() => handleClose3}>??????</Button>
                            <Button type="button" onClick={() => newComment(des4, ratevalue)}>??????</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }

    function DeliveredTimelinewithConfirmButton() {
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
                                ?????????
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <div>
                    <div className='deliveredbox1'>
                        <Button size="small" variant="contained" onClick={handleClickOpen2}>????????????</Button>
                        <Dialog
                            open={open2}
                            onClose={handleClose2}
                            aria-labelledby="confirm-dialog-title"
                            aria-describedby="confirm-dialog-description"
                        >
                            <DialogTitle id="confirm-dialog-title">
                                {"?????????????"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="confirm-dialog-description">
                                    ????????????????????????????????????
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose2}>??????</Button>
                                <Button onClick={() => confirmReceived1("others", "received")}>??????</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>

            </div>
        );
    }

    function DeliveredTimelinewithoutButton() {
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
                                ?????????
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );

    }

    function DeliveredTimelinewithButton() {
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
                                ?????????
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <div>
                    <div className='deliveredbox1'>
                        <Button size="small" variant="contained" onClick={handleClickOpen}>????????????</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="confirm-dialog-title"
                            aria-describedby="confirm-dialog-description"
                        >
                            <DialogTitle id="confirm-dialog-title">
                                {"?????????????"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="confirm-dialog-description">
                                    ????????????????????????????????????
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>??????</Button>
                                <Button onClick={() => confirmReceived("others", "received")}>??????</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div className='deliveredbox2'>
                        <Button size="small" variant="contained" onClick={handleClickOpen1}>
                            ????????????
                        </Button>
                        <Dialog open={open1} onClose={handleClose1}>
                            <DialogTitle>????????????</DialogTitle>
                            <DialogContent>
                                <FormControl component="refundoption">
                                    <FormLabel component="refund-option">????????????????????????</FormLabel>
                                    <RadioGroup
                                        aria-label="reason"
                                        name="radio-buttons-group"
                                        //defaultValue="incorrect product"
                                        value={des3}
                                        onChange={handleTypeChange2}
                                    >
                                        <FormControlLabel value="incorrect product" control={<Radio />} label="?????????????????????" />
                                        <FormControlLabel value="incorrect spec" control={<Radio />} label="??????????????????/??????/?????????" />
                                        <FormControlLabel value="product does not match description" control={<Radio />} label="????????????????????????" />
                                        <FormControlLabel value="product was damaged" control={<Radio />} label="???????????????" />
                                        <FormControlLabel value="product does not match customer's expectation" control={<Radio />} label="?????????????????????" />
                                        <FormControlLabel value="others" control={<Radio />} label="??????" />
                                    </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose1}>??????</Button>
                                <Button onClick={() => newRefundStatus(des3, "returning")} >??????</Button>
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
                                ?????????
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function RefundSuccessTimeline() {
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
                                <img className='refundIcon-logo' src={RefundingIcon} alt='refund' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                ????????????
                            </Typography>
                            <Typography>Refunded.</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function RefundFailedTimeline() {
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
                                <img className='PaidIcon-logo' src={PaidIcon} alt='paid' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                ????????????
                            </Typography>
                            <div className='deliveredbox3'>
                                <Button size="small" variant="contained" onClick={handleClickOpen}>????????????</Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="confirm-dialog-title"
                                    aria-describedby="confirm-dialog-description"
                                >
                                    <DialogTitle id="confirm-dialog-title">
                                        {"??????????????????"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="confirm-dialog-description">
                                            ????????????????????????????????????????????????
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => deleteRefundFailed()}>??????</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function RefundPendingTimeline() {
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
                                <img className='refundingIcon-logo' src={RefundingIcon} alt='refunding' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                ???????????????
                            </Typography>
                            <Typography>Refunding.</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function PaidTimelinewithoutButton() {
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
                                <img className='PaidIcon-logo' src={PaidIcon} alt='paid' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                ?????????
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }

    function PaidTimelinewithButton() {
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
                                <img className='PaidIcon-logo' src={PaidIcon} alt='paid' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                ?????????
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <div className='refundbox'>
                    <Button size="small" variant="contained" onClick={handleClickOpen}>
                        ??????
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>????????????</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                ????????????????????????
                            </DialogContentText>
                            <FormControl component="fieldset">
                                <FormLabel component="reasons">??????</FormLabel>
                                <RadioGroup
                                    aria-label="refund-reason"
                                    defaultValue="????????????"
                                    //value={des1}
                                    name="radio-buttons-group"
                                //onChange={handleTypeChange}
                                >
                                    <FormControlLabel value="????????????" control={<Radio />} label="????????????" />
                                    <FormControlLabel value="????????????????????????" control={<Radio />} label="????????????????????????" />
                                    <FormControlLabel value="?????????" control={<Radio />} label="?????????" />
                                    <FormControlLabel value="??????" control={<Radio />} label="??????" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>??????</Button>
                            <Button onClick={() => newRefundStatus("others", "refunding")}>??????</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }

    function GetReturned() {
        return (
            <div>
                <CheckReturned />
                {(returnedflag === 0) ? <DeliveredTimelinewithButton /> : console.log("returned success status has changed to returned")}
            </div>
        )
    }

    function GetReturningpendingstatus() {
        return (
            <div>
                <CheckReturningpendingstatus />
                {(returningpendingflag === 1) ?
                    <div>
                        <DeliveredTimelinewithoutButton />
                        <ReturningPendingTimeline />
                    </div>
                    : console.log("returning success as the order status has changed to returning")}
            </div>
        )
    }

    function GetReturningfailedstatus() {
        return (
            <div>
                <CheckReturningfailedstatus />
                {(returningfailedflag === 1) ? <DeliveredTimelinewithConfirmButton /> : <GetReturningpendingstatus />}
            </div>
        )
    }

    function GetReturning() {
        return (
            <div>
                <CheckReturning />
                {(returningflag === 1) ? <GetReturningfailedstatus /> : <GetReturned />}
            </div>
        )
    }

    function CheckComment() {
        return (
            <div className='order-statuslist-box'>
                {commentflag === 'null' ? <CompletedTimelinewithButton /> : <CompletedTimelinewithoutButton />}
            </div>
        )
    }

    function CheckComment1() {
        return (
            <div className='order-statuslist-box'>
                {commentflag === 'null' ?
                    <div>
                        <DeliveredTimelinewithoutButton />
                        <CompletedTimelinewithButton />
                    </div> :
                    <div>
                        <DeliveredTimelinewithoutButton />
                        <CompletedTimelinewithoutButton />
                    </div>}
            </div>
        )
    }

    function CheckReturned() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefunddes(order.description)
                    (order.description === 'returned') ? setReturnedflag(1) : setReturnedflag(0)
                    //console.log(order.description)
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckReturningpendingstatus() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefunddes(order.description)
                    (order.status === 'pending') ? setReturningpendingflag(1) : setReturningpendingflag(0)
                    //console.log(order.description)
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckReturningfailedstatus() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefunddes(order.description)
                    (order.status === 'failed') ? setReturningfailedflag(1) : setReturningfailedflag(0)
                    //console.log(order.description)
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckReturning() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefunddes(order.description)
                    (order.description === 'returning') ? setReturningflag(1) : setReturningflag(0)
                    //console.log(order.description)
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckReceived() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefunddes(order.description)
                    (order.description === 'received') ? setReceivedflag(1) : setReceivedflag(0)
                    //console.log(order.description)
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckRefundFailedstatus() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefundTime(order.time)
                    (order.status === 'failed') ? setRefundfailedflag(1) : setRefundfailedflag(0)
                    //console.log(order.time)
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckRefundPendingstatus() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefundTime(order.time)
                    (order.status === 'pending') ? setRefundpendingflag(1) : setRefundpendingflag(0)
                    //console.log(order.time)
                )) : console.log("wrong status")}
            </div>
        )
    }

    function CheckRefundFailed() {
        return (
            <div>
                <CheckRefundFailedstatus />
                <RefundPendingTimeline />
                {(refundfailedflag === 1) ? <RefundFailedTimeline /> : <RefundSuccessTimeline />}
            </div>
        )
    }

    function CheckRefundPending() {
        return (
            <div>
                <CheckRefundPendingstatus />
                <PaidTimelinewithoutButton />
                {(refundpendingflag === 1) ? <RefundPendingTimeline /> : <CheckRefundFailed />}
            </div>
        )
    }

    function CheckRefunding() {
        return (
            <div className='order-statuslist-box'>
                {orders.length > 0 ? orders.map((order, index) => (
                    //setRefunddes(order.description)
                    (order.description === 'refunding') ? setRefundflag(1) : setRefundflag(0)
                    //console.log(order.description)
                )) : console.log("wrong status")}
            </div>
        )
    }

    if (status === 'paid') {
        if (orderStatus.status != status) {
            return (
                <PaidTimelinewithoutButton />
            )
        }
        else {
            return (
                <div>
                    <CheckRefunding />
                    {(refundflag === 1) ? <CheckRefundPending /> : < PaidTimelinewithButton />}
                </div>
            )
        }
    }
    else if (status === 'shipped') {
        return (
            <ShippedTimeline />
        )
    }
    else if (status === 'delivered') {
        if (orderStatus.status != status) {
            return (
                <DeliveredTimelinewithoutButton />
            )
        }
        else {
            return (
                <div>
                    <CheckReceived />
                    {(receivedflag === 1) ? <CheckComment1 /> : <GetReturning />}
                </div>
            )
        }
    }
    else if (status === 'returning') {
        return (
            <div>
                <ReturningTimeline />
            </div>
        )
    }
    else if (status === 'returned') {
        return (
            <div>
                <ReturnedTimeline />
            </div>
        )
    }
    else if (status === 'completed') {
        return (
            <div>
                <CheckComment />
            </div>
        )
    }

    return (
        <div>
            <span>wrong status</span>
        </div>
    )

}

export default OrderStatusListPage
