import { useState, useEffect, useContext } from 'react';

import { LuChevronRight } from "react-icons/lu";
import LoadingButton from '@mui/lab/LoadingButton';
import NavBar from '../Comp/NavBar'
import MYS from '/Styles/toutorials.module.css'
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '/context/auth/CheckloginContext'

import Uploadimg from '../../admin/Comp/Uploadimg'

import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


import {
    IconButton,
    Card,
    Box,
    styled,
    FormControl,
} from '@mui/material';

import Head from 'next/head';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField';

import { useRouter, useParams } from 'next/router'
const HeaderWrapper = styled(Card)(
    ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [isLoading, setIsLoading] = useState(true);


    const [Content, setContent] = useState('');

    const [Title, setTitle] = useState('');
    const [isActive, setIsActive] = useState(true);

    const [Btnloading, setBtnloading] = useState(false);
    const [UploadedImage, setUploadedImage] = useState(null);


    const handleEditorChange = (content) => {
        setContent(content);
    };
   
    const SavePage = async (e) => {
        e.preventDefault();

   
        if (Title !== '' && Content !== '' && UploadedImage !== null) {
            setBtnloading(true)
            try {
                console.log(Title);

                // Prepare the payload to send to the server
                const payload = {
                    Title: Title,
                    Content: Content,
                    isActive: isActive,
                    Image: UploadedImage
                };

                // Make the API request to add the page
                const response = await fetch("/api/Main/tutorials/add_tutorials", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                // Parse the response
                const result = await response.json();
                console.log(result);

                // Check if the operation was successful
                if (result.ReqD && result.ReqD.done) {
                    alert('Post Added successfully!');
                 
                    window.location.reload();
                } else {
                    alert(result.ReqD.error)
                    setBtnloading(false)

                }
            } catch (error) {
                setBtnloading(false)
                // Log the error and inform the user
                console.error('Error fetching data:', error);
                alert('An error occurred while saving the page. Please try again later.');
            }
        } else {
            // Inform the user if any field is empty
            alert('All fields are required!');
        }
    };

    useEffect(() => {
        if (Contextdata.IsLogin) {
            setIsLoading(false)
        }

    }, [Contextdata.Data && Contextdata.IsLogin]);



    const handleChangeTSStatus = (event) => {
        setIsActive(event.target.value);
    };


    const onImageUpload = (Filedata) => {
        if (Filedata) {

            setUploadedImage(Filedata.postData.fileName)
        } else {
            setUploadedImage(null)
        }
    };
    return (
        <OverviewWrapper>
            <Head>
                <title>Create Tutorial</title>
            </Head>
            <NavBar />
            <div className={MYS.ToutorialBox}>
                {isLoading ? null :
                    <div className={MYS.Pagebox}>
                        <div className={MYS.PageboxTitle}>
                            <span>Create New Tutorial</span>
                            <small>Publish a tutorial for users</small>

                        </div>
                        <form onSubmit={SavePage}>
                            {!isLoading &&
                                <div className={MYS.PostTextBox}>
                                    <div className={MYS.inputlogin}>
                                        <TextField
                                            required
                                            label="Page Title"
                                            fullWidth
                                            value={Title}
                                            onInput={e => setTitle(e.target.value)}

                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <ReactQuill
                                            theme="snow" // You can change the theme as per your preference
                                            value={Content}
                                            placeholder='write your post here ...'
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                    <div className={MYS.inputlogin}>
                                        <FormControl fullWidth>
                                            <InputLabel >Status</InputLabel>
                                            <Select

                                                value={isActive}
                                                label="Status"
                                                onChange={handleChangeTSStatus}
                                            >
                                                <MenuItem value={true}>Public</MenuItem>

                                                <MenuItem value={false}>Private</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div style={{ height: '20px' }}></div>
                                    <div className={MYS.featuresimagebox}>
                                        <Uploadimg onImageUpload={onImageUpload} Title={'Upload Feature Image'} />
                                    </div>
                                    <div style={{ height: '20px' }}></div>
                                    <div className={MYS.Loginbtnbox}>
                                        <LoadingButton
                                            type='submit'
                                            onClick={SavePage}
                                            endIcon={<LuChevronRight />}

                                            loading={Btnloading}
                                            desabled={Btnloading}
                                            loadingPosition="end"
                                            variant='contained'
                                        >
                                            <span>Publish Page</span>
                                        </LoadingButton>

                                        <div style={{ height: '20px' }}></div>
                                    </div>


                                </div>
                            }

                        </form>
                    </div>
                }


            </div>

        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
