import { useState, useEffect, useContext } from 'react';

import { LuChevronRight } from "react-icons/lu";
import LoadingButton from '@mui/lab/LoadingButton';
import NavBar from '../Comp/NavBar'
import MYS from '/Styles/toutorials.module.css'
import BaseLayout from 'src/layouts/BaseLayout';
import CheckloginContext from '/context/auth/CheckloginContext'

import Skeleton from '@mui/material/Skeleton';

import {
    IconButton,
    Card,
    Box,
    styled,

} from '@mui/material';

import Head from 'next/head';


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
    const [Tutorial, setTutorial] = useState(null);
    const { slug } = router.query;


    const GetData = async (slug) => {

        const sendUM = {
            slug: slug,
        };

        try {
            const data = await fetch("/api/Main/tutorials/tutorial_by_slug", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!data.ok) {
                throw new Error('Failed to fetch data');
            }
            const parsed = await data.json();

            if (parsed.ReqD.Tutorial) {
                setTutorial(parsed.ReqD.Tutorial)
             

                setTimeout(function () {
                    setIsLoading(false)
                  }, 1000)
          


            } else {

                alert('Post Not Found')
                router.push('/toutorials')
            }


        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    useEffect(() => {
        if (slug) {
            GetData(slug);
        }


    }, [slug])


    return (
        <OverviewWrapper>
            <Head>
                <title>Create Tutorial</title>
            </Head>
            <NavBar />
            <div className={MYS.ToutorialBox}>
                {isLoading ?
                    <div>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem', }} width={'70%'} />
                    </div>

                    :
                    <div className={MYS.Pagebox}>
                        <div className={MYS.PageboxTitle}>
                            <span>{Tutorial.Title}</span>
                            <div style={{ height: '10px' }}></div>
                            <small>Updated at {Tutorial.date}</small>

                        </div>
                        <div style={{ height: '2px' }}></div>
                        <div dangerouslySetInnerHTML={{ __html: Tutorial && Tutorial.Content }} />
                        <div style={{ height: '50px' }}></div>
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
