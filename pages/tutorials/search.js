import { useState, useEffect, useContext } from 'react';
import {

  Box,
  Card,
  IconButton,

  styled
} from '@mui/material';
import { LuSearch } from "react-icons/lu";
import LoadingButton from '@mui/lab/LoadingButton';

import Skeleton from '@mui/material/Skeleton';

import MYS from '/Styles/toutorials.module.css'
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';
import ToutorialsList from './Comp/ToutorialsList'
import NavBarTitle from './Comp/NavBarTitle'

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
  const [ShowData, setShowData] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Result, setResult] = useState([]);
  const [Query, setQuery] = useState('');
  const [TextD, setTextD] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 1) {
      SearchData(e.target.value)
    }else{
      setShowData(false)
    }
  };





  const SearchData = async (SQ) => {
    setTextD('Searching result for ')
    setShowData(true)

    setLoading(true)

    const sendUM = {

      SearchQuery: SQ,
      page: 1,
      limit: 1,

    }
    const data = await fetch("/api/Main/tutorials/search_tutorial", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        if (parsed.ReqD.ListData) {
          setResult(parsed.ReqD.ListData)
          
        } else {
          setResult([])

        }
        setTimeout(function () {
          setTextD('Showing result for ')
          setLoading(false)
        }, 1000)

      })
  }

  return (
    <OverviewWrapper>
      <Head>
        <title>Search Tutorials </title>
      </Head>
      <NavBarTitle Title={'Search Toutorials'} />
      <div className={MYS.ToutorialBox}>

        <div className={MYS.SearchBoxmain}>
          <input
            type='text'
            placeholder='start typing to search tutorials'
            autoFocus
            value={Query}
            onChange={handleInputChange}

          />
          <IconButton aria-label="cart">
            <LuSearch />
          </IconButton>

        </div>

        {ShowData &&

          <div className={MYS.SearchResultBox}>
            <div className={MYS.RsultTxt}>
              <span>{TextD} "{Query}"</span>
            </div>
            {!Loading ?
              <div>
                <ToutorialsList SearchResult={Result} />
              </div> :
              <div>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem',  }} width={'70%'} />
              </div>
            }
          </div>

        }




      </div>

    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
