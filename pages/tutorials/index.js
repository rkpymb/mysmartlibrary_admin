import { useState, useEffect, useContext } from 'react';
import {

  Box,
  Card,

  styled
} from '@mui/material';
import { LuChevronRight } from "react-icons/lu";
import LoadingButton from '@mui/lab/LoadingButton';

import MYS from '/Styles/toutorials.module.css'
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';
import ToutorialsList from './Comp/ToutorialsList'
import NavBar from './Comp/NavBar'

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Contextdata.IsLogin) {
      // router.push('/admin')
    } else {
      setIsLoading(false)
    }

  }, [Contextdata.Data]);
  return (
    <OverviewWrapper>
      <Head>
        <title>Tutorials && documentation</title>
      </Head>
      <NavBar/>
      <div className={MYS.ToutorialBox}>
        
        <ToutorialsList />

      </div>

    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
