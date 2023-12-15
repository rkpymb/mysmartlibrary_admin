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
import Addpdfnotes from '../Add/Addpdfnotes'
import { FiEye, FiTrash } from "react-icons/fi";
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
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

function RecentOrders({ chapterid, pid }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const [Btnloading, setBtnloading] = useState(false);


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
            const data = await fetch("/api/V3/List/Pdflistbychapterid", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    setRetdata(parsed.ReqD.Notes)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    const DeleteVideo = async (e) => {
        let text = "Do you really want to delete ?";
        if (confirm(text) == true) {
            setBtnloading(true)
            const sendUM = {
                JwtToken: Contextdata.JwtToken,
                id: e
            }
            const data = await fetch("/api/V3/Delete/Deletepdfnotes", {
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
                        const updatedArray = Retdata.filter((item) => item._id !== e);
                        setRetdata(updatedArray);


                    } else {
                        alert(parsed.ReqData.message)
                    }



                })
        }



    };

    return (<>
        {!isLoading &&
            <div>
                <div style={{ height: '20px' }}></div>
                <div className={MYS.TablevideotitleBox}>
                    <div className={MYS.TablevideotitleBoxA}>

                        Live Lectures ({Retdata.length})
                    </div>
                    <div className={MYS.TablevideotitleBoxB}>
                        <Addpdfnotes chapterid={chapterid} pid={pid} />

                    </div>

                </div>
                <div style={{ height: '10px' }}></div>
            </div>
        }
        <div >
            <TableContainer >
                <Table aria-label="sticky table">


                    {!isLoading &&

                        <TableBody>

                            {Retdata.map((item, index) => {
                                return <TableRow hover key={index}>

                                    <TableCell>
                                        <div className={MYS.videothumbBox}>

                                            <div className={MYS.videothumbBoxA}>
                                                <div className={MYS.videothumbimg}>
                                                    <Image
                                                        src={`/pdf-file-format.png`}

                                                        alt="image"

                                                        placeholder='blur'
                                                        width={50}
                                                        height={50}
                                                        quality={100}
                                                        blurDataURL={blurredImageData}

                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: 500 }}> {item.title}</span>

                                            </div>
                                        </div>


                                    </TableCell>

                                    <TableCell align="left">
                                        <div


                                            style={{ overflow: "hidden", textOverflow: "ellipsis", width: '20rem' }}
                                        >
                                            <div>
                                                <small>Added on : {item.date}</small>
                                            </div>

                                        </div>

                                    </TableCell>
                                    <TableCell align="left">
                                        <div>
                                            <small>{item.isActive &&
                                                <span style={{ color: 'blue' }}>Public</span>

                                            }

                                                {!item.isActive &&
                                                    <span style={{ color: 'red' }}>Private</span>

                                                }
                                            </small>
                                        </div>

                                    </TableCell>
                                    <TableCell>

                                        <IconButton aria-label="cart" onClick={() =>
                                            DeleteVideo(item._id)
                                        }>
                                            <StyledBadge color="secondary" >
                                                <FiTrash size={15} />
                                            </StyledBadge>
                                        </IconButton>

                                        <IconButton aria-label="cart" onClick={() => router.push(`/ViewPdf/${item.file}/${item.title}`)}>
                                            <StyledBadge color="secondary" >
                                                <FiEye size={15} />
                                            </StyledBadge>
                                        </IconButton>


                                    </TableCell>


                                </TableRow>
                            }

                            )}
                        </TableBody>

                    }



                </Table>
            </TableContainer>
        </div>

    </>
    );
}

export default RecentOrders;
