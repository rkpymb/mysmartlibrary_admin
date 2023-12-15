
import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import Button from '@mui/material/Button';
import Link from 'next/link'
import SendIcon from '@mui/icons-material/Send';
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";
import {

  IconButton,

  styled
} from '@mui/material';
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'
function DashboardCrypto() {
  const router = useRouter()
 
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
        <title>Academics</title>
      </Head>
      <div className={MYS.marginTopMain}>
        <div className={MYS.TitleWithBackHeader}>
          <div className={MYS.TitleWithBackHeaderA}>
            <IconButton aria-label="cart" onClick={() => router.back()}>
              <StyledBadge color="secondary" >
                <LuArrowLeft />
              </StyledBadge>
            </IconButton>
            <div>
              <span>Academics</span>
            </div>
          </div>
        </div>
        <div className={MYS.stickyContainerBox} >
          <div className={MYS.stickyContainer}>
            <div className={MYS.DashboardCounterGrid}>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Categories</span>
                  <small>manage all categories</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/Academics/Categories'>
                    <Button size='small' variant="outlined" endIcon={<SendIcon />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/categories.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Test Series</span>
                  <small>manage all Test Series</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/Academics/TestSeries'>
                    <Button size='small' variant="outlined" endIcon={<SendIcon />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/exam.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Courses</span>
                  <small>manage all Courses</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/Academics/Courses'>
                    <Button size='small' variant="outlined" endIcon={<SendIcon />}>
                      view course
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/online-learning.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Videos</span>
                  <small>manage all Videos</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/Academics/Videos'>
                    <Button size='small' variant="outlined" endIcon={<SendIcon />}>
                      view Videos
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/video-lecture.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Study Materials</span>
                  <small>manage all StudyMaterials</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/Academics/StudyMaterials'>
                    <Button size='small' variant="outlined" endIcon={<SendIcon />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/learning-tools.png' alt='im' height='50' width='50' />
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </div>


    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
