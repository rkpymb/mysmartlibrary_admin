import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';

import { useRouter } from 'next/router'
import Link from 'next/link';
import MYS from '../../../Styles/mystyle.module.css'
import Avatar from '@mui/material/Avatar';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Badge from '@mui/material/Badge';
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import { LuChevronRight } from "react-icons/lu";
import Addvideolecture from '../Add/Addvideolecture'
import { FiClock, FiGlobe, FiLock, FiRadio, FiEye } from "react-icons/fi";


import Image from 'next/image';
import {
    Tooltip,
    IconButton,
    Divider,
    Box,
    FormControl,
    InputLabel,

    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    styled,
    MenuItem,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';

function RecentOrders({ chapterid, pid }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        const handleSubmit = async () => {
            const sendUM = { JwtToken: Contextdata.JwtToken, chapterid: chapterid, pid: pid }
            const data = await fetch("/api/V3/List/Videolistbychapterid", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    setRetdata(parsed.ReqD.VideosList)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    return (<>
        {!isLoading &&
            <div>
                <div style={{ height: '20px' }}></div>
                <div className={MYS.TablevideotitleBox}>
                    <div className={MYS.TablevideotitleBoxA}>

                        Video Lectures ({Retdata.length})
                    </div>
                    <div className={MYS.TablevideotitleBoxB}>
                        <Addvideolecture chapterid={chapterid} pid={pid} />

                    </div>

                </div>
                <div style={{ height: '10px' }}></div>
            </div>
        }
        {!isLoading &&
            <div>
                {Retdata.map((item, index) => {
                    return <div key={index} className={MYS.VideolistboxItem} onClick={() => router.push(`/VideoDetails/${item._id}`)}>
                        <div className={MYS.VideolistboxItemA}>

                            <div className={MYS.Videothumbbox}>
                                <div className={MYS.videothumbimg}>
                                    <Image
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.thumbnail}`}

                                        alt="image"
                                        layout="responsive"
                                        placeholder='blur'
                                        width={'100%'}
                                        height={70}
                                        quality={50}
                                        blurDataURL={blurredImageData}

                                    />
                                </div>
                            </div>

                            <div className={MYS.VideoContentbox}>
                                <div style={{ height: '10px' }}></div>
                                <span className={MYS.Vtitle}>{item.title}</span>
                                <div style={{ height: '10px' }}></div>

                                <div className={MYS.VideoStickListBox}>
                                    <div className={MYS.VideoStickList}>
                                        <div className={MYS.VideoStickListA}>
                                            <FiClock />
                                        </div>
                                        <div className={MYS.VideoStickListB}>
                                            <small>{item.date}, {item.time}</small>
                                        </div>
                                    </div>
                                    <div style={{ width: '10px' }}></div>
                                    {item.isActive == 1 &&
                                        <div className={MYS.VideoStickList}>
                                            <div className={MYS.VideoStickListA}>
                                                <FiRadio />
                                            </div>
                                            <div className={MYS.VideoStickListB}>
                                                <small>upcoming</small>
                                            </div>
                                        </div>

                                    }
                                    {item.isActive == 2 &&
                                        <div className={MYS.VideoStickList}>
                                            <div className={MYS.VideoStickListA}>
                                                <FiGlobe />
                                            </div>
                                            <div className={MYS.VideoStickListB}>
                                                <small>Public</small>
                                            </div>
                                        </div>

                                    }

                                    {item.isActive == 3 &&
                                        <div className={MYS.VideoStickList}>
                                            <div className={MYS.VideoStickListA}>
                                                <FiLock />
                                            </div>
                                            <div className={MYS.VideoStickListB}>
                                                <small>Private</small>
                                            </div>
                                        </div>

                                    }

                                </div>


                            </div>
                        </div>
                        <div className={MYS.OnlyDesktop}>
                        <div className={MYS.VideolistboxItemB}>
                            <IconButton aria-label="cart" >
                                <StyledBadge color="secondary" >
                                    <LuChevronRight />
                                </StyledBadge>
                            </IconButton>
                        </div>

                        </div>
                        
                    </div>
                }

                )}
            </div>

        }

    </>
    );
}

export default RecentOrders;
