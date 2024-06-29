import React, { useState, useEffect, useContext } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css';

import Badge from '@mui/material/Badge';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

import { FiEye, FiX, FiPlus, FiChevronRight } from "react-icons/fi";


import { LuChevronRight } from "react-icons/lu";

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

import TitleNav from '/src/components/Parts/TitleNav';

import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { IconButton, styled, FormControl } from '@mui/material';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config';

import InfiniteScroll from 'react-infinite-scroll-component';


function DashboardCrypto() {
    const router = useRouter();
    const { Enqid } = router.query;

    const [isLoading, setIsLoading] = useState(true);
    const [LoadingNotelist, setLoadingNotelist] = useState(true);

    const [Btnloading, setBtnloading] = useState(false);

    const [EnqData, setEnqData] = useState(null);
    const [NoteText, setNoteText] = useState('');
    const [AddNoteShow, setAddNoteShow] = useState(false);
    const [limit, setlimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [AllData, setAllData] = useState(0);

    const [ReqData, setReqData] = useState([]);

    const loadMoreData = () => {
        if (!isLoading) {
            setIsLoading(true);
            setTimeout(function () {
                GetData();
            }, 1000);

        }
    };


    const GetData = async () => {

        if (!Enqid) return;

        const sendUM = { Enqid: Enqid };

        try {
            const data = await fetch("/api/V3/Admin/customer_enquiries/enquiry_data", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!data.ok) {
                throw new Error('Failed to fetch data');
            }

            const parsed = await data.json();

            if (parsed.ReqD.done && parsed.ReqD.EnqData) {
                GetNoteList()
                setEnqData(parsed.ReqD.EnqData)
                setIsLoading(false);
            } else {
                alert('Something went wrong')
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const OpenAddNote = () => {
        if (AddNoteShow) {
            setAddNoteShow(false);
        } else {
            setAddNoteShow(true);
        }
    };

    const SaveNote = async (e) => {
        e.preventDefault();

        if (NoteText !== '' && Enqid !== null) {
            setBtnloading(true);
            try {
                const payload = {
                    NoteText: NoteText,
                    Enqid: Enqid
                };

                const response = await fetch("/api/V3/Admin/customer_enquiries/add_enquiry_note", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                if (result.ReqD && result.ReqD.done) {
                   
                    alert('Note Added successfully!');
                    router.push(`/admin/customer_enquiries/notes?Enqid=${Enqid}`);
                    
                } else {
                    alert('Something went wrong');
                }
                setBtnloading(false);
            } catch (error) {
                setBtnloading(false);
                console.error('Error fetching data:', error);
                alert('An error occurred while saving the page. Please try again later.');
            }
        } else {
            alert('All fields are required!');
        }
    };

    useEffect(() => {

        if (Enqid) {
            setPage(1)
            setHasMore(true)
            GetData();
        }

    }, [router.query]);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const GetNoteList = async () => {

        const sendUM = {

            page: page,
            limit: limit,
            Enqid: Enqid

        };

        try {
            const data = await fetch("/api/V3/Admin/customer_enquiries/enquiry_note_list", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!data.ok) {
                throw new Error('Failed to fetch data');
            }
            const parsed = await data.json();

            if (parsed.ReqD) {
                if (parsed.ReqD.AllData) {
                    setAllData(parsed.ReqD.AllData)
                }

                if (parsed.ReqD.DataList.length === 0) {
                    setHasMore(false);
                    setLoadingNotelist(false);

                } else {

                    if (page === 1) {
                        setReqData([])
                    }



                    setReqData(prevData => [...prevData, ...parsed.ReqD.DataList]);
                    setPage(page + 1)

                    if (parsed.ReqD.DataList.length < limit) {
                        setHasMore(false);

                    }
                    setIsLoading(false);
                }
                console.log(parsed.ReqD.DataList)

            } else {
                setHasMore(false);
            }


        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    return (
        <>

            {!isLoading &&

                <TitleNav Title={`Enquiry Notes : ${Enqid}`} />
            }


            {isLoading ?
                <div>
                    <div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                        <CircularProgress size={25} color="success" />
                    </div>
                </div> :
                <div className={MYS.EnqBox}>

                    <div className={MYS.EnqBoxA}>

                        <div className={MYS.UserItemMain}>
                            <div className={MYS.Enqstatusbox}>
                                <div className={MYS.Pmtag}>
                                    {EnqData.isActive == true ? <span>Open</span> : <span style={{ color: 'yellow' }}>Closed</span>}
                                </div>
                            </div>

                            <div className={MYS.UserItemTitle}>
                                <span>{EnqData.title}</span>
                                <small>ENQ ID : {EnqData.Enqid}</small>


                                <small>Branch Code : {EnqData.Branchcode} </small>
                                <small>Branch Name : {EnqData.Enqdata.BranchData && EnqData.Enqdata.BranchData.name} </small>
                            </div>

                            <div className={MYS.itemOrderM}>
                                <span>Customer </span>
                                <small>Name  : {EnqData.FullName}</small>
                                <small>Mobile : {EnqData.MobileNumber}</small>
                                <small>Email : {EnqData.Email}</small>
                                <small>Address : {EnqData.Address}</small>

                            </div>
                            <div className={MYS.EnqMsg}>
                                <span>Message</span>

                                <small>{EnqData.Message}</small>
                            </div>
                            <div style={{ height: '10px' }}></div>
                            <div className={MYS.UserItemTitle}>
                                <small>Last Updated : {EnqData.date} {EnqData.time}</small>
                            </div>

                        </div>

                    </div>
                    <div className={MYS.EnqBoxB}>
                        <div className={MYS.AddNoteBox}>

                            <div className={MYS.AddNoteBoxHeader}>
                                <div className={MYS.AddNoteBoxHeaderA}>
                                    <span>{AllData} Notes</span>
                                </div>
                                <div className={MYS.AddNoteBoxHeaderB}>
                                    <LoadingButton
                                        size="small"
                                        startIcon={AddNoteShow ? <FiX /> : <FiPlus />}
                                        onClick={OpenAddNote}
                                        loadingPosition="end"
                                        variant="outlined"

                                    >
                                        {AddNoteShow ? <span>Close</span> : <span>Add Note</span>}
                                    </LoadingButton>
                                </div>
                            </div>

                            {AddNoteShow &&

                                <form form onSubmit={SaveNote} className={MYS.AddNoteForm}>
                                    <div className={MYS.inputlogin}>

                                        <TextField
                                            required
                                            placeholder="Add new note..."
                                            fullWidth
                                            value={NoteText}

                                            onInput={e => setNoteText(e.target.value)}

                                        />
                                    </div>
                                    <div style={{ height: '15px' }}></div>

                                    <LoadingButton
                                        size="small"
                                        endIcon={<FiChevronRight />}
                                        loading={Btnloading}
                                        loadingPosition="end"
                                        variant="contained"
                                        onClick={SaveNote}
                                    >
                                        <span>Save note</span>
                                    </LoadingButton>

                                </form>


                            }

                            <div>
                                <InfiniteScroll
                                    dataLength={ReqData.length}
                                    next={loadMoreData}
                                    hasMore={hasMore}
                                    scrollThreshold={0.2}
                                    loader={<div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                                        <CircularProgress size={25} color="success" />
                                    </div>}
                                    endMessage={
                                        <div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                                            <b>Yay! You have seen it all 🎉</b>
                                        </div>
                                    }
                                >

                                    <div className={MYS.NoteGrid}>
                                        {ReqData.map((item, index) => {
                                            return <div hover key={index} className={MYS.Noteitem}>
                                                <div className={MYS.NoteitemText}>
                                                    {item.NoteText}
                                                </div>
                                                <div className={MYS.NoteitemFooter}>
                                                    {item.date},{item.time} | BY : {item.MoreData.Addedby.name && item.MoreData.Addedby.name}
                                                </div>
                                            </div>
                                        }

                                        )}
                                    </div>
                                </InfiniteScroll>

                            </div>

                        </div>


                    </div>


                </div>


            }


        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
