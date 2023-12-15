import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import CheckloginContext from '../../../context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'

import FileUpload from '../Upload/FileUpload'
import { Toast } from 'primereact/toast';
import { useRouter, useParams } from 'next/router'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {

    TextField,

    styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
export default function ScrollDialog({chapterid,pid}) {
    const [Btnloading, setBtnloading] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()

    const [Platformtype, setPlatformtype] = useState(null);
    const [VideoText, setVideoText] = useState('Video Platform Type');
    const [open, setOpen] = useState(false);
    const [VideoStatus, setVideoStatus] = useState(1);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [Title, setTitle] = useState('');
    const [Descriptions, setDescriptions] = useState('');
    const [VideoidValue, setVideoidValue] = useState('');
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePlatformtype = (event) => {
        setPlatformtype(event.target.value);

        if (event.target.value == 1) {
            setVideoText('Dailymotion Video ID')
        }
        if (event.target.value == 2) {
            setVideoText('Youtube Video ID')
        }
    };
    const handleChangeVideoStatus = (event) => {
        setVideoStatus(event.target.value);

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
        if (Title !== '' && FinalFileName !== '' && Descriptions !== '' && VideoidValue !== '' && Platformtype !== null) {
            setBtnloading(true)
            AddVideo(FinalFileName)
        } else {
            alert('all fields are required');
        }


    };


    const AddVideo = async (e) => {
       
        const sendUM = {
            pid: pid,
            chapterid: chapterid,
            title: Title,
            details: Descriptions,
            platformtype: Platformtype,
            videoid: VideoidValue,
            thumbnail: e,
            isActive: VideoStatus,
            JwtToken: Contextdata.JwtToken
        }

        const data = await fetch("/api/V3/Add/addvideolecture", {
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
                if (parsed.ReqData.videodata) {
                    alert('Video Addded Successfully')
                    setOpen(false)
                    router.push(`/CourseChapterField/${chapterid}/${pid}/1`)
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
                Add new Video Lecture
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Add new Video Lecture</DialogTitle>
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
                                    label="Lecture's Title"
                                    fullWidth
                                    value={Title}

                                    onInput={e => setTitle(e.target.value)}

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Descriptions"
                                    fullWidth
                                    value={Descriptions}

                                    onInput={e => setDescriptions(e.target.value)}

                                />
                            </div>

                            <div className={MYS.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Video Platform Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Platformtype}
                                        label='Video Platform Type'
                                        onChange={handleChangePlatformtype}

                                    >

                                        <MenuItem value={1}>Dailymotion</MenuItem>
                                        <MenuItem value={2}>Youtube</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {Platformtype > 0 &&
                                <div className={MYS.inputlogin}>
                                    <TextField
                                        required
                                        label={VideoText}
                                        fullWidth
                                        value={VideoidValue}

                                        onInput={e => setVideoidValue(e.target.value)}

                                    />
                                </div>

                            }

                            <div className={MYS.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Video Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={VideoStatus}
                                        label='Video Platform Type'
                                        onChange={handleChangeVideoStatus}

                                    >

<MenuItem value={1}>upcoming</MenuItem>
                                        <MenuItem value={2}>Public</MenuItem>
                                        <MenuItem value={3}>Private</MenuItem>
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