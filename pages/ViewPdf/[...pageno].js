import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,
    Container,
    IconButton,
    Button,
    styled
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '../../context/auth/CheckloginContext'

import Head from 'next/head';
import { LuArrowLeft } from "react-icons/lu";
import MYS from '../../Styles/mystyle.module.css'
import Badge from '@mui/material/Badge';

import { useRouter, useParams } from 'next/router'
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
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

function Overview({ padid ,title}) {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    useEffect(() => {

    });
    return (
        <OverviewWrapper>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={MYS.TitleWithBackHeader}>
                    <div className={MYS.TitleWithBackHeaderA}>
                        <IconButton aria-label="cart" onClick={() => router.back()}>
                            <StyledBadge color="secondary" >
                                <LuArrowLeft />
                            </StyledBadge>
                        </IconButton>
                        <div>
                            <span> {title} </span>
                        </div>
                    </div>
                    
                </div>
           
            <div >
                <iframe height='1000px' width='100%' src={`http://localhost:3001/images/${padid}`} title="title">

                </iframe>


            </div>
        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};



export async function getServerSideProps(context) {
    const padid = context.query.pageno[0];
    const title = context.query.pageno[1];
    return {
        props: { padid,title },
    }

}