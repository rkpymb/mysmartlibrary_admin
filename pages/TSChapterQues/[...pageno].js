import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import TSChapterQuesList from '../components/List/TSChapterQuesList';
import AddTSChapterQues from '../components/Add/AddTSChapterQues'
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import {
    IconButton,
   
    styled
} from '@mui/material';


export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
   

    return {

        props: { DataSlug }, // will be passed to the page component as props
    }

}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
function DashboardCrypto(DataSlug) {
    const router = useRouter()
   
    const [TSID, setTSID] = useState(DataSlug.DataSlug);
    return (
        <>
            <Head>
                <title>Test Series : Questions</title>
            </Head>

            <Container className={MYS.min100vh}>
                
                <div className={MYS.TitleWithBackHeader}>
                    <div className={MYS.TitleWithBackHeaderA}>
                        <IconButton aria-label="cart" onClick={() => router.back()}>
                            <StyledBadge color="secondary" >
                                <LuArrowLeft />
                            </StyledBadge>
                        </IconButton>
                        <div>
                            <span>Test Series Chapter's Questions</span>
                        </div>
                    </div>
                    <div>
                        <AddTSChapterQues chid={DataSlug.DataSlug} />
                    </div>
                </div>
                <TSChapterQuesList chid={DataSlug.DataSlug}/>
            </Container>
            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
