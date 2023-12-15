import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'

import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Videolistbychapterid from '../components/Courses/Videolistbychapterid'
import Pdflistbychapterid from '../components/Courses/Pdflistbychapterid'
import Livelistbychapterid from '../components/Courses/Livelistbychapterid'

import { FiAirplay,FiRadio,FiList } from 'react-icons/fi';
import {
    IconButton,
  
    styled,
   
    Button,
   
} from '@mui/material';


import Skeleton from '@mui/material/Skeleton';

export async function getServerSideProps(context) {
    const chapterid = context.query.pageno[0];
    const pid = context.query.pageno[1];
    const tabid = context.query.pageno[2];

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: chapterid, token: process.env.MYKEY })
    };

    const response = await fetch(`${process.env.API_URL}Openendpoint/GetCourseChapterdata`, requestOptions);
    const ChapterD = await response.json();


    return {
        props: { chapterid, pid, tabid,ChapterD },
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

function DashboardCrypto({ chapterid, pid, tabid,ChapterD }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Showvalue, setShowvalue] = useState(tabid);
    const [isLoading, setisLoading] = useState(true);
    const [ChData, setChData] = useState({});
    const handleChange = (e) => {
        setShowvalue(e);
       
    };
    useEffect(() => {
        if(ChapterD.ChapterData){
            setChData(ChapterD.ChapterData[0])
            setisLoading(false)
        }
    }, [router.query])

    return (
        <>
            <Head>
                <title>{ChData.title}: {pid}</title>
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
                            {!isLoading ?
                                <div>
                                    <span>Course Chapters : {ChData.title}</span>
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
                                <Button variant={Showvalue == 1 ? 'contained' : 'outlined'} startIcon={<FiAirplay />}
                                    size="small"
                                    onClick={() => handleChange(1)}
                                >
                                    Videos lectures
                                </Button>
                            </div>
                            <div className={MYS.Topbtnboxbtn}>
                                <Button variant={Showvalue == 2 ? 'contained' : 'outlined'} startIcon={<FiRadio />}
                                    size="small"
                                    onClick={() => handleChange(2)}
                                >
                                    Live lectures
                                </Button>
                            </div>
                            <div className={MYS.Topbtnboxbtn}>
                                <Button variant={Showvalue == 3 ? 'contained' : 'outlined'} startIcon={<FiList />}
                                    size="small"
                                    onClick={() => handleChange(3)}
                                >
                                    Notes
                                </Button>
                            </div>

                        </div>


                    </div>

                </div>
                <div className={MYS.stickyContainerBox}>
                    <div className={MYS.stickyContainer2}>
                        <div>
                            {Showvalue == 1 &&
                                <Videolistbychapterid chapterid={chapterid} pid={pid} />

                            }
                            {Showvalue == 2 &&
                                <Livelistbychapterid chapterid={chapterid} pid={pid} />

                            }
                            {Showvalue == 3 &&
                                <Pdflistbychapterid chapterid={chapterid} pid={pid} />

                            }



                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
