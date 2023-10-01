import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import TSChaptersList from '../components/List/TSChaptersList';
import AddTsChapters from '../components/Add/AddTsChapters'
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import {
    IconButton,
    Typography,
    styled
} from '@mui/material';


export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    return {
        props: { DataSlug },
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
                <title>Test Serie's Chapters</title>
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
                            <span>Test Series Chapters</span>
                        </div>
                    </div>
                    <div>
                        <AddTsChapters tsid={DataSlug.DataSlug} />
                    </div>
                </div>
                <TSChaptersList tsid={DataSlug.DataSlug}/>
            </Container>

            
            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
