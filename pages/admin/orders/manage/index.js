import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css';

import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router';
import CheckloginContext from '/context/auth/CheckloginContext';
import Skeleton from '@mui/material/Skeleton';

import TitleNav from '/src/components/Parts/TitleNav';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import LoadingButton from '@mui/lab/LoadingButton';
import Select from '@mui/material/Select';

import {
    IconButton,
    styled,
    TextField,
} from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function DashboardCrypto() {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const { Orderid } = router.query;

    const [IsLoading, setIsLoading] = useState(true);
    const [Mprice, setMprice] = useState('');
    const [TotalDiscount, setTotalDiscount] = useState('');
    const [Total, setTotal] = useState('');
    const [Validity, setValidity] = useState('');
    const [Transitionsid, setTransitionsid] = useState('');
    const [PaymentRefid, setPaymentRefid] = useState('');
    const [OrderStatusText, setOrderStatusText] = useState('');
    const [PayStatusText, setPayStatusText] = useState('');
    const [Btnloading, setBtnloading] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);
    const [OrderStatus, setOrderStatus] = useState(false);
    const [PayStatus, setPayStatus] = useState(false);
    const [OrderDataMain, setOrderDataMain] = useState({});
    const [UserData, setUserData] = useState({});

    const UpdateOrder = async (e) => {
        e.preventDefault();
        setBtnloading(true);

        const sendUM = {
            amt: Total,
            TotalDiscount: TotalDiscount,
            Paymentid: Transitionsid,
            refid: PaymentRefid,
            OrderStatus: OrderStatus,
            PayStatus: PayStatus,
            OrderStatusText: OrderStatusText,
            PayStatusText: PayStatusText,
            validity: Validity,
            id: OrderDataMain._id,
        };

        const data = await fetch("/api/V3/Admin/Orders/UpdateSalesOrder", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => a.json());

        setBtnloading(false);

        if (data.ReqData.done) {
            alert('Order Updated Successfully');
            router.push(`/admin/orders/manage/${Orderid}`);
        } else {
            alert(data.ReqData.message);
        }
    };

    const handleChangeOrderStatus = (event) => {
        const value = event.target.value === 'true';
        setOrderStatus(value);
        setOrderStatusText(value ? 'Order Completed' : 'Order Not Completed');
    };

    const handleChangePayStatus = (event) => {
        const value = event.target.value === 'true';
        setPayStatus(value);
        setPayStatusText(value ? 'Amount Paid' : 'Amount Not Paid');
    };

    const ChangeDiscount = (event) => {
        const discount = event.target.value;
        setTotal(Mprice - discount);
        setTotalDiscount(discount);
    };

    useEffect(() => {
        if (Orderid) {
            GetOrderData();
        }
    }, [Orderid]);

    const GetOrderData = async () => {
        const sendUM = { id: Orderid, JwtToken: Contextdata.JwtToken };

        const data = await fetch("/api/V3/Data/GetOrderData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => a.json());

        if (data.ReqData.done && data.ReqData.OrderData) {
            const order = data.ReqData.OrderData;
            setOrderDataMain(order);
            setMprice(order.mprice);
            setTotalDiscount(order.TotalDiscount);
            setTotal(order.amt);
            setValidity(order.validity);
            setPaymentRefid(order.refid);
            setTransitionsid(order.Paymentid);
            setPayStatus(order.PayStatus);
            setOrderStatus(order.OrderStatus);
            setOrderStatusText(order.OrderStatusText);
            setPayStatusText(order.PayStatusText);
            setIsLoading(false);
            setUserData(data.ReqData.UserData)
        } else {
            alert('Something went wrong');
        }
    };

    return (
        <>
            <TitleNav Title={OrderDataMain && OrderDataMain.Orderid} />

            <div className={MYS.MboxMain}>
                <div className={MYS.OrderBox}>
                    <div className={MYS.OrderBoxGrid}>
                        <div className={MYS.OrderBoxGridItem}>
                            <div className={MYS.OrderBoxGridItemTitle}>
                                <span>Order Details</span>
                            </div>
                            <div className={MYS.OrderBoxData}>
                                {IsLoading ? (
                                    <Skeleton variant="rectangular" width="100%" height={400} />
                                ) : (
                                    <>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Order ID</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.Orderid}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Order Title</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.Mprice}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Order Type</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.ProductType}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Order by</span>
                                            </div>
                                            <div className={MYS.itemOrderM}>
                                               
                                                <small>Name  : {UserData && UserData.name}</small>
                                                <small>Mobile : {UserData && UserData.mobile}</small>
                                                <small>Email : {UserData && UserData.email}</small>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Order Date / Time</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.date}</span>, <span>{OrderDataMain.time}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Price</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>₹{OrderDataMain.mprice}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>TotalDiscount</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>₹{OrderDataMain.TotalDiscount}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Total</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>₹{OrderDataMain.amt}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Order Status</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.OrderStatusText}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Payment Status</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.PayStatusText}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Payment Ref id</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.refid}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Transitions id</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.Paymentid}</span>
                                            </div>
                                        </div>
                                        <div className={MYS.OrdedetailsItem}>
                                            <div className={MYS.OrdedetailsItemA}>
                                                <span>Subscription Validity</span>
                                            </div>
                                            <div className={MYS.OrdedetailsItemB}>
                                                <span>{OrderDataMain.validity}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={MYS.OrderBoxGridItem}>
                            <div className={MYS.OrderBoxGridItemTitle}>
                                <span>Edit Order and Subscription</span>
                            </div>
                            <div className={MYS.EdiOrderBox}>
                                <form onSubmit={UpdateOrder}>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Price"
                                            fullWidth
                                            type='Number'
                                            value={Mprice}
                                            onChange={e => setMprice(e.target.value)}
                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="TotalDiscount"
                                            fullWidth
                                            type='Number'
                                            value={TotalDiscount}
                                            onChange={ChangeDiscount}
                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Total"
                                            fullWidth
                                            type='Number'
                                            value={Total}
                                            onChange={e => setTotal(e.target.value)}
                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Subscription Validity End Date"
                                            fullWidth
                                            value={Validity}
                                            onChange={e => setValidity(e.target.value)}
                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Transitions id"
                                            fullWidth
                                            value={Transitionsid}
                                            onChange={e => setTransitionsid(e.target.value)}
                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Payment Ref. id"
                                            fullWidth
                                            value={PaymentRefid}
                                            onChange={e => setPaymentRefid(e.target.value)}
                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <FormControl fullWidth>
                                            <InputLabel id="order-status-label">Order Status</InputLabel>
                                            <Select
                                                labelId="order-status-label"
                                                id="order-status-select"
                                                value={OrderStatus}
                                                label="Status"
                                                onChange={handleChangeOrderStatus}
                                            >
                                                <MenuItem value={true}>Completed</MenuItem>
                                                <MenuItem value={false}>Not Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Order Status Remark"
                                            fullWidth
                                            value={OrderStatusText}
                                            onChange={e => setOrderStatusText(e.target.value)}
                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <FormControl fullWidth>
                                            <InputLabel id="payment-status-label">Payment Status</InputLabel>
                                            <Select
                                                labelId="payment-status-label"
                                                id="payment-status-select"
                                                value={PayStatus}
                                                label="Status"
                                                onChange={handleChangePayStatus}
                                            >
                                                <MenuItem value={true}>Paid</MenuItem>
                                                <MenuItem value={false}>Not Paid</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Payment Status Remark"
                                            fullWidth
                                            value={PayStatusText}
                                            onChange={e => setPayStatusText(e.target.value)}
                                        />
                                    </div>
                                    <div style={{ minHeight: 25 }}></div>
                                    <LoadingButton
                                        size="small"
                                        type="submit"
                                        loading={Btnloading}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        <span>Update Order</span>
                                    </LoadingButton>
                                    <div style={{ minHeight: 25 }}></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
