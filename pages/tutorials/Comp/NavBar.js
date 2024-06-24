import { useState, useEffect, useContext } from 'react';
import {

  Box,
  Card,

  styled
} from '@mui/material';
import { LuSearch,LuArrowLeft } from "react-icons/lu";
import LoadingButton from '@mui/lab/LoadingButton';

import MYS from '/Styles/toutorials.module.css'
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '/context/auth/CheckloginContext'

import Head from 'next/head';


import { useRouter, useParams } from 'next/router'

const NavBar = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
  return (
    <div className={MYS.ToutorialNav}>
        <div className={MYS.ToutorialNavBox}>
          <div className={MYS.ToutorialNavA}>
            <div className={MYS.logomain}  onClick={() => router.push('/tutorials')}>
              <img src='/Logo/logo.png' alt='logo' width={'100%'} />
            </div>
          </div>
          <div className={MYS.ToutorialNavB}>
            <LoadingButton
              startIcon={<LuSearch />}
              loadingPosition="end"
              variant="text"
              size="small"

              onClick={() => router.push(`/tutorials/search`)}
              sx={{ mt: 1, mr: 1 }}
            >

            Search
              
            </LoadingButton>

          </div>

        </div>

      </div>
  )
}

export default NavBar
