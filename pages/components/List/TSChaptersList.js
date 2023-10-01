import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';

import { useRouter } from 'next/router'
import Link from 'next/link';

import EditTSChaptersmodal from '../Edit/EditTSChaptersmodal'

import MYS from '../../../Styles/mystyle.module.css'

import Button from '@mui/material/Button';

import ListIcon from '@mui/icons-material/List';
import {
   
    useTheme,
    CardHeader
} from '@mui/material';

function RecentOrders({ tsid }) {

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {

        const handleSubmit = async () => {
            const sendUM = { tsid: tsid }
            const data = await fetch("/api/V3/List/TSChaptersList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD.AllChapters)
                    setRetdata(parsed.ReqD.AllChapters)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    return (

        <>
            <Card>
                {!isLoading &&
                    <div>
                        {Retdata.map((item, index) => {
                            return <div className={MYS.ItemList} key={item._id}>
                                <div className={MYS.ItemListBox}>
                                   
                                    <div className={MYS.ItemListBoxB}>
                                        <h3>{index+1}. {item.title}</h3>
                                       
                                       
                                        <div style={{minHeight:'20px'}}>
                                            </div>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <EditTSChaptersmodal
                                                Chapterid={tsid}
                                                id={item._id}
                                                title={item.title}
                                                details={item.details}
                                                isActive={item.isActive}
                                                duration={item.duration}
                                                isFree={item.isFree}
                                            
                                            />
                                            <div style={{ minWidth:'10px'}}></div>
                                            <div style={{ minWidth: '10px' }}></div>
                                            <Link href={`/TSChapterQues/${item._id}`}>
                                                <Button size='small' variant="outlined" startIcon={<ListIcon />}>
                                                 Questions
                                                </Button>
                                            </Link>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        }

                        )}
                      
                    </div>

                }
            </Card>

        </>
    );
}

export default RecentOrders;
