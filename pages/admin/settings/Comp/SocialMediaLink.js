import { useRouter, useParams } from 'next/router'
import React, { useState, useEffect, useContext } from 'react';

import Image from 'next/image'
import MYS from '/Styles/mystyle.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { LuArrowRight } from "react-icons/lu";

import {
    Card,
    TextField,
    styled
} from '@mui/material';
const SocialMediaLink = ({ SData }) => {
    const router = useRouter()
    const [Facbook, setFacbook] = useState(null);
    const [Instagram, setInstagram] = useState(null);
    const [YouTube, setYouTube] = useState(null);
    const [Xcom, setXcom] = useState(null);
    const [LinkedIn, setLinkedIn] = useState(null);
    const [BtnLoading, setBtnLoading] = useState(false);
    const [SettingData, setSettingData] = useState(null);
    const [Sid, setSid] = useState(null);
    const [Skey, setSkey] = useState('SocialMediaLink');

    useEffect(() => {

        setSid(SData._id)
        if (SData.SettingsData.SocialMediaLink) {
            setFacbook(SData.SettingsData.SocialMediaLink.Facbook)
            setInstagram(SData.SettingsData.SocialMediaLink.Instagram)
            setXcom(SData.SettingsData.SocialMediaLink.Xcom)
            setYouTube(SData.SettingsData.SocialMediaLink.YouTube)
            setLinkedIn(SData.SettingsData.SocialMediaLink.LinkedIn)
        }


    }, [router.query])
    useEffect(() => {
        const DataNow = {

            Facbook: Facbook,
            Instagram: Instagram,
            Xcom: Xcom,
            YouTube: YouTube,
            LinkedIn: LinkedIn


        }
        setSettingData(DataNow)


    }, [Facbook, Instagram, Xcom,YouTube,LinkedIn])



    const UpdateData = async (e) => {
        e.preventDefault();
        if (Sid !== null && Skey !== null && SettingData !== null) {
            setBtnLoading(true)
            const sendUM = {
                Skey: Skey,
                Sid: Sid,
                SettingData: SettingData
            }
            const data = await fetch("/api/V3/Admin/Settings/UpdateSettings", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqD.Settings) {
                        setTimeout(function () {
                            alert('Settings updated successfully')
                            setBtnLoading(false)

                        }, 2000);
                    } else {
                        setBtnLoading(false)

                        alert('Something went wrong')
                    }
                })
        } else {
            alert('Please Enter All Fields')
        }

    }



    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div className={MYS.SettingsItemBox}>
            <div className={MYS.SettingsItem}>
                <div className={MYS.SettingsItemA}>
                    <div className={MYS.STitle}>
                        <span>Social Media Links</span>
                        <small>Add Your Social Media Links Here</small>

                    </div>

                    <div>
                        <form onSubmit={UpdateData} >

                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={Facbook}
                                    onInput={e => setFacbook(e.target.value)}
                                    required
                                    label="Facbook"

                                />

                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={Xcom}
                                    onInput={e => setXcom(e.target.value)}
                                    required
                                    label="X (Twitter)"

                                />


                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={Instagram}
                                    onInput={e => setInstagram(e.target.value)}
                                    required
                                    label="Instagram"

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={LinkedIn}
                                    onInput={e => setLinkedIn(e.target.value)}
                                    required
                                    label="LinkedIn"

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={YouTube}
                                    onInput={e => setYouTube(e.target.value)}
                                    required
                                    label="YouTube"

                                />
                            </div>
                            <div className={MYS.inputlogin}>
                                <LoadingButton
                                    type="submit"

                                    endIcon={<LuArrowRight />}
                                    loading={BtnLoading}
                                    loadingPosition="end"
                                    variant="contained"
                                    onClick={UpdateData}
                                >
                                    <span>Update</span>
                                </LoadingButton>
                            </div>

                        </form>




                    </div>



                </div>
                <div className={MYS.SettingsItemB}>

                    <div className={MYS.PMItemAImg}>
                        <Image
                            src={`/img/social-media.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={100}
                            blurDataURL={blurredImageData}
                            objectFit='center'


                        />

                    </div>

                </div>


            </div>
        </div>
    )
}

export default SocialMediaLink
