import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';

import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Link from 'next/link'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import UserCourses from '../../components/User/UserCourses'
import UserTS from '../../components/User/UserTS'
import UserOrders from '../../components/User/UserOrders'
import { LuArrowLeft } from "react-icons/lu";
import { FiUnlock, FiLock, FiChevronRight } from "react-icons/fi";
import LoadingButton from '@mui/lab/LoadingButton';
import {

    IconButton,

    styled
} from '@mui/material';
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'


export async function getServerSideProps(context) {

    const UserMobile = context.query.pageno[0];
    const UserID = context.query.pageno[1];
    return {
        props: { UserMobile, UserID },
    }

}

function DashboardCrypto({ UserMobile, UserID }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [Btnloading, setBtnloading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [TabIndex, setTabIndex] = useState(1);
    const [ProfileData, setProfileData] = useState({});


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));




    const ChangeUserStatus = async () => {
        setBtnloading(true)
        const sendUM = {
            JwtToken: Contextdata.JwtToken,
            UserID: UserID,

        }
        const data = await fetch("/api/V3/User/ChangeUserStatus", {
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
                    alert(parsed.ReqData.done)
                    router.push(`/Users/Profile/${UserMobile}/${UserID}`)
                } else {
                    alert('Something went wrong')
                }

            })
    }
    const ChangeTab = async (e) => {
        setTabIndex(e)
    }
    const GetUserData = async () => {
        const sendUM = {
            JwtToken: Contextdata.JwtToken,
            UserID: UserID,
            UserMobile: UserMobile,
        }
        const data = await fetch("/api/V3/User/GetuserProfileData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData.UserData) {
                    setProfileData(parsed.ReqData.UserData[0])
                    setIsActive(parsed.ReqData.UserData[0].isActive)
                    setIsLoading(false);
                }

            })
    }

    useEffect(() => {
        GetUserData()
    }, [router.query])
    return (
        <>
            <Head>
                <title>{ProfileData && ProfileData.name}'s Profile</title>
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
                                    <span>{ProfileData && ProfileData.name} </span>
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
                                {!isLoading ?
                                    <div>
                                        <LoadingButton
                                            size="small"
                                            onClick={ChangeUserStatus}
                                            endIcon={ProfileData.isActive ? <FiLock /> : <FiUnlock />}
                                            loading={Btnloading}
                                            loadingPosition="end"
                                            variant="outlined"

                                        >
                                            {ProfileData.isActive ? <span>Deactivate Account</span> :
                                                <span>Activate Account</span>


                                            }
                                        </LoadingButton>
                                    </div>
                                    : <div>
                                        <Skeleton variant="text" sx={{ fontSize: '3rem' }} width={50} animation="wave" />

                                    </div>


                                }

                            </div>


                        </div>


                    </div>
                </div>
                <div className={MYS.stickyContainerBox} >
                    <div className={MYS.stickyContainer}>
                        <div className={MYS.Profileboxgrid}>
                            <div className={MYS.ProfileboxgridItem}>
                                <div className={MYS.MainProfileBox}>
                                    <div className={MYS.MainProfileBoxA}>

                                        {!isLoading ?
                                            <Avatar
                                                alt={ProfileData.name}
                                                src={`${MediaFilesUrl}${MediaFilesFolder}/${ProfileData.image}`}
                                                sx={{ width: 75, height: 75 }}
                                            />
                                            : <div>
                                                <Skeleton variant="circular" animation="wave">
                                                    <Avatar sx={{ width: 75, height: 75 }} />
                                                </Skeleton>

                                            </div>


                                        }
                                    </div>

                                    <div className={MYS.MainProfileBoxB}>
                                        <span>{ProfileData.name}</span>
                                        <div>
                                            <small>{ProfileData.mobile}</small>
                                        </div>
                                        <div>
                                            <small>{ProfileData.email}</small>
                                        </div>
                                        <div>
                                            <small>joined @ {ProfileData.date}, {ProfileData.time} by {ProfileData.reg_by}</small>
                                        </div>
                                        <div>
                                            <small>Profile Status :

                                                {ProfileData.isActive ? <samll style={{ color: 'blue' }}> Active</samll> :
                                                    <small style={{ color: 'red' }}> Deactivated</small>

                                                }

                                            </small>
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className={MYS.ProfileboxgridItem}>


                            </div>

                        </div>

                        <div className={MYS.ProfileTabbox} >
                            <div className={MYS.ProfileTabboxHeader} >
                                <div className={TabIndex == 1 ? MYS.ProfileTabboxMenuItemActive : MYS.ProfileTabboxMenuItem}
                                    onClick={() => ChangeTab(1)}
                                >
                                    <span>Courses</span>
                                </div>
                                <div className={TabIndex == 2 ? MYS.ProfileTabboxMenuItemActive : MYS.ProfileTabboxMenuItem}
                                    onClick={() => ChangeTab(2)}
                                >
                                    <span>Test Series</span>
                                </div>
                                <div className={TabIndex == 3 ? MYS.ProfileTabboxMenuItemActive : MYS.ProfileTabboxMenuItem}
                                    onClick={() => ChangeTab(3)}
                                >
                                    <span>Orders</span>
                                </div>
                            </div>


                            {TabIndex == 1 &&

                                <div className={MYS.TabContentbox} >
                                    <UserCourses UserMobile={UserMobile} />
                                </div>
                            }
                            {TabIndex == 2 &&

                                <div className={MYS.TabContentbox} >
                                    <UserTS UserMobile={UserMobile} />
                                </div>
                            }
                            {TabIndex == 3 &&

                                <div className={MYS.TabContentbox} >
                                    <UserOrders UserMobile={UserMobile} />
                                </div>
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
