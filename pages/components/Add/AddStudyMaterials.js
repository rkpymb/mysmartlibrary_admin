import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import CheckloginContext from '../../../context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import FileUpload from '../Upload/FileUpload'
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
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
export default function ScrollDialog() {
    const [Btnloading, setBtnloading] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Platformtype, setPlatformtype] = useState(2);
    const [VideoText, setVideoText] = useState('Yotube Video ID');
    const [open, setOpen] = useState(false);
    const [VideoStatus, setVideoStatus] = useState(3);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [Title, setTitle] = useState('');
    const [SubCategory, setSubCategory] = useState('');
    const [Category, setCategory] = useState('');
    const [Descriptions, setDescriptions] = useState('');
    const [VideoidValue, setVideoidValue] = useState('');
    const [Sprice, setSprice] = useState('0');
    const [Mprice, setMprice] = useState('0');
    const [IsFree, setIsFree] = useState(true);
    const [CatListdata, setCatListdata] = useState([]);
    const [SubCatListdata, setSubCatListdata] = useState([]);

    const [LoadingSubCat, setLoadingSubCat] = useState(true);

    const [editorContent, setEditorContent] = useState('');
    const handleEditorChange = (content) => {
        setEditorContent(content);
        setDescriptions(content);
    };

    const GetCatlist = async () => {
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

    const Subcatlist = async (e) => {
        setSubCategory('')
        setLoadingSubCat(true)
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { MainCat: e }
        const data = await fetch("/api/V3/List/SubCategoriesList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqD.categories) {
                    setLoadingSubCat(false)
                    setSubCatListdata(parsed.ReqD.categories)
                }


            })
    }

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
        Subcatlist(event.target.value)
    };


    const handleChangeSubCategory = (event) => {
        setSubCategory(event.target.value);
    };

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
        if (Title !== '' && FinalFileName !== '' ) {
            setBtnloading(true)
            AddVideo(FinalFileName)
        } else {
            alert('all fields are required');
        }


    };


    const AddVideo = async (e) => {

        const sendUM = {
            JwtToken: Contextdata.JwtToken,
            catid: Category,
            subcatid: SubCategory,
            title: Title,
            details: editorContent,
            fileurl: e,
           
            isActive: 3,
            isFree: IsFree,
            mprice: Mprice,
            sprice: Sprice,
        }

        const data = await fetch("/api/V3/Add/AddMainSM", {
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
                if (parsed.ReqData.done) {
                    alert('File Addded Successfully')
                    setOpen(false)
                    router.push(`/Academics/StudyMaterials`)
                } else {
                    alert(parsed.ReqData.message)
                }


            })
    }

    useEffect(() => {


        GetCatlist()


    }, [])
    const editorStyle = {
        height: '200px', // Set the desired height
    };


    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add Pdf File
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title">Add Pdf File</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div>
                        <div className={MYS.featuresimagebox}>

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
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Category}
                                        label="Select Category"
                                        onChange={handleChangeCategory}
                                    >
                                        {CatListdata.map((item) => {
                                            return <MenuItem value={item.slug}>{item.name}</MenuItem>


                                        }

                                        )}



                                    </Select>
                                </FormControl>
                            </div>

                            {Category !== '' &&

                                <div className={MYS.inputlogin}>
                                    {LoadingSubCat &&
                                        <div>
                                            <Skeleton variant="rounded" width='100%' height={60} />

                                        </div>
                                    }
                                    {!LoadingSubCat &&
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={SubCategory}
                                                label="Sub Category"

                                                onChange={handleChangeSubCategory}
                                            >

                                                {SubCatListdata.map((item) => {
                                                    return <MenuItem value={item.slug}>{item.name}</MenuItem>


                                                }

                                                )}



                                            </Select>
                                            {SubCatListdata.length == 0 &&
                                                <div style={{ color: "red", marginTop: '5px' }}><small>{SubCatListdata.length} sub Categories Found</small></div>
                                            }
                                        </FormControl>
                                    }


                                </div>



                            }

                            <div className={MYS.inputlogin}>
                                <div>
                                    <ReactQuill
                                        theme="snow" // You can change the theme as per your preference
                                        value={editorContent}
                                        onChange={handleEditorChange}
                                        style={editorStyle}
                                    />
                                </div>

                            </div>

                            <div style={{ height: '50px' }}></div>

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