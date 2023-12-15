import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Skeleton from '@mui/material/Skeleton';
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'


import { useRouter, useParams } from 'next/router'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FileUpload from '../Upload/FileUpload'
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Select from '@mui/material/Select';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    FormControl,
    TextField,


} from '@mui/material';
export default function ScrollDialog() {
    const Contextdata = useContext(CheckloginContext)
    const [Btnloading, setBtnloading] = useState(false);
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [Title, setTitle] = useState('');
    const [Details, setDetails] = useState('Enter Course Description');
    const [Stock, setStock] = useState(1);
    const [IsActive, setIsActive] = useState(false);
    const [CertiDetails, setCertiDetails] = useState('');
    const [CertificationFee, setCertificationFee] = useState(0);
    const [lang, setLang] = useState('');
    const [CourseDuration, setCourseDuration] = useState('');
    const [Category, setCategory] = useState('');
    const [SubCategory, setSubCategory] = useState('');
    const [Sprice, setSprice] = useState('');
    const [Mprice, setMprice] = useState('');
    const [Duration, setDuration] = useState('');
    const [Tagline, setTagline] = useState('');
    const [Taglinetwo, setTaglinetwo] = useState('');
    const [IsFree, setIsFree] = useState(false);
    const [withcertificate, setWithcertificate] = useState(false);
    const [CatListdata, setCatListdata] = useState([]);
    const [SubCatListdata, setSubCatListdata] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const [LoadingSubCat, setLoadingSubCat] = useState(true);
    const handleEditorChange = (content) => {
        setEditorContent(content);
        setDetails(content);
    };
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const notify = (T) => toast(T, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

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
        if (Title !== '' && FinalFileName !== '' && Category !== '' && Sprice !== '' && Mprice !== '' && Duration !== '' && Tagline !== '' && Taglinetwo !== '' && IsFree !== '') {
            AddTs(FinalFileName)
            setBtnloading(true)

        } else {
            alert('all fields are required');
        }


    };
    const handleChangeFree = (event) => {
        setIsFree(event.target.value);
    };
    const handleChangeCerti = (event) => {
        setWithcertificate(event.target.value);
    };


    const AddTs = async (e) => {

        const sendUM = {
            JwtToken: Contextdata.JwtToken,

            catid: Category,
            Subcatid: SubCategory,
            title: Title,
            details: editorContent,
            img: e,
            mprice: Mprice,
            sprice: Sprice,
            isActive: IsActive,
            stock: Stock,
            duration: Duration,
            tagline: Tagline,
            taglinetwo: Taglinetwo,
            isFree: IsFree,
            lang: lang,
            CourseDuration: CourseDuration,
            withcertificate: withcertificate,

            CertiDetails: CertiDetails,
            CertificationFee: CertificationFee,

        }
        const data = await fetch("/api/V3/Add/AddCourse", {
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
                if (parsed.senddta.done) {
                    notify('Course Added Successfully')
                    setOpen(false)
                    setBtnloading(false)
                    router.push(`/coursedetails/${parsed.senddta.done.pid}`)
                } else {
                    alert(parsed.senddta.message)
                    notify('Something went wrong')
                }

            })
    }

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


    useEffect(() => {


        GetCatlist()


    }, [])

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
        Subcatlist(event.target.value)
    };


    const handleChangeSubCategory = (event) => {
        setSubCategory(event.target.value);
    };


    const editorStyle = {
        height: '200px', // Set the desired height
    };




    return (
        <div>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <ToastContainer />
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add new Course
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add new Course</DialogTitle>
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
                            <TextField
                                required
                                label="Main price"
                                fullWidth
                                type='number'
                                value={Mprice}

                                onInput={e => setMprice(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Sale price"
                                fullWidth
                                type='number'
                                value={Sprice}

                                onInput={e => setSprice(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Course Languages"
                                fullWidth

                                value={lang}
                                onInput={e => setLang(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Aprox Course Duration"
                                fullWidth

                                value={CourseDuration}

                                onInput={e => setCourseDuration(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Validity in days"
                                fullWidth
                                type='number'
                                value={Duration}

                                onInput={e => setDuration(e.target.value)}

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
                        <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Is this product is Free ?</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={IsFree}
                                    label="Is this product is Free ?"
                                    onChange={handleChangeFree}
                                >
                                    <MenuItem value={false}>No</MenuItem>
                                    <MenuItem value={true}>Yes</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                        <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Is this Course provide certification after Completion of Course ?</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={withcertificate}
                                    label="Is this Course provide certification after Completion of Course ?"
                                    onChange={handleChangeCerti}
                                >
                                    <MenuItem value={false}>No</MenuItem>
                                    <MenuItem value={true}>Yes</MenuItem>

                                </Select>
                            </FormControl>
                        </div>

                        {withcertificate &&
                            <div>
                                <div className={MYS.inputlogin}>
                                    <TextField
                                        required
                                        label="Certification Details"
                                        fullWidth
                                        value={CertiDetails}

                                        onInput={e => setCertiDetails(e.target.value)}

                                    />
                                </div>
                                <div className={MYS.inputlogin}>
                                    <TextField
                                        required
                                        label="Certification Fee"
                                        fullWidth
                                        value={CertificationFee}
                                        type='Number'
                                        onInput={e => setCertificationFee(e.target.value)}

                                    />
                                </div>
                            </div>
                        }



                        <div className={MYS.inputlogin}>
                            <div>
                                <ReactQuill
                                    theme="snow" // You can change the theme as per your preference
                                    value={Details}
                                    onChange={handleEditorChange}
                                    style={editorStyle}
                                />
                            </div>



                        </div>

                        <div style={{ height: '50px' }}></div>


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