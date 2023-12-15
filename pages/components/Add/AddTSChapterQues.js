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



import {
  
    TextField,
    styled
} from '@mui/material';
export default function ScrollDialog({ chid }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
   
    const [open, setOpen] = useState(false);
   
    const [scroll, setScroll] = useState('paper');
    const [Title, setTitle] = useState('');
    const [Details, setDetails] = useState('');
    
    const [IsActive, setIsActive] = useState(false);
   

    const [Marks, setMarks] = useState('');
   
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
      
        if (Title !== '' && Marks !== '' && Details !== '') {
            AddnewChapter()

        } else {
            alert('all fields are required');
        }


    };
  
   


    const AddnewChapter = async () => {
    
        const sendUM = { chid: chid, title: Title, details: Details, isActive: IsActive, marks: Marks, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Add/AddTSChapterQues", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.senddta)
                if (parsed.senddta) {
                    setOpen(false)
                    router.push(`/TSChapterQues/${chid}`)
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
                Add new Question
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add new Question</DialogTitle>
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
                                label="Marks"
                                fullWidth
                                type='number'
                                value={Marks}

                                onInput={e => setMarks(e.target.value)}

                            />
                        </div>
            
                        <div style={{ minHeight: 25 }}></div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}