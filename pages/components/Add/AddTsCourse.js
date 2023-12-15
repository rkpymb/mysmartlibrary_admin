import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'

import { useRouter, useParams } from 'next/router'
import Image from 'next/image';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FileUpload from '../Upload/FileUpload'
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Select from '@mui/material/Select';

import {
    Box,

    Container,
    Grid,
    CardHeader,
    CardContent,
    Card,
    Typography,
    TextField,
    Divider,

    FormControl,
    OutlinedInput,
    InputAdornment,
    styled
} from '@mui/material';
export default function ScrollDialog({CourseSlug}) {
    const Contextdata = useContext(CheckloginContext)
    const [Btnloading, setBtnloading] = useState(false);
    const router = useRouter()
    const toast = useRef(null);
    const [open, setOpen] = useState(false);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [Title, setTitle] = useState('');
    const [Details, setDetails] = useState('');
    const [Stock, setStock] = useState(1);
    const [IsActive, setIsActive] = useState(false);
    const [Date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [Category, setCategory] = useState('');
    const [Sprice, setSprice] = useState('');
    const [Mprice, setMprice] = useState('');
    const [Duration, setDuration] = useState('');
    const [Tagline, setTagline] = useState('');
    const [Taglinetwo, setTaglinetwo] = useState('');
    const [TSStatus, setTSStatus] = useState(false);
    const [CatListdata, setCatListdata] = useState([]);
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let FinalFileName = document.querySelector('#FinalFileName').value
        if (Title !== '' && FinalFileName !== '' && Tagline !== '' && Taglinetwo !== '') {
            AddTs(FinalFileName)
            setBtnloading(true)

        } else {
            alert('all fields are required');
        }


    };
    const handleChangeFree = (event) => {
        setTSStatus(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };


    const AddTs = async (e) => {
        const Pid = Title.replace(/\s/g, '-');
        const sendUM = { pid: Pid, title: Title, details: Details, img: e, isActive: TSStatus, tagline: Tagline, taglinetwo: Taglinetwo,courseid:CourseSlug, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Add/AddTSCourse", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed)
                if (parsed.senddta) {
                    setOpen(false)
                    setBtnloading(false)
                    router.push(`/CourseTestSeries/${CourseSlug}`)
                }

            })
    }
    useEffect(() => {
       
        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/V3/List/CatList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD.categories)
                    setCatListdata(parsed.ReqD.categories)
                   
                })
        }
        handleSubmit()


    },[])

    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add new Test Series
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add new Test Series</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div className={MYS.featuresimagebox}>
                        <div className={MYS.featuresimageboxA}>
                            <img
                                src={`${Mainimg}`}
                                width={100}
                                height={100}
                                layout='responsive'
                                alt='img'
                                id="Fimage"

                            />
                            <div>
                                <small>features images</small>
                            </div>
                        </div>
                        <div className={MYS.featuresimageboxB}>
                                <FileUpload />
                            </div>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Title"
                                fullWidth
                                value={Title}

                                onInput={e => setTitle(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Full Details"
                                fullWidth
                                value={Details}

                                onInput={e => setDetails(e.target.value)}

                            />
                        </div>
                       
                     
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Tagline"
                                fullWidth
                                value={Tagline}

                                onInput={e => setTagline(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Tagline"
                                fullWidth
                                value={Taglinetwo}

                                onInput={e => setTaglinetwo(e.target.value)}

                            />
                        </div>
                        
                        

                        <input type="hidden" id="FinalFileName" />

                        <div style={{ minHeight: 25 }}></div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                   
                    <LoadingButton
                        size="small"
                        onClick={handleSubmit}
                        endIcon={<SendIcon />}
                        loading={Btnloading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>Save</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}