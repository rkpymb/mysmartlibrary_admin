import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'

import { useRouter, useParams } from 'next/router'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
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
export default function ScrollDialog({ tsid }) {
    const [Btnloading, setBtnloading] = useState(false);
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [open, setOpen] = useState(false);
   
    const [scroll, setScroll] = useState('paper');
    const [Title, setTitle] = useState('');
    const [Details, setDetails] = useState('');
    
    const [IsActive, setIsActive] = useState(false);
  
    const [Duration, setDuration] = useState('');
  
    const [IsFree, setIsFree] = useState('');
   
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
      
        if (Title !== '' && Duration !== '' && IsFree !== '' && Details !== '') {
            setBtnloading(true)
            AddnewChapter()

        } else {
            alert('all fields are required');
        }


    };
    const handleChangeFree = (event) => {
        setIsFree(event.target.value);
    };
   


    const AddnewChapter = async () => {
    
        const sendUM = { tsid: tsid, title: Title, details: Details, isActive: IsActive, duration: Duration, isFree: IsFree, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Add/AddTSChapter", {
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
                if (parsed.senddta.done) {
                    alert('Chapter Added successfully')
                    setOpen(false)
                    router.push(`/TSChapters/${tsid}`)
                } else {
                    alert('Something went Wrong')
                }

            })
    }
    
    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add new Chapter
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add new Chapter</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>


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
                                label="Duration in minutes"
                                fullWidth
                                type='number'
                                value={Duration}

                                onInput={e => setDuration(e.target.value)}

                            />
                        </div>
                       
                        
                        <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Is this chapter Free ?</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={IsFree}
                                    label="Is this chapter Free ?"
                                    onChange={handleChangeFree}
                                >
                                    <MenuItem value={false}>No</MenuItem>
                                    <MenuItem value={true}>Yes</MenuItem>
                                   
                                </Select>
                            </FormControl>
                        </div>

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