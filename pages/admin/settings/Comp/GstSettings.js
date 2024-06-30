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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const GstSetting = ({ SData }) => {
    const router = useRouter()
    const [GstNumber, setGstNumber] = useState(null);
   
    const [GstActive, setGstActive] = useState(false);
    const [BtnLoading, setBtnLoading] = useState(false);
    const [SettingData, setSettingData] = useState(null);
    const [Sid, setSid] = useState(null);
    const [Skey, setSkey] = useState('GstSetting');

    const [GstSlab, setGstSlab] = useState('18%');

    useEffect(() => {
        setSid(SData._id)
        if (SData.SettingsData.GstSetting) {
            setGstNumber(SData.SettingsData.GstSetting.GstNumber)
            setGstActive(SData.SettingsData.GstSetting.GstActive)
            setGstSlab(SData.SettingsData.GstSetting.GstSlab)
        }
    }, [router.query])


    useEffect(() => {
        const DataNow = {

            GstNumber: GstNumber,
            GstSlab: GstSlab,
            GstActive: GstActive,
          

        }
        setSettingData(DataNow)


    }, [GstNumber, GstSlab, GstActive])



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



    const handleChange = (event) => {
        setGstSlab(event.target.value);
      };
    

    const handleChangeStatus = (event) => {
        setGstActive(event.target.value);
      };
    

    const blurredImGstSlabData = 'data:imGstSlab/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div className={MYS.SettingsItemBox}>
            <div className={MYS.SettingsItem}>
                <div className={MYS.SettingsItemA}>
                    <div className={MYS.STitle}>
                        <span>GST Settings</span>
                        <small>Add Your Gst Details and Tax Slab</small>

                    </div>

                    <div>
                        <form onSubmit={UpdateData} >

                            <div className={MYS.inputlogin}>
                                <TextField
                                    fullWidth
                                    value={GstNumber}
                                    onInput={e => setGstNumber(e.target.value)}
                                    required
                                    label="GST Number"

                                />

                            </div>

                            <div className={MYS.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel>GST Slab</InputLabel>
                                    <Select
                                        
                                        value={GstSlab}
                                        label="GST Slab"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'5%'}>5%</MenuItem>
                                        <MenuItem value={'12%'}>12%</MenuItem>
                                        <MenuItem value={'18%'}>18%</MenuItem>
                                        <MenuItem value={'28%'}>28%</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                            <div className={MYS.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        
                                        value={GstActive}
                                        label="Status"
                                        onChange={handleChangeStatus}
                                    >
                                        <MenuItem value={true}>Enable</MenuItem>
                                        <MenuItem value={false}>Disable</MenuItem>
                                        
                                    </Select>
                                </FormControl>

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
                            src={`/img/gst.png`}
                            alt="img"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={100}
                            blurDataURL={blurredImGstSlabData}
                            objectFit='center'


                        />

                    </div>

                </div>


            </div>
        </div>
    )
}

export default GstSetting
