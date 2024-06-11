import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'

import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import Uploadimg from '../../Comp/Uploadimg'
import Image from 'next/image'

import LoadingButton from '@mui/lab/LoadingButton';
import { LuChevronRight } from "react-icons/lu";


import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Badge from '@mui/material/Badge';


import * as animationData from '/Data/Lottie/webappanima.json'

import {

    TextField,

    styled,

} from '@mui/material';


const CustmizeWeb = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState({});
    const [Loading, setLoading] = useState(true);
    const [Btnloading, setBtnloading] = useState(false);
    const [WebName, setWebName] = useState('');
    const [ShortDesc, setShortDesc] = useState('');
    const [LongDesc, setLongDesc] = useState('');
    const [Logo, setLogo] = useState('');

    const onImageUpload = (Filedata) => {
        if (Filedata) {
            alert('Image Upload Successfully, please click update button to save changes');
            setLogo(Filedata.postData.fileName)
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    let sendUM = {}
    const GetData = async () => {

        const data = await fetch("/api/V3/Admin/GetWebData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed.ReqData.done) {
                    setRetdata(parsed.ReqData.done)
                    setWebName(parsed.ReqData.done.WebData.WebName)
                    setShortDesc(parsed.ReqData.done.WebData.ShortDesc)
                    setLongDesc(parsed.ReqData.done.WebData.LongDesc)
                    setLogo(parsed.ReqData.done.WebData.Logo)

                    setLoading(false)

                }
            })
    }
    useEffect(() => {
        GetData()
    }, [router.query])



    const UpdateWeb = async (e) => {
        e.preventDefault();
        let FinalFileName = Logo

        if (WebName !== '' && ShortDesc !== '' && LongDesc !== '' && FinalFileName !== null) {
            setBtnloading(true)
            const sendUM = {

                WebName: WebName,
                Logo: FinalFileName,
                ShortDesc: ShortDesc,
                LongDesc: LongDesc,
            }
            const data = await fetch("/api/V3/Admin/UpdateWebsiteData", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setBtnloading(false);
                    if (parsed.ReqData.done) {
                        alert(parsed.ReqData.done)
                        router.push('/admin')

                    } else {
                        alert('something Went wrong')
                    }
                })

        } else {
            alert('All Fields are required')
        }


    }


    return (
        <div>

            <div className={MYS.SettingsItemBox}>
                <div className={MYS.SettingsItem}>
                    <div className={MYS.SettingsItemA}>
                        <div className={MYS.STitle}>
                            <span>Website Details and Logo</span>
                            <small>Manage Website Details and logo</small>

                        </div>

                        <div>
                            <form onSubmit={UpdateWeb} >
                                <div className={MYS.inputlogin}>
                                    <TextField
                                        required
                                        label="Website Title"
                                        fullWidth
                                        value={WebName}
                                        onInput={e => setWebName(e.target.value)}

                                    />
                                </div>
                                <div className={MYS.inputlogin}>
                                    <TextField
                                        required
                                        label="Short Description"
                                        fullWidth
                                        value={ShortDesc}

                                        onInput={e => setShortDesc(e.target.value)}

                                    />
                                </div>
                                <div className={MYS.inputlogin}>
                                    <TextField
                                        required
                                        label="Full Description"
                                        fullWidth
                                        value={LongDesc}
                                        onInput={e => setLongDesc(e.target.value)}

                                    />
                                </div>

                                <div style={{ minHeight: 25 }}></div>
                                <div className={MYS.featuresimagebox}>
                                    <Uploadimg onImageUpload={onImageUpload} Title={'Change Website Logo'} />
                                </div>
                                <input type="hidden" value={Logo} id="FinalFileName" />

                                <div style={{ minHeight: 25 }}></div>
                                <LoadingButton

                                    onClick={UpdateWeb}
                                    endIcon={<LuChevronRight />}
                                    loading={Btnloading}
                                    loadingPosition="end"
                                    variant="contained"
                                >
                                    <span>Update Details</span>
                                </LoadingButton>

                            </form>



                        </div>



                    </div>
                    <div className={MYS.SettingsItemB}>

                        <div className={MYS.featuresimageboxA}>
                            <img
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${Logo}`}
                                width={'100%'}

                                layout='responsive'
                                alt='img'
                                id="Fimage"

                            />

                        </div>

                    </div>


                </div>
            </div>

        </div>
    )
}

export default CustmizeWeb
