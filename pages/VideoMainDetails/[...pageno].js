import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'

import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';


import FileUpload from '../components/Upload/FileUpload';

import { MediaFilesUrl, MediaFilesFolder } from '../../Data/config'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Select from '@mui/material/Select';
import { FiTrash } from "react-icons/fi";

import VideoYtplayer from '../components/Player/VideoYtplayer';

import {
    IconButton,

    styled,
    TextField,

    Card,

} from '@mui/material';

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

export async function getServerSideProps(context) {
    const Videoid = context.query.pageno[0];
    return {
        props: { Videoid },
    }

}

const editorStyle = {
    height: '200px', // Set the desired height
};

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
    const [Platformtype, setPlatformtype] = useState();
    const [VideoText, setVideoText] = useState('Video ID');
    const [VideoStatus, setVideoStatus] = useState();
    const [Title, setTitle] = useState('');

    const [Btnloading, setBtnloading] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);
    const [VideoUrlid, setVideoUrlid] = useState();
    const [SubCategory, setSubCategory] = useState();
    const [Category, setCategory] = useState();
    const [VideoidValue, setVideoidValue] = useState();
    const [Sprice, setSprice] = useState();
    const [Mprice, setMprice] = useState();
    const [IsFree, setIsFree] = useState();
    const [CatListdata, setCatListdata] = useState([]);
    const [SubCatListdata, setSubCatListdata] = useState([]);

    const [LoadingSubCat, setLoadingSubCat] = useState(true);

    const [editorContent, setEditorContent] = useState('');


    const handleEditorChange = (content) => {
        setEditorContent(content);

    };

    useEffect(() => {
        GetVideoDataMain()
    }, [router.query])

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
        Subcatlist(event.target.value)
    };


    const handleChangeSubCategory = (event) => {
        setSubCategory(event.target.value);
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
    const GetVideoDataMain = async () => {
        const sendUM = { Videoid: Videoid, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Video/GetVideoMainData", {
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
                    
                    setVideoData(parsed.ReqData.videodata)
                    setTitle(parsed.ReqData.videodata.title)
                    setVideoStatus(parsed.ReqData.videodata.isActive)
                    setVideoUrlid(parsed.ReqData.videodata.Videoid)
                    setVideoidValue(parsed.ReqData.videodata.Videoid)
                    setPlatformtype(parsed.ReqData.videodata.VideoType)
                    setVideoStatus(parsed.ReqData.videodata.isActive)
                    setTitle(parsed.ReqData.videodata.title)
                    setEditorContent(parsed.ReqData.videodata.details)
                    setCategory(parsed.ReqData.videodata.catid)
                    setSubCategory(parsed.ReqData.videodata.subcatid)
                    setSprice(parsed.ReqData.videodata.sprice)
                    setMprice(parsed.ReqData.videodata.mprice)
                    setIsFree(parsed.ReqData.videodata.isFree)
                    Subcatlist(parsed.ReqData.videodata.catid)
                    
                    setShowVideo(true)
                    setIsLoading(false)
                }
            })
    }



    const EditVideo = async (e) => {
        e.preventDefault();
        let FinalFileName = document.querySelector('#FinalFileName').value
        if (Title !== '' && FinalFileName !== '' && VideoidValue !== '') {
            setBtnloading(true)
            const sendUM = {
                JwtToken: Contextdata.JwtToken,
                catid: Category,
                subcatid: SubCategory,
                title: Title,
                details: editorContent,
                img: FinalFileName,
                Videoid: VideoidValue,
                VideoType: Platformtype,
                isActive: VideoStatus,
                isFree: IsFree,
                mprice: Mprice,
                sprice: Sprice,
                id: VideoData._id,
               
            }
            const data = await fetch("/api/V3/Update/EditVideo", {
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
                        alert('Video Updated Successfully')
                        router.push(`/VideoMainDetails/${Videoid}`)
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
            const data = await fetch("/api/V3/Delete/DeleteVideo", {
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
                   
                    setSubCatListdata(parsed.ReqD.categories)
                    setLoadingSubCat(false)
                }


            })
    }
    useEffect(() => {


        GetCatlist()


    }, [])


    return (
        <>
            <Head>
                <title>Video : {VideoData.title}</title>
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
                                    <span>Video Lecture : {VideoData.title} </span>
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
                                                <VideoYtplayer Videoid={Videoid} />
                                            </div>

                                        }

                                    </div>
                                    <div className={MYS.VideoBoxFlexB}>
                                        <Card className={MYS.Videoeditcard}>
                                            <div className={MYS.VideoeditcardContent}>
                                                <div>
                                                    <span style={{ fontWeight: 600 }}>Edit Video Lecture</span>
                                                </div>
                                                <div className={MYS.VideoBoxFlexBEditBox}>

                                                    <div style={{ height: '20px' }}></div>
                                                    <div>
                                                        <div className={MYS.featuresimagebox}>
                                                            <div className={MYS.featuresimageboxA}>
                                                                <img
                                                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${VideoData.img}`}
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

                                                            <input type="hidden" value={VideoData.img} id="FinalFileName" />

                                                            <div style={{ minHeight: 25 }}></div>
                                                            <LoadingButton
                                                                size="small"
                                                                onClick={EditVideo}
                                                                endIcon={<SendIcon />}
                                                                loading={Btnloading}
                                                                loadingPosition="end"
                                                                variant="contained"
                                                            >
                                                                <span>Update Video</span>
                                                            </LoadingButton>
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
