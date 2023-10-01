import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';

import { useRouter } from 'next/router'

import EditTSChapterQuesModal from '../Edit/EditTSChapterQuesModal'
import QuOptionModal from '../TS/QuOptionModal'
import MYS from '../../../Styles/mystyle.module.css'

import {
    
    useTheme,
   
} from '@mui/material';

function RecentOrders({ chid }) {

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {

        const handleSubmit = async () => {
            const sendUM = { chid: chid }
            const data = await fetch("/api/V3/List/TSChapterQuesList", {
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
                                            <EditTSChapterQuesModal
                                                title={item.title}
                                                details={item.details}
                                                marks={item.marks}
                                                id={item._id}
                                                Chapterid={chid}
                                               
                                            
                                            />
                                            <div style={{ minWidth:'10px'}}></div>
                                            <QuOptionModal
                                                id={item._id}
                                                title={item.title}
                                                
                                                
                                                Chapterid={chid} />


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
