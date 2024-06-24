import { useState, useEffect, useContext } from 'react';
import {

  Box,
  Card,
  IconButton,
  styled
} from '@mui/material';
import Badge from '@mui/material/Badge';
import { LuSearch, LuArrowLeft } from "react-icons/lu";
import LoadingButton from '@mui/lab/LoadingButton';

import MYS from '/Styles/toutorials.module.css'

import CheckloginContext from '/context/auth/CheckloginContext'

import { useRouter, useParams } from 'next/router'

const NavBar = ({ Title }) => {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  return (
    <div className={MYS.ToutorialNav}>
      <div className={MYS.ToutorialNavBox_title}>
        <div className={MYS.ToutorialNavA}>
          <IconButton aria-label="cart" onClick={() => router.back()}>
            <StyledBadge color="secondary" >
              <LuArrowLeft />
            </StyledBadge>
          </IconButton>
        </div>
        <div className={MYS.ToutorialNavB}>
          <span>{Title} </span>
        </div>

      </div>

    </div>
  )
}

export default NavBar
