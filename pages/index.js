import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Head from 'next/head';
import LoginBox from './components/Login/LoginBox'
import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';
import { useRouter, useParams } from 'next/router'
const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    if (Contextdata.IsLogin) {
      router.push('/dashboards/main')
    } else {
      
    }
  });
  return (
    <OverviewWrapper>
      <Head> 
        <title>Admin Panel : SuperMarks</title>
      </Head>
      <div style={{minHeight:'50px'}}></div>
      <div style={{margin:'20px'}}>
        {!Contextdata.IsLogin &&
          <LoginBox />
        }
     </div>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
