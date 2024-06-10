import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import Badge from '@mui/material/Badge';

import CheckloginContext from '/context/auth/CheckloginContext'

import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config'

import MYS from '/Styles/mystyle.module.css'
import IconButton from '@mui/material/IconButton';
import { LuPlus, LuX, LuPencilLine, LuTrash2 } from "react-icons/lu";
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter, useParams } from 'next/router'



import {
    styled,

    TextField,
    useTheme,
} from '@mui/material';
import { SellTwoTone } from '@mui/icons-material';
const UploadFiles = ({ onImageUpload }) => {
    const router = useRouter()

    const Contextdata = useContext(CheckloginContext)
    const [uploadedFile, setUploadedFile] = useState(false);
    const [ErorrUploading, setErorrUploading] = useState(false);
    const [ErorrUploadingMsg, setErorrUploadingMsg] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [SelectFile, setSelectFile] = useState(false);


    const [FileUpldedFinal, setFileUpldedFinal] = useState('');
    const [FileTypeNow, setFileTypeNow] = useState('');

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const [progress, setProgress] = React.useState(0);


    const progressRef = React.useRef(() => { });
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);

            } else {
                const diff = Math.random() * 10;

                setProgress(progress + diff);

            }
        };
    });





    const ResetUpload = async (e) => {
        setUploadProgress(0);
        setSelectFile(false)
       

    }

    useEffect(() => {

        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);
    React.useEffect(() => {
        setProgress(0);
        setSelectFile(false)
        setFileUpldedFinal('/img/upload.png')

    }, [router.query]);


    const onDrop = async (acceptedFiles) => {
        let fileFormat = acceptedFiles[0].type;

        if (fileFormat.startsWith('image/')) {

            setSelectFile(true)
            setUploadProgress(0)
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
            try {

                const url = MediaFilesUrl + 'admin/imageupload'
                const response = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'folderName': 'feedpost',
                        Authorization: `Bearer ${Contextdata.UserJwtToken}`,

                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setUploadProgress(progress);
                    },
                });

                if (response.data.fileName) {

                    const Filedata = {
                        postData: response.data,
                        postType: fileFormat,

                    }
                    onImageUpload(Filedata);
                    setUploadedFiles([Filedata])
                    setUploadedFile(true);
                    
                } else {
                    setErorrUploading(true)
                    setErorrUploadingMsg('Something went wrong')
                }

            } catch (error) {
                console.error('File upload error:', error);
            }

        } else {
            alert('Selected file is of an unsupported format.');
        }

    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const DeleteMediaItem = async (DeleteItem, index) => {
        console.log(DeleteItem, index);


        const updatedFiles = uploadedFiles.filter((item, idx) => {

            return !(item.postData === DeleteItem.postData && idx === index);
        });


        setUploadedFiles(updatedFiles);
        onImageUpload(null);
    };

    return (
        <div className={MYS.FileUploadingbox}>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <div className={MYS.Choosefileflex}>

                    <IconButton
                        aria-label="toggle password visibility"
                        style={{ width: 40, height: 40 }}
                    >
                        <img src='/img/upload.png' width={'100%'} />
                    </IconButton>
                    <span className={MYS.ChoosefileText}>Upload Image</span>

                </div>

            </div>

            <div className={MYS.UploadteUploadDetalisBox}>
                {uploadProgress > 0 &&
                    <div className={MYS.Uploadingbox}>

                        {!uploadedFile ?
                            <div>
                                <LinearProgress variant="buffer" value={uploadProgress} valueBuffer={uploadProgress} />
                                <div className={MYS.UploadingboxText}>  Uploading {uploadProgress.toFixed(2)}%</div>
                            </div> :
                            null
                        }


                    </div>
                }

                {uploadedFile &&
                
                <div className={MYS.FileGrid}>
                {uploadedFiles.map((item, index) => {
                    return (
                        <div className={MYS.FileGridItem}>
                            {item.postType.startsWith('image/') &&
                                <div className={MYS.FileGridItemimg}>
                                    <Image
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.postData.fileName}`}
                                        alt=""
                                        fill
                                        height={'100%'}
                                        width={'100%'}
                                        blurDataURL={blurredImageData}
                                        placeholder='blur'
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            }
                           
                          
                            <div className={MYS.FileGridItemOverlay}>
                                <IconButton
                                    onClick={() => DeleteMediaItem(item, index)}
                                    aria-label="toggle password visibility"
                                    style={{ width: 40, height: 40, color: 'white' }}
                                >
                                    <LuX size={20} />
                                </IconButton>
                            </div>
                        </div>


                    );
                })}
            </div>
                }
                {ErorrUploading &&
                    <div>{ErorrUploadingMsg}</div>
                }


            </div>


        </div>
    );
};

const dropzoneStyles = {

    padding: '2px',
    textAlign: 'center',
    borderRadius: '50%'
};

export default UploadFiles;
