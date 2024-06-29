import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Skeleton from '@mui/material/Skeleton';
import CheckloginContext from '/context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '/Styles/mystyle.module.css'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Toast } from 'primereact/toast';
import { useRouter, useParams } from 'next/router'

import {
    FormControl,
    TextField,

    styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
export default function ScrollDialog() {
    const [Btnloading, setBtnloading] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()

    const [open, setOpen] = useState(false);

    const [scroll, setScroll] = useState('paper');

    const [Branchcode, setBranchcode] = useState('');
    const [MobileNumber, setMobileNumber] = useState('');
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Message, setMessage] = useState('');
    const [Loadingbranch, setLoadingbranch] = useState(true);

    const [BranchList, setBranchList] = useState([]);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };


    const handleChangeBranch = (event) => {
        setBranchcode(event.target.value);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetForm = () => {
        setOpen(false);
        setBranchcode('')
        setMessage('')
        setMobileNumber('')
        setEmail('')
        setAddress('')
        
    };


    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);



    const GetBranchList = async () => {
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { dataid }
        const data = await fetch("/api/V3/Admin/Branches/AllBrancheslist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.Branchlist)

                if (parsed.ReqD.Branchlist) {
                    setBranchList(parsed.ReqD.Branchlist)
                    setLoadingbranch(false)

                }
            })
    }

    useEffect(() => {
        GetBranchList()
    }, [router.query])


    const handleSubmit = async (e) => {


        e.preventDefault();
        if (MobileNumber.length > 9 && FullName !== '' && Email !== '' && Message !== '' && Address !== '' && Branchcode !== '') {
            setBtnloading(true)

            const sendUM = {

                Branchcode: Branchcode,
                FullName: FullName,
                MobileNumber: MobileNumber,

                Email: Email,
                Message: Message,
                Address:Address


            }
            const data = await fetch("/api/V3/Admin/customer_enquiries/add_enquiry", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD)
                    if (parsed.ReqD.done) {
                        alert(parsed.ReqD.msg)
                        router.push('/admin/customer_enquiries')
                        resetForm()

                    } else {
                        alert('Something went wrong')
                    }

                    setTimeout(function () {

                        setBtnloading(false);
                    }, 2000);
                })

        } else {

            alert('all failed are required')
        }


    }






    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Create Enquiry
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Create New Enquiry</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div>

                        <form onSubmit={handleSubmit} >
                            <div className={MYS.inputlogin}>
                                {Loadingbranch &&
                                    <div>
                                        <Skeleton variant="rounded" width='100%' height={60} />
                                    </div>
                                }
                                {!Loadingbranch &&
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Branch</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Branchcode}
                                            label="Select Branch"

                                            onChange={handleChangeBranch}
                                        >

                                            <MenuItem value={''}>Select</MenuItem>
                                            {BranchList.map((item) => {
                                                return <MenuItem value={item.BranchCode}>{item.BranchCode} : {item.name}</MenuItem>


                                            }

                                            )}
                                        </Select>

                                    </FormControl>
                                }


                                <div className={MYS.inputlogin}>

                                    <TextField
                                        required
                                        label="Enter Mobile Number"
                                        fullWidth
                                        value={MobileNumber}

                                        onInput={e => setMobileNumber(e.target.value)}
                                        type="number"
                                    />
                                </div>
                                <div className={MYS.inputlogin}>

                                    <TextField
                                        required
                                        label="Full Name"
                                        fullWidth
                                        value={FullName}

                                        onInput={e => setFullName(e.target.value)}

                                    />
                                </div>
                                <div className={MYS.inputlogin}>

                                    <TextField
                                        required
                                        label="Email Address"
                                        fullWidth
                                        value={Email}

                                        onInput={e => setEmail(e.target.value)}

                                    />
                                </div>
                                <div className={MYS.inputlogin}>

                                    <TextField
                                        required
                                        label="Address"
                                        fullWidth
                                        value={Address}
                                        onInput={e => setAddress(e.target.value)}

                                    />
                                </div>
                                <div className={MYS.inputlogin}>

                                    <TextField
                                        required
                                        label="Message"
                                        fullWidth
                                        value={Message}
                                        onInput={e => setMessage(e.target.value)}

                                    />
                                </div>


                            </div>





                            <div style={{ minHeight: 25 }}></div>

                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        size="small"
                        onClick={handleSubmit}

                        loading={Btnloading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>Save Enquiry</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}