import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'
import Select from '@mui/material/Select';
import PdfUpload from '../Upload/PdfUpload'
import { Toast } from 'primereact/toast';
import { useRouter, useParams } from 'next/router'


import {
    FormControl,
    TextField,

    styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
export default function ScrollDialog({ chapterid, pid }) {
    const [Btnloading, setBtnloading] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [Title, setTitle] = useState('');
    const [FileStatus, setFileStatus] = useState(false);
    const [Details, setDetails] = useState('');
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

    const handleChangeStatus = (event) => {
        setFileStatus(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let FinalFileName = document.querySelector('#FinalFileName').value
        if (Title !== '' && FinalFileName !== '') {
            setBtnloading(true)
            Addpdf(FinalFileName)
        } else {
            alert('all fields are required');
        }


    };


    const Addpdf = async (filedata) => {

        const sendUM = {
            JwtToken: Contextdata.JwtToken,
            pid: pid,
            chapterid: chapterid,
            title: Title,
            details: Details,
            file: filedata,
            isActive: FileStatus
        }
        const data = await fetch("/api/V3/Add/Addpdfnotes", {
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
                console.log(parsed)
                if (parsed.ReqData.Notes) {
                    alert('Pad Note Added Successfully')
                    setOpen(false)
                    router.push(`/CourseChapterField/${chapterid}/${pid}/4`)
                } else {

                    alert(parsed.ReqData.message)
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
                Add Pdf notes
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Add Pdf notes</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div>
                        <div className={MYS.featuresimagebox}>
                            <div className={MYS.featuresimageboxA}>
                                <img
                                    src={`/pdf-file-format.png`}
                                    width={50}
                                    height={50}
                                    layout='responsive'
                                    alt='img'
                                    id="Fimage"

                                />

                            </div>
                            <div className={MYS.featuresimageboxB}>
                                <PdfUpload />
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
                                    label="Details"
                                    fullWidth
                                    value={Details}
                                    onInput={e => setDetails(e.target.value)}
                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={FileStatus}
                                        label="Select Status"
                                        onChange={handleChangeStatus}
                                    >
                                        <MenuItem value={false}>Private</MenuItem>
                                        <MenuItem value={true}>Public</MenuItem>


                                    </Select>
                                </FormControl>
                            </div>
                            <input type="hidden" id="FinalFileName" />

                            <div style={{ minHeight: 25 }}></div>

                        </form>
                    </div>
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