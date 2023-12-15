import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Link from 'next/link'
import AddCourseChapters from '../components/Add/AddCourseChapters'
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '../../context/auth/CheckloginContext'
import {
    IconButton,
    Typography,
    styled,
    Card,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
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
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = DataSlug.DataSlug
            const sendUM = { pid: dataid, JwtToken: Contextdata.JwtToken }
            const data = await fetch("/api/V3/List/CourseChaptersList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD.CoursesChapters)
                    setRetdata(parsed.ReqD.CoursesChapters)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    return (
        <>
            <Head>
                <title>Course Chapters : {DataSlug.DataSlug}</title>
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
                            <span>Course Chapters : {DataSlug.DataSlug} </span>
                        </div>
                    </div>
                    <div>
                        <AddCourseChapters pid={DataSlug.DataSlug} />
                    </div>
                </div>
                <div className={MYS.stickytableBox} >
                    <TableContainer className={MYS.stickytable}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>

                                    <TableCell>Title</TableCell>
                                    <TableCell>Details</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>


                                </TableRow>
                            </TableHead>
                            {!isLoading &&
                                <TableBody>

                                    {Retdata.map((item, index) => {
                                        return <TableRow hover key={index}>

                                            <TableCell>
                                                <Typography
                                                    variant="body1"
                                                    fontWeight="bold"
                                                    color="text.primary"
                                                    gutterBottom
                                                    style={{overflow: "auto", textOverflow: "ellipsis", width: '11rem', height:100,}}
                                                    
                                                >
                                                    {item.title}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    variant="body1"
                                                    
                                                    color="text.primary"
                                                    gutterBottom
                                                   
                                                    style={{overflow: "auto", textOverflow: "ellipsis", width: '20rem', height:100,}}
                                                >
                                                    {item.details}
                                                </Typography>

                                            </TableCell>
                                            <TableCell>
                                               {item.isActive && 
                                               
                                               <span>Active</span>
                                               
                                               }
                                               {!item.isActive && 
                                               
                                               <span>Not Active</span>
                                               
                                               }

                                            </TableCell>
                                            <TableCell>
                                            <div style={{ minWidth: '10px' }}></div>
                                            <Link href={`/CourseChapterField/${item._id}/${item.pid}/${1}`}>
                                                <Button size='small' variant="outlined" >
                                                    View Chapter
                                                </Button>
                                            </Link>

                                            </TableCell>


                                        </TableRow>
                                    }

                                    )}
                                </TableBody>

                            }



                        </Table>
                    </TableContainer>
                </div>
            </Container>


            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
