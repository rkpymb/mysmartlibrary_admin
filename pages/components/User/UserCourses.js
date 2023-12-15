
import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

import EditCourseSubscription from '../Edit/EditCourseSubscription'
import Image from 'next/image';



import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Badge from '@mui/material/Badge';


import {
    

    styled,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,

    TableRow,
    TableContainer,




} from '@mui/material';


const UserCourses = ({ UserMobile }) => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const GetData = async () => {

        const sendUM = { JwtToken: Contextdata.JwtToken, mobile: UserMobile }
        const data = await fetch("/api/V3/User/UserCourseslist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD)
                if (parsed.ReqD.Courses) {


                    setRetdata(parsed.ReqD.Courses)
                    setIsLoading(false)

                }
            })
    }
    useEffect(() => {


        GetData()


    }, [router.query])

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }

    ]
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Course ({Retdata.length})</TableCell>
                            <TableCell>Validity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date/Time</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    {!isLoading ?
                        <TableBody>

                            {Retdata.map((item) => {
                                return <TableRow hover key={item._id} >
                                    <TableCell>
                                        <div className={MYS.Courselistimgbox}>
                                            <div className={MYS.videothumbimg}>
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
                                            <div className={MYS.CourselistimgboxB}>
                                                <Typography
                                                    variant="body1"
                                                    fontWeight="bold"
                                                    color="text.primary"
                                                    gutterBottom
                                                    noWrap
                                                >
                                                    {item.title}
                                                </Typography>
                                                <div>
                                                    <span>Main Price : ₹{item.mprice}</span>
                                                </div>
                                                <div>
                                                    <span>Sale Price : ₹{item.sprice}</span>
                                                </div>
                                                <div>
                                                    <span>Order ID : <span className={MYS.urlitem}>{item.Orderid}</span></span>
                                                </div>
                                                <div>
                                                    <span>Type : {item.isFree ? <span>Free</span>
                                                        : <span>Paid</span>
                                                    } </span>
                                                </div>
                                            </div>


                                        </div>


                                    </TableCell>
                                    <TableCell>
                                        <div

                                        >
                                            <span> Start From : {item.validityStartDate}</span>
                                            <div><span>Ending on : {item.validityEndDate}</span></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div

                                        >
                                            {item.isActive ? <span style={{ color: '#5569ff', fontWeight: 600 }}>Active</span> : <span style={{ color: 'red' }}>Deactivated</span>}
                                            <div><span>{item.StatusText}</span></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div

                                        >
                                            <span> {item.date}</span>
                                            <div>
                                                <small> {item.time}</small>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <EditCourseSubscription SubsData={item} />
                                        
                                    </TableCell>
                                </TableRow>
                            }

                            )}
                        </TableBody>
                        : <TableBody>
                            {Dummydta.map((item, index) => {
                                return <TableRow hover key={index}>
                                    <TableCell>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ maxWidth: '50px' }}>
                                                <Skeleton variant="circular">
                                                    <Avatar />
                                                </Skeleton>

                                            </div>
                                            <div style={{ marginLeft: '5px', maxWidth: '120px' }}>
                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />

                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />


                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                    </TableCell>
                                    <TableCell align="right">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={100} animation="wave" />
                                        </div>

                                    </TableCell>


                                </TableRow>
                            }

                            )}
                        </TableBody>
                    }


                </Table>
            </TableContainer>
        </div>
    )
}

export default UserCourses
