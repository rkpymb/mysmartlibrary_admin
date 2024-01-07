import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import Image from 'next/image';
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Addposter from '../../components/Library/Add/Addposter'
import Addphotos from '../../components/Library/Add/Addphotos'
import Select from '@mui/material/Select';
import { FiTrash, FiEdit } from "react-icons/fi";
import EditBranch from '../../components/Library/Edit/EditBranch'



import {
    IconButton,

    styled,
    TextField,
    Button,

} from '@mui/material';


export async function getServerSideProps(context) {
    const BranchCode = context.query.pageno[0];
    return {
        props: { BranchCode },
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

function DashboardCrypto({ BranchCode }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()

    const [IsLoading, setIsLoading] = useState(true);
    const [ShowPosters, setShowPosters] = useState(true);
    const [BranchData, setBranchData] = useState({});
    const [PosterList, setPosterList] = useState([]);
    const [PhotosList, sePhotosList] = useState([]);
    const [ShowPhotos, setShowPhotos] = useState(true);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';



    useEffect(() => {
        GetBranchData()
    }, [router.query])



    const DeleteBranch = async (e) => {
        let text = "Do you really want to delete ?";
        if (confirm(text) == true) {

            const sendUM = {
                JwtToken: Contextdata.JwtToken,
                id: e
            }
            const data = await fetch("/api/V3/Library/Branches/DeleteBranch", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.done) {
                        alert(parsed.ReqD.done)
                        router.push('/Library/Branches')
                    } else {
                        alert('Something went wrong')
                    }



                })
        }



    };
    const GetAllLBPosterslider = async (e) => {
        setShowPosters(true)
        const sendUM = {
            JwtToken: Contextdata.JwtToken,
            BranchCode: e
        }
        const data = await fetch("/api/V3/Library/LBPosterslider/AllLBPosterslider", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.LBPosterSlider)
                if (parsed.ReqD.LBPosterSlider) {
                    setPosterList(parsed.ReqD.LBPosterSlider)
                   
                    setShowPosters(false)
                }


            })



    };
    const GetAllPhotos = async (e) => {
        setShowPhotos(true)
        const sendUM = {
            JwtToken: Contextdata.JwtToken,
            BranchCode: e
        }
        const data = await fetch("/api/V3/Library/Photos/AllLBPhoto", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.Photoslist)
                if (parsed.ReqD.Photoslist) {
                    sePhotosList(parsed.ReqD.Photoslist)
                    setShowPhotos(false)
                }


            })



    };

    const GetBranchData = async () => {
        setIsLoading(true)
        const sendUM = { BranchCode: BranchCode, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Library/Branches/BranchDetails", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqD.BranchData) {
                    if (parsed.ReqD.BranchData.length == 1) {
                        console.log(parsed.ReqD.BranchData[0])
                        setBranchData(parsed.ReqD.BranchData[0])
                        GetAllLBPosterslider(parsed.ReqD.BranchData[0].BranchCode)
                        GetAllPhotos(parsed.ReqD.BranchData[0].BranchCode)
                        setIsLoading(false)

                    } else {
                        alert('Something Went Worng')
                    }
                }


            })
    }


    const DeletePoster = async (e) => {
        let text = "Do you really want to delete This Poster ?";
        if (confirm(text) == true) {

            const sendUM = {
                JwtToken: Contextdata.JwtToken,
                id: e
            }
            const data = await fetch("/api/V3/Library/LBPosterslider/DeleteLBSlider", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.done) {
                        alert(parsed.ReqD.done)
                        GetAllLBPosterslider(BranchCode)
                    } else {
                        alert('Something went wrong')
                    }



                })
        }



    };
    const DeletePhoto = async (e) => {
        let text = "Do you really want to delete This Photo ?";
        if (confirm(text) == true) {

            const sendUM = {
                JwtToken: Contextdata.JwtToken,
                id: e
            }
            const data = await fetch("/api/V3/Library/Photos/DeleteLBphoto", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.done) {
                        alert(parsed.ReqD.done)
                        GetAllPhotos(BranchCode)
                    } else {
                        alert('Something went wrong')
                    }



                })
        }



    };

    return (
        <>
            <Head>
                <title>Branch Details : {BranchData && BranchData.name}</title>
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
                                    <span>Library Branch : {BranchData.name} </span>
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }
                        </div>
                    </div>
                    <div className={MYS.TitleWithBackHeaderB}>


                    </div>

                </div>

                <div className={MYS.stickyContainerBox}>
                    <div className={MYS.stickyContainer2}>
                        <div className={MYS.BranchDataBox}>
                            <div className={MYS.BranchDataBoxA}>
                                <div className={MYS.BrachDetailbox}>
                                    <div style={{ width: '130px', marginBottom: '10px' }}>
                                        {!IsLoading ?
                                            <div>
                                                <img src={`${MediaFilesUrl}${MediaFilesFolder}/${BranchData.logo}`} width='100%' />
                                            </div>
                                            : <div>
                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={130} height={130} animation="wave" />

                                            </div>


                                        }

                                    </div>
                                    <div>
                                        {!IsLoading ?
                                            <div>
                                                <b>{BranchData.name}</b>
                                            </div>
                                            : <div>
                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation="wave" />

                                            </div>


                                        }
                                    </div>
                                    {!IsLoading ?
                                        <div>
                                            <div><span style={{ fontSize: '12px' }}>Short Name : {BranchData.Sname}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>Branch Code : {BranchData.BranchCode}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>Mobile number : {BranchData.MobileNum}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>Email  : {BranchData.Email}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>WhatsApp : {BranchData.Whatsapp}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>City : {BranchData.City}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>Full Address : {BranchData.Address}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>State : {BranchData.State}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>Pin Code : {BranchData.pincode}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>Longitude : {BranchData.longitude}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>Latitude : {BranchData.latitude}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>GoogleMap : {BranchData.GoogleMap}</span></div>
                                            <div><span style={{ fontSize: '12px' }}>Status : {BranchData.isActive == 3 ? <span style={{ color: '#2ECC71', fontWeight: 'bold' }}>Active</span> : <span style={{ color: 'red', fontWeight: 'bold' }}>Not Active</span>}</span></div>
                                        </div>
                                        : <div>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />

                                        </div>


                                    }
                                    {!IsLoading &&
                                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>

                                            <EditBranch BranchData={BranchData} />
                                            <div style={{ width: '15px' }}></div>
                                            <LoadingButton
                                                type="submit"
                                                size="small"
                                                onClick={() =>
                                                    DeleteBranch(BranchData._id)
                                                }
                                                endIcon={<FiTrash />}
                                                loading={false}
                                                loadingPosition="end"
                                                variant="outlined"
                                            >
                                                <span>Delete Branch</span>
                                            </LoadingButton>
                                        </div>
                                    }


                                </div>
                            </div>
                            <div className={MYS.BranchDataBoxB}>
                                <div className={MYS.LBsmallBoxHeader}>
                                    <div className={MYS.LBsmallBoxHeaderA}>
                                        <span>Library App Posters</span>
                                    </div>
                                    <div className={MYS.LBsmallBoxHeaderB}>
                                        {!IsLoading && <Addposter BranchCode={BranchCode} />}
                                    </div>
                                </div>
                                <div>
                                    <div className={MYS.LbPosterGrid}>
                                        {PosterList.map((item) => {
                                            return <div className={MYS.LBPosteritem} key={item._id}>
                                                <div className={MYS.LBPosteritemimg}>
                                                    <Image
                                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}

                                                        alt="image"
                                                        layout="responsive"
                                                        placeholder='blur'
                                                        width={'100%'}
                                                        height={70}
                                                        quality={50}
                                                        blurDataURL={blurredImageData}

                                                    />
                                                </div>
                                                <div className={MYS.LBPosteritemBottom}>
                                                    <IconButton aria-label="cart" onClick={() =>
                                                        DeletePoster(item._id)
                                                    }>
                                                        <StyledBadge color="secondary" >
                                                            <FiTrash size={15} />
                                                        </StyledBadge>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        }

                                        )}
                                    </div>
                                </div>
                                {!ShowPosters ?
                                    <div className={MYS.BranchPosterBox}>
                                    </div> :
                                    <div> <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={130} height={130} animation="wave" /></div>

                                }

                            </div>
                            <div className={MYS.BranchDataBoxB}>
                                <div className={MYS.LBsmallBoxHeader}>
                                    <div className={MYS.LBsmallBoxHeaderA}>
                                        <span>Library Photos</span>
                                    </div>
                                    <div className={MYS.LBsmallBoxHeaderB}>
                                        {!IsLoading && <Addphotos BranchCode={BranchCode} />}
                                    </div>
                                </div>
                                <div>
                                    <div className={MYS.LbPosterGrid}>
                                        {PhotosList.map((item) => {
                                            return <div className={MYS.LBPosteritem} key={item._id}>
                                                <div className={MYS.LBPosteritemimg}>
                                                    <Image
                                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}

                                                        alt="image"
                                                        layout="responsive"
                                                        placeholder='blur'
                                                        width={'100%'}
                                                        height={70}
                                                        quality={50}
                                                        blurDataURL={blurredImageData}

                                                    />
                                                </div>
                                                <div className={MYS.LBPosteritemBottom}>
                                                    <IconButton aria-label="cart" onClick={() =>
                                                        DeletePhoto(item._id)
                                                    }>
                                                        <StyledBadge color="secondary" >
                                                            <FiTrash size={15} />
                                                        </StyledBadge>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        }

                                        )}
                                    </div>
                                </div>
                                {!ShowPosters ?
                                    <div className={MYS.BranchPosterBox}>
                                    </div> :
                                    <div> <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={130} height={130} animation="wave" /></div>

                                }

                            </div>
                        </div>

                    </div>
                </div>




            </div>

        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
