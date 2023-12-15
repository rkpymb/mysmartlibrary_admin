import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Link from 'next/link'
import AddCourseChapters from '../components/Add/AddCourseChapters'
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';
import ReactPlayer from 'react-player/lazy'

import FileUpload from '../components/Upload/FileUpload';
import { Toast } from 'primereact/toast';
import { MediaFilesUrl, MediaFilesFolder } from '../../Data/config'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Select from '@mui/material/Select';
import { FiTrash } from "react-icons/fi";

import YtplayerLive from '../components/Player/YtplayerLive';

import {
    IconButton,
    Typography,
    styled,
    TextField,
    Button,
    Card,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
} from '@mui/material';


export async function getServerSideProps(context) {
    const Videoid = context.query.pageno[0];
    return {
        props: { Videoid },
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

function DashboardCrypto({ Videoid }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [VideoData, setVideoData] = useState({});
    const [IsLoading, setIsLoading] = useState(true);
    const [VideoStatus, setVideoStatus] = useState();
    const [Title, setTitle] = useState('');
    const [Descriptions, setDescriptions] = useState('');
    const [Btnloading, setBtnloading] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);
    const [VideoUrlid, setVideoUrlid] = useState('');

    const handleChangeVideoStatus = (event) => {
        setVideoStatus(event.target.value);

    };
    useEffect(() => {
        GetVideoData()
    }, [router.query])


    const GetVideoData = async () => {
        const sendUM = { Videoid: Videoid, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Video/GetLiveData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed.ReqData.error) {
                    alert('Invalid video id')
                } else {
                    setIsLoading(false)
                    setVideoData(parsed.ReqData.videodata)
                    setDescriptions(parsed.ReqData.videodata.details)
                    setTitle(parsed.ReqData.videodata.title)
                    setVideoStatus(parsed.ReqData.videodata.isActive)
                    setVideoUrlid(parsed.ReqData.videodata)
                    setShowVideo(true)
                }
            })
    }



    const EditVideo = async (e) => {
        e.preventDefault();
        let FinalFileName = document.querySelector('#FinalFileName').value
        if (Title !== '' && FinalFileName !== '' && Descriptions !== '') {
            setBtnloading(true)
            const sendUM = {
                JwtToken: Contextdata.JwtToken,
                title: Title,
                thumbnail: FinalFileName,
                details: Descriptions,
                isActive: VideoStatus,
                id: Videoid
            }
            const data = await fetch("/api/V3/Update/EditLiveLecture", {
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
                        alert('Live Session Updated Successfully')
                        router.push(`/LiveDetails/${Videoid}`)
                    } else {
                        alert('Something went wrong , Try Again')
                    }



                })
        } else {
            alert('all fields are required');
        }


    };
    const DeleteVideo = async (e) => {
        let text = "Do you really want to delete ?";
        if (confirm(text) == true) {
            setBtnloading(true)
            const sendUM = {
                JwtToken: Contextdata.JwtToken,

                id: Videoid
            }
            const data = await fetch("/api/V3/Delete/DeleteLiveLecture", {
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
                        alert('Video Deleted Successfully')
                        router.back()
                    } else {
                        alert(parsed.ReqData.message)
                    }



                })
        }



    };

    return (
        <>
            <Head>
                <title>Live : {VideoData.title}</title>
            </Head>

            <div className={MYS.marginTopMain}>

                <div className={MYS.TitleWithBackHeader}>
                    <div className={MYS.TitleWithBackHeaderA}>
                        <IconButton aria-label="cart" onClick={() => router.back()}>
                            <StyledBadge color="secondary" >
                                <LuArrowLeft />
                            </StyledBadge>
                        </IconButton>
                        <div>
                            {!IsLoading ?
                                <div>
                                    <span>Live Session : {VideoData.title} </span>
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }
                        </div>
                    </div>
                    <div className={MYS.TitleWithBackHeaderB}>

                        <div className={MYS.Topbtnbox}>
                            <div className={MYS.Topbtnboxbtn}>
                                <LoadingButton
                                    size="small"
                                    onClick={DeleteVideo}
                                    endIcon={<FiTrash />}
                                    loading={Btnloading}
                                    loadingPosition="end"
                                    variant="outlined"

                                >
                                    <span>Delete video</span>
                                </LoadingButton>
                            </div>


                        </div>


                    </div>

                </div>

                <div className={MYS.stickyContainerBox}>
                    <div className={MYS.stickyContainer2}>
                    {!IsLoading &&
                    <div>

                        <div className={MYS.VideoBoxFlex}>
                            <div className={MYS.VideoBoxFlexA}>
                                {ShowVideo &&
                                    <div>
                                        <YtplayerLive Videoid={Videoid} />
                                    </div>

                                }

                            </div>
                            <div className={MYS.VideoBoxFlexB}>
                                <Card className={MYS.Videoeditcard}>
                                    <div className={MYS.VideoeditcardContent}>
                                        <div>
                                            <span style={{ fontWeight: 600 }}>Edit Live Session</span>
                                        </div>
                                        <div className={MYS.VideoBoxFlexBEditBox}>

                                            <div style={{ height: '20px' }}></div>
                                            <div>
                                                <div className={MYS.featuresimagebox}>
                                                    <div className={MYS.featuresimageboxA}>
                                                        <img
                                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${VideoData.thumbnail}`}
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
                                                <form onSubmit={EditVideo} >
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

                                                    <input type="hidden" value={VideoData.thumbnail} id="FinalFileName" />



                                                    <div className={MYS.inputlogin}>
                                                        <LoadingButton
                                                            size="small"
                                                            onClick={EditVideo}
                                                            endIcon={<SendIcon />}
                                                            loading={Btnloading}
                                                            loadingPosition="end"
                                                            variant="contained"
                                                        >
                                                            <span>update video</span>
                                                        </LoadingButton>
                                                    </div>



                                                </form>
                                            </div>
                                        </div>
                                    </div>


                                </Card>

                            </div>
                        </div>
                    </div>

                }

                    </div>
                </div>

                

            </div>

        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
