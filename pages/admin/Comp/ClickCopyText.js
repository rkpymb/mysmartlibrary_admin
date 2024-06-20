import React, { useState, useEffect, useContext } from 'react';
import { LuCopy,LuCheckCheck } from "react-icons/lu";

import IconButton from '@mui/material/IconButton';
import { useRouter, useParams } from 'next/router'

const ClickCopyText = ({ CopyData }) => {
    const router = useRouter()
   
    const [Copied, setCopied] = useState(false);
    const CopyPurl = async (e) => {
        const textToCopy = e;
       
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true)
                setTimeout(function(){
                    setCopied(false)
               }, 1000);
              
            })
            .catch(err => {
               

            });
    }

    return (
        <div>
            {Copied ?
                <IconButton onClick={() => CopyPurl(CopyData)}>
                    <LuCheckCheck size={16} />
                </IconButton> :

                <IconButton onClick={() => CopyPurl(CopyData)}>
                    <LuCopy size={16} />
                </IconButton>


            }

        </div>
    )
}

export default ClickCopyText
