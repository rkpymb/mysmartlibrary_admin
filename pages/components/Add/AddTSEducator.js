import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { useRouter, useParams } from 'next/router'
import Badge from '@mui/material/Badge';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FileUpload from '../Upload/FileUpload'
import { LuArrowLeft } from "react-icons/lu";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '../../../context/auth/CheckloginContext'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FormControl,
    IconButton,
    styled


} from '@mui/material';
export default function ScrollDialog({ CourseMainData }) {

    const Contextdata = useContext(CheckloginContext)
    const [Btnloading, setBtnloading] = useState(false);
    const [Retdata, setRetdata] = useState([]);
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [SelectedEdu, setSelectedEdu] = useState(false);
    const [Details, setDetails] = useState('Enter Course Description');
    const [initialData, setInitialData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [EduName, setEduName] = useState('');
    const [EduMobile, setEduMobile] = useState('');
    const [EduEmail, setEduEmail] = useState('');
    const [EduUsername, setEduUsername] = useState('');
    const [Coursepid, setCoursepid] = useState();
    const [Courseid, setCourseid] = useState();
    const [Courseimg, setCourseimg] = useState();

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
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
    const GetEdulist = async () => {
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { dataid }
        const data = await fetch("/api/V3/List/Educatorlistall", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setInitialData(parsed.ReqD.EDList)

                setIsLoading(false)
            })
    }

    useEffect(() => {
        setCoursepid(CourseMainData.pid)
        setCourseid(CourseMainData._id)
        setCourseimg(CourseMainData.img)
        GetEdulist()
        
    }, [router.query])

 
    const editorStyle = {
        height: '200px', // Set the desired height
    };
    const handleSearch = (e) => {
        setSelectedEdu(false)
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredData = initialData.filter(item => (
            item.name.toLowerCase().includes(query) ||
            item.email.toLowerCase().includes(query) ||
            item.mobile.toString().includes(query)
            || item.username.n.toLowerCase().includes(query)
        ));

        setRetdata(filteredData);
    };


    const AddEducator = async (e) => {
        // console.log(e)
        setEduUsername(e.username.n)
        setEduEmail(e.email)
        setEduMobile(e.mobile)
        setEduName(e.name)
        setSelectedEdu(true)
    }
    const Showmain = async () => {
        setSelectedEdu(false)
    }
    const FinalAddEdu = async () => {
        console.log(EduUsername)
        if (EduUsername !== '') {
            setBtnloading(true)
            const sendUM = {
                JwtToken: Contextdata.JwtToken,
                Coursepid: Coursepid,
                Courseid: Courseid,
                Courseimg: Courseimg,
                Edumobile: EduMobile,
                EduUsername: EduUsername,
            }
            const data = await fetch("/api/V3/Add/AddEducatortoTS", {
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
                        handleClose()
                        notify(`${EduName} Successfully added to this Test Series`)
                        router.push(`/tsdetails/${CourseMainData.pid}`)

                    } else {
                        alert(parsed.ReqData.message)
                    }
                })
        } else {
            alert('Can not add this educator')
        }

    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

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
                Add Educator
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add Educator into this Test Series</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    {!isLoading &&

                        <div>

                            {SelectedEdu ?
                                <div>
                                    <div className={MYS.EducatorProfilebox}>
                                        <IconButton aria-label="cart" onClick={Showmain}>
                                            <StyledBadge color="secondary" >
                                                <LuArrowLeft />
                                            </StyledBadge>
                                        </IconButton>
                                        <div className={MYS.EducatorProfileboxA}>
                                            <Avatar alt={EduName} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} />
                                        </div>
                                        <div className={MYS.Prilename}> <span>{EduName}</span></div>
                                        <div className={MYS.EducatorProfileboxB}>

                                            <small>Username : {EduUsername}</small>
                                            <small>Mobile : {EduMobile}</small>
                                            <small>Email : {EduEmail}</small>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>

                                    <div>
                                        <TextField
                                            label="Search by Educator's Name,Mobile,Email or Username"

                                            defaultValue="Small"
                                            size="small"
                                            id="search"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                        {searchQuery !== '' &&
                                            <div>
                                                {Retdata.length > 0 ?
                                                    <div>
                                                        {Retdata.map((item) => {
                                                            return <div className={MYS.EducatorlistSearch} key={item._id} onClick={() => AddEducator(item)}>
                                                                <div className={MYS.EducatorlistSearchA}>
                                                                    <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
                                                                </div>
                                                                <div className={MYS.EducatorlistSearchB}>
                                                                    <span>{item.name}</span>
                                                                    <small>{item.mobile}</small>
                                                                </div>
                                                            </div>
                                                        }

                                                        )}
                                                    </div> :
                                                    <div>
                                                        <span>0 Educator Found</span>
                                                    </div>

                                                }
                                            </div>
                                        }
                                    </div>
                                </div>


                            }

                            <div>

                            </div>


                        </div>
                    }





                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {SelectedEdu &&

                        <div>
                            <LoadingButton
                                size="small"
                                onClick={FinalAddEdu}
                                endIcon={<SendIcon />}
                                loading={Btnloading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                <span>Add to this Test Series</span>
                            </LoadingButton></div>
                    }

                </DialogActions>
            </Dialog>
        </div>
    );
}