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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const OrderStatusListPage = ({ status, time, description}) => {
    const { orderId } = useParams()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const [orderStatus, setOrderStatus] = useState([])

    const fetchOrderStatus = async () => {
        const data = await api.getLatestOrderStatus(orderId)
        console.log(data.data[0]);
        return data.data[0]
    }

    useEffect(() => {
        const getOrderStatus = async () => {
            const orderStatusFromServer = await fetchOrderStatus()
            setOrderStatus(orderStatusFromServer)
        }

        getOrderStatus()
    }, [])


    if (status === 'paid') {
        if (orderStatus.status === status) {
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
                                <DialogContentText>
                                    请填入退款原因：
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="refund"
                                    label="退款原因"
                                    type="reason"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>取消</Button>
                                <Button onClick={handleClose}>提交</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </div>
            );
        }
        else {
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
                                    已付款
                                </Typography>
                                <Typography>{description}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            );
        }
    }
    else if (status === 'refunding') {
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
                                <img className='RefundingIcon-logo' src={RefundingIcon} alt='refunding' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            <Typography variant="h6" component="span">
                                退款中
                            </Typography>
                            <Typography>{description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }
    else if (status === 'refunded') {
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
                                <img className='RefundedIcon-logo' src={DoneIcon} alt='refunded' width="25" />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: '10px' }}>
                            已退款
                            {description}
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        );
    }
    else if (status === 'shipped') {
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
    else if (status === 'delivered') {
        if (orderStatus.status === status) {
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
                            <Button size="small" variant="contained" onClick={handleClickOpen}>确认签收</Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
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
                                    <Button onClick={handleClose} autoFocus>确认</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <div className='deliveredbox2'>
                            <Button size="small" variant="contained" onClick={handleClickOpen1}>退货申请</Button>

                            <Dialog open={open1} onClose={handleClose1}>
                                <DialogTitle>退货申请</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        请填入退货原因：
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="refund"
                                        label="退货原因"
                                        type="reason"
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose1}>取消</Button>
                                    <Button onClick={handleClose1}>提交</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                    </div>

                </div>
            );
        }
        else {
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
    }
    else if (status === 'returning') {
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
    else if (status === 'returned') {
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
    else if (status === 'done') {
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
                    <Button size="small" variant="contained" onClick={handleClickOpen}>
                        评价
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>评价</DialogTitle>
                        <DialogContent>
                            <Rating sx={{ml: '130px'}}
                                name="rating"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />

                            <div className='form-image-group'>
                                <h5>图片</h5>

                                <div className='form-image-input'>
                                    <input
                                        name={images}
                                        onChange={event => setImages(event.target.files[0])}
                                        type="file"
                                        required />
                                </div>
                            </div>

                            <DialogContentText>
                                请输入评价：
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="rating"
                                label="评价内容"
                                type="email"
                                fullWidth
                                variant="standard"
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>取消</Button>
                            <Button onClick={handleClose}>提交</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }

    return (
        <h2>wrong status</h2>
    )
}

export default OrderStatusListPage
