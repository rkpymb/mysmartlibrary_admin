import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Badge from '@mui/material/Badge';

import Image from 'next/image'

import {

  styled,


} from '@mui/material';
function DashboardCrypto() {
  const router = useRouter()
  const [Loading, setLoading] = useState(true);
  const Contextdata = useContext(CheckloginContext)
  const [CounterData, setCounterData] = useState([]);
  const [CounterLoading, setCounterLoading] = useState(true);
  const GetData = async () => {
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = { JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/List/DbMianCounter", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
      
        if (parsed.ReD.alldone) {
          setCounterData(parsed.ReD)
          setCounterLoading(false)

        }
      })
  }
  useEffect(() => {


    GetData()


  }, [router.query])

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <Container className={MYS.min100vh}>

        {!CounterLoading &&
          <div className={MYS.MainCounterGrid}>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalStudents}</span>
                <small>Students</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/img/male-student.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalEducators}</span>
                <small>Educators</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/img/female.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalCategories}</span>
                <small>Categories</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/img/app.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalCourses}</span>
                <small>Courses</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/img/online-course.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalTestSeries}</span>
                <small>Test Series</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/img/exam.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalStudyMaterials}</span>
                <small>Study Materials</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/img/notepad.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalVideos}</span>
                <small>Videos</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/img/video.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{CounterData.TotalSubscriptionOrders}</span>
                <small>Subscription Orders</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/img/subscription.png' alt='im' height='50' width='50' />
              </div>
            </div>


          </div>
        }
      </Container>

    
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
