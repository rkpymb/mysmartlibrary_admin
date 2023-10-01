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
  useEffect(() => {
    if (Contextdata.IsLogin == true) {
      setLoading(false)
    } else {
      router.push('/')
    
    }
  });

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
        <title>Supermarks Dashboard</title>
      </Head>
     
      <Container className={MYS.min100vh}>
       
        {!Loading &&
          <div className={MYS.DashboardCounterBox}>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>34343</span>
                <small>Users</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>34343</span>
                <small>Educators</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>34343</span>
                <small>Test Series</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>34343</span>
                <small>Sales</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
          </div>
        }
      </Container>
     
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
