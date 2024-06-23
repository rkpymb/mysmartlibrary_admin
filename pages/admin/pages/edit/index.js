import React, { useState, useEffect, useContext } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css';

import Badge from '@mui/material/Badge';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

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

function DashboardCrypto() {
    const router = useRouter();
    const { PageSlug } = router.query;

    const [isLoading, setIsLoading] = useState(true);
    const [isActive, setIsActive] = useState(3);
    const [Btnloading, setBtnloading] = useState(false);
    const [PageData, setPageData] = useState('');
    const [PageTitle, setPageTitle] = useState('');
   

    const GetData = async () => {
      
        if (!PageSlug) return;

        const sendUM = { PageSlug: PageSlug };

        try {
            const data = await fetch("/api/V3/Admin/WebPage/get_page", {
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

            if (parsed.ReqD && parsed.ReqD.Pdata) {
                setPageTitle(parsed.ReqD.Pdata.PageTitle);
                setPageData(parsed.ReqD.Pdata.PageData);
                setIsActive(parsed.ReqD.Pdata.isActive);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditorChange = (content) => {
        setPageData(content);
    };

    const SavePage = async (e) => {
        e.preventDefault();

        if (PageTitle !== '' && PageData !== '') {
            setBtnloading(true);
            try {
                const payload = {
                    PageTitle: PageTitle,
                    PageData: PageData,
                    isActive: isActive,
                    PageSlug: PageSlug
                };

                const response = await fetch("/api/V3/Admin/WebPage/update_page", {
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
                    alert('Page Updated successfully!');
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

        if(PageSlug){
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

    const handleChangeTSStatus = (event) => {
        setIsActive(event.target.value);
    };

    return (
        <>
            <TitleNav Title={`Edit Page : ${PageTitle}`} />

            <div className={MYS.Pagebox}>
                <form onSubmit={SavePage}>
                    {!isLoading &&
                        <div className={MYS.PostTextBox}>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    required
                                    label="Page Title"
                                    fullWidth
                                    value={PageTitle}
                                    onInput={e => setPageTitle(e.target.value)}
                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <ReactQuill
                                    theme="snow"
                                    value={PageData}
                                    placeholder='write your post here ...'
                                    onChange={handleEditorChange}
                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={isActive}
                                        label="Status"
                                        onChange={handleChangeTSStatus}
                                    >
                                        <MenuItem value={3}>Public</MenuItem>
                                        <MenuItem value={2}>Upcoming</MenuItem>
                                        <MenuItem value={1}>Private</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{ height: '20px' }}></div>
                            <div className={MYS.Loginbtnbox}>
                                <LoadingButton
                                    type='submit'
                                    endIcon={<LuChevronRight />}
                                    loading={Btnloading}
                                    disabled={Btnloading}
                                    loadingPosition="end"
                                    variant='contained'
                                >
                                    <span>Update Page</span>
                                </LoadingButton>
                                <div style={{ height: '20px' }}></div>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
