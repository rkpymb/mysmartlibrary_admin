import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import Uploadimg from '../Comp/Uploadimg'

import LoadingButton from '@mui/lab/LoadingButton';
import { LuChevronRight } from "react-icons/lu";


import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Badge from '@mui/material/Badge';


import * as animationData from '/Data/Lottie/webappanima.json'


import {

  TextField,

  styled,

} from '@mui/material';
function DashboardCrypto() {
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
    <>
      <Head>
        <title>Customize Website</title>
      </Head>

      <div className={MYS.marginTopMain}>
        <div className={MYS.MB}>
          <div className={MYS.MB}>
           
            <LoadingButton

              onClick={UpdateWeb}
              endIcon={<LuChevronRight />}
              loading={Btnloading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Update Details</span>
            </LoadingButton>

          </div>

        </div>


      </div>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
