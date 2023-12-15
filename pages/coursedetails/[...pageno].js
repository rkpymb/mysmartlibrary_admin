import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from 'context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from 'Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";
import { FiTrash, FiChevronRight } from "react-icons/fi";
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import EditCoursemodal from '../components/Edit/EditCoursemodal'
import AddCourseEducator from '../components/Add/AddCourseEducator'
import Avatar from '@mui/material/Avatar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    IconButton,

    styled
} from '@mui/material';
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'


export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    return {
        props: { DataSlug },
    }

}
function DashboardCrypto({ DataSlug }) {
    
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Edulist, setEdulist] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [EduLoading, setEduLoading] = useState(true);
    const [CourseMainData, setCourseMainData] = useState({});
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

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

    const GetData = async () => {

        const sendUM = { JwtToken: Contextdata.JwtToken, slug: DataSlug }
        const data = await fetch("/api/V3/Data/GetCourseData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed) {
                    if (parsed.ReqData.CourseData.length == 1) {
                        console.log(parsed.ReqData.CourseData[0])
                        setCourseMainData(parsed.ReqData.CourseData[0])
                        GetEduList()
                        setLoading(false)
                    }


                }
            })
    }

    const GetEduList = async () => {

        const sendUM = { JwtToken: Contextdata.JwtToken, Coursepid: DataSlug }
        const data = await fetch("/api/V3/List/EDUbyCourse", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed) {
                    if (parsed.ReqD.Edulist) {
                        setEdulist(parsed.ReqD.Edulist)
                        setEduLoading(false);
                    }

                }
            })
    }

    useEffect(() => {
        GetData()

    }, [router.query])


    const RemoveEducator = async (e) => {
        let text = "Do you really want to remove ?";
        if (confirm(text) == true) {
            const sendUM = { JwtToken: Contextdata.JwtToken, id: e }
            const data = await fetch("/api/V3/Delete/RemoveEduFromCourse", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed) {
                        console.log(parsed)
                        if (parsed.ReqData.done) {
                            notify(parsed.ReqData.done)
                            router.push(`/coursedetails/${DataSlug}`)
                        } else {
                            alert('Something went wrong')
                        }

                    }
                })
        }

    }


    return (
        <>

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
            <Head>
                <title>Academics</title>
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

                            {!Loading ?
                                <div>
                                    <span>Course : <span>{CourseMainData.title}</span></span>
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>


                            }
                        </div>
                    </div>

                    <div className={MYS.TitleWithBackHeaderB}>
                        {!Loading ?
                            <div className={MYS.Topbtnbox}>
                                <div style={{ minWidth: '0px' }}></div>
                                <div className={MYS.Topbtnboxbtn}>

                                    <EditCoursemodal CourseMainData={CourseMainData} />
                                </div>
                                <div className={MYS.Topbtnboxbtn}>
                                    <AddCourseEducator CourseMainData={CourseMainData} />
                                </div>
                                <div style={{ minWidth: '0px' }}></div>
                                <div className={MYS.Topbtnboxbtn}>
                                    <Button
                                        onClick={() => router.push(`/CourseChapters/${CourseMainData.pid}`)}
                                        size="small"
                                        variant="outlined"
                                        endIcon={<FiChevronRight fontSize="small" />}
                                    >
                                        Course Chapters
                                    </Button>
                                </div>
                                <div className={MYS.Topbtnboxbtn}>
                                    <Button
                                        onClick={() => router.push(`/CourseTestSeries/${CourseMainData.pid}`)}
                                        size="small"
                                        variant="outlined"
                                        endIcon={<FiChevronRight fontSize="small" />}
                                    >
                                        Exam and Test Series
                                    </Button>
                                </div>
                            </div>
                            : <div>
                                <Skeleton variant="text" sx={{ fontSize: '3rem' }} width={100} animation="wave" />

                            </div>


                        }

                    </div>
                </div>
                <div className={MYS.stickyContainerBox} >
                    <div className={MYS.stickyContainer}>
                        {!Loading &&
                            <div>
                                <div className={MYS.coursedetailsBox1}>
                                    <div className={MYS.coursedetailsBox1A}>
                                        <img
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${CourseMainData.img}`}

                                            alt="image"
                                            width={'100%'}
                                            layout="responsive"
                                            placeholder='blur'

                                            quality={100}
                                            blurDataURL={blurredImageData}

                                        />

                                    </div>
                                    <div className={MYS.coursedetailsBox1B}>
                                        <div className={MYS.CourseCounteritemGrid}>
                                            <div className={MYS.CourseCounteritem}>
                                                <span>534+</span>
                                                <small>Enrolled</small>
                                            </div>
                                            <div className={MYS.CourseCounteritem}>
                                                <span>534+</span>
                                                <small>Sales</small>
                                            </div>
                                            <div className={MYS.CourseCounteritem}>
                                                <span>534+</span>
                                                <small>Discounts</small>
                                            </div>
                                            <div className={MYS.CourseCounteritem}>
                                                <span>534+</span>
                                                <small>Live Classes</small>
                                            </div>
                                            <div className={MYS.CourseCounteritem}>
                                                <span>534+</span>
                                                <small>Video Lecturs</small>
                                            </div>
                                            <div className={MYS.CourseCounteritem}>
                                                <span>534+</span>
                                                <small>Exams & Test</small>
                                            </div>
                                            <div className={MYS.CourseCounteritem}>
                                                <span>534+</span>
                                                <small>Notes</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={MYS.Courseoverviewbox}>
                                    <div>
                                        <h2>{CourseMainData.title}</h2>
                                        <div style={{ height: '6px' }}></div>
                                        <div>
                                            <span>Main Price : ₹{CourseMainData.mprice}</span>
                                        </div>
                                        <div>
                                            <span>Sale Price : ₹{CourseMainData.sprice}</span>
                                        </div>
                                        <div>
                                            <span>Validity : {CourseMainData.duration} days</span>
                                        </div>
                                        <div>
                                            <span>Type : {CourseMainData.isFree ? <span>Free</span>
                                                : <span>Paid</span>
                                            } </span>
                                        </div>
                                    </div>
                                    <div><h2>Course Description</h2></div>
                                    <div dangerouslySetInnerHTML={{ __html: CourseMainData.details }} />
                                </div>
                                {!EduLoading &&
                                    <div className={MYS.Courseoverviewbox}>
                                        <div><h2>Educators in this Course ({Edulist.length})</h2></div>
                                        <div className={MYS.EducatorCoursegrid}>
                                            {Edulist.map((item) => {
                                                return <div key={item._id} className={MYS.EducatorCoursegridItem}>
                                                    <div style={{ width: '50px' }}>
                                                        <Avatar alt={item.user.name} src="/static/images/avatar/1.jpg" />
                                                    </div>
                                                    <div>
                                                        <span>{item.user.name}</span>
                                                    </div>
                                                    <div>
                                                        <small>@{item.user.username.n}</small>
                                                    </div>
                                                    <div style={{ height: '10px' }}></div>
                                                    <Button
                                                        onClick={() => RemoveEducator(item.user.itemid)}
                                                        size="small"
                                                        variant="outlined"
                                                        endIcon={<FiTrash fontSize="small" />}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>


                                            }

                                            )}

                                        </div>
                                    </div>
                                }


                            </div>





                        }


                    </div>
                </div>
            </div >


        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
