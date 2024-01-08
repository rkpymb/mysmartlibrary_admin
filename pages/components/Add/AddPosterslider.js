import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'

import FileUpload from '../Upload/FileUpload'
import FileUploadTwo from '../Upload/FileUploadTwo'
import { Toast } from 'primereact/toast';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [PosterUrl, setPosterUrl] = useState('');
    const [PType, setPType] = useState('Website');
    const [isActive, setIsActive] = useState(true);
    const [order, setOrder] = useState(0);
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

    const AddposterFunc = async (e) => {
        e.preventDefault();
        let FinalFileName = document.querySelector('#FinalFileName').value
        let FinalFileName2 = document.querySelector('#FinalFileName2').value
        if (PosterUrl !== '' && FinalFileName !== '' && FinalFileName2 !== '') {
            setBtnloading(true)
            const sendUM = {
                JwtToken: Contextdata.JwtToken,
                BigImg: FinalFileName,
                SmallImg: FinalFileName2,
                url: PosterUrl,
                PType: PType,
                isActive: isActive,
                order: order,
            }
            const data = await fetch("/api/V3/Add/AddPosterslider", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setBtnloading(false)
                    if (parsed.ReqData.done) {
                        alert(parsed.ReqData.done)
                        setOpen(false)
                        router.push('/Settings/PosterSliders')
                    } else {
                        alert('Something Went wrong')
                    }
    
    
                })
        } else {
            alert('all fields are required');
        }


    };


    const Addposter = async (e) => {
       
    }


    const handlePType = (event) => {
        setPType(event.target.value);
       
    };

    const handleisActive = (event) => {
        setIsActive(event.target.value);
       
    };


    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add new Poster
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Add new Poster</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div>
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
                                    <small>Big Poster images</small>
                                </div>
                            </div>
                            <div className={MYS.featuresimageboxB}>
                                <FileUpload />
                            </div>
                        </div>
                        <div style={{ minHeight: 20 }}></div>
                        <div className={MYS.featuresimagebox}>
                            <div className={MYS.featuresimageboxA}>
                                <img
                                    src={`${Mainimg}`}
                                    width={100}
                                    height={100}
                                    layout='responsive'
                                    alt='img'
                                    id="Fimage2"

                                />
                                <div>
                                    <small>Small Poster images</small>
                                </div>
                            </div>
                            <div className={MYS.featuresimageboxB}>
                                <FileUploadTwo />
                            </div>
                        </div>
                        <div style={{ minHeight: 20 }}></div>
                        <form onSubmit={AddposterFunc} >
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Poster Order"
                                    fullWidth
                                    value={order}
                                    onInput={e => setOrder(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Poster Url"
                                    fullWidth
                                    value={PosterUrl}
                                    onInput={e => setPosterUrl(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={PType}
                                    label="Select Platform"
                                    onChange={handlePType}
                                >
                                   <MenuItem value='App'>App</MenuItem>
                                   <MenuItem value='Website'>Website</MenuItem>


                                </Select>
                            </FormControl>
                            </div>
                            <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Poster Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={isActive}
                                    label="Select Status"
                                    onChange={handleisActive}
                                >
                                     <MenuItem value={true}>Public</MenuItem>
                                   <MenuItem value={false}>Private</MenuItem>
                                  
                                  


                                </Select>
                            </FormControl>
                            </div>
                            <input type="hidden" id="FinalFileName" />
                            
                            <input type="hidden" id="FinalFileName2" />

                            <div style={{ minHeight: 25 }}></div>

                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        size="small"
                        onClick={AddposterFunc}
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