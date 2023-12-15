import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Link from 'next/link'
import AddTSChapterQues from '../components/Add/AddTSChapterQues'
import { LuArrowLeft } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import Fade from '@mui/material/Fade';


import EditTSChapterQuesModal from '../components/Edit/EditTSChapterQuesModal';
import QuOptionModal from '../components/TS/QuOptionModal'
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '../../context/auth/CheckloginContext'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function DashboardCrypto({ DataSlug }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState([]);
    const [FilterText, setFilterText] = useState('All');


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchQuery, setSearchQuery] = useState('');


    const notify = (T) => toast(T, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = DataSlug
            const sendUM = { chid: dataid, JwtToken: Contextdata.JwtToken }
            const data = await fetch("/api/V3/List/TSChapterQuesList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    if (parsed.ReqD.AllQues) {
                        setRetdata(parsed.ReqD.AllQues)
                        setInitialData(parsed.ReqD.AllQues)
                        setIsLoading(false)
                    }

                })
        }
        handleSubmit()




    }, [router.query])

    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }
        ,
        {
            id: 5
        },
        {
            id: 4
        }
        ,
        {
            id: 5
        }
    ]

    const ShortbyActive = () => {
        const filteredData = initialData.filter(user => user.isActive);
        setRetdata(filteredData);
        setAnchorEl(null);
        setFilterText('Active Chapters')
    };

    // Function to sort products by price from high to low
    const ShortbyNotActive = () => {
        const filteredData = initialData.filter(user => !user.isActive);
        setRetdata(filteredData);
        setAnchorEl(null);
        setFilterText('Not Active Chapters')
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredData = initialData.filter(user => (
            user.title.toLowerCase().includes(query)
        ));

        setRetdata(filteredData);
    };

    return (
        <>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <ToastContainer />
            <Head>
                <title>Test Series Questions : {DataSlug}</title>
            </Head>

            <div className={MYS.marginTopMain}>
                <div className={MYS.TitleWithBackHeader}>
                    <div className={MYS.TitleWithBackHeaderA}>
                        <IconButton aria-label="cart" onClick={() => router.back()}>
                            <StyledBadge color="secondary" >
                                <LuArrowLeft />
                            </StyledBadge>
                        </IconButton>
                        <div>
                            {!isLoading ?
                                <div>
                                    <span>Test Series Questions : <span>{FilterText}</span> ({Retdata.length})</span>
                                </div>
                                : <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                </div>



                            }
                        </div>
                    </div>
                    <div className={MYS.TitleWithBackHeaderB}>
                        {!isLoading ?
                            <div className={MYS.Topbtnbox}>
                                <div style={{ minWidth: '10px' }}></div>
                                <div className={MYS.TopbtnboxSearch}>

                                    <TextField
                                        label="Search by title "

                                        defaultValue="Small"
                                        size="small"
                                        id="search"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className={MYS.Topbtnboxbtn}>

                                    <AddTSChapterQues chid={DataSlug} />
                                </div>

                                <div className={MYS.Topbtnboxbtn}>
                                    <Button variant="contained" endIcon={<FiFilter />}
                                        id="fade-button"
                                        size="small"
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Filter
                                    </Button>
                                </div>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={ShortbyActive}>
                                        <small>Active</small>
                                    </MenuItem>
                                    <MenuItem onClick={ShortbyNotActive}>
                                        <small>Deactivated</small>
                                    </MenuItem>

                                </Menu>



                            </div>
                            : <div>
                                <Skeleton variant="text" sx={{ fontSize: '3rem' }} width={100} animation="wave" />

                            </div>


                        }

                    </div>

                </div>
                <div>
                    <div className={MYS.stickytableBox} >
                        <TableContainer className={MYS.stickytable}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>

                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>


                                {!isLoading ?
                                    <TableBody>

                                        {Retdata.map((item, index) => {
                                            return <TableRow hover key={index} className={MYS.CourselistItemTable}

                                            >

                                                <TableCell>
                                                    <div style={{ width: '300px' }}>
                                                        <b> {item.title}</b>
                                                        <div><small>{item.details}</small></div>
                                                    </div>



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
                                                    <div><span> {item.date}</span></div>
                                                    <div><small> {item.time}</small></div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={MYS.Flexbtnbox}>

                                                        <EditTSChapterQuesModal
                                                            title={item.title}
                                                            details={item.details}
                                                            marks={item.marks}
                                                            id={item._id}
                                                            Chapterid={DataSlug}W
                                                        />
                                                        <div style={{ minWidth: '10px' }}></div>
                                                        <QuOptionModal
                                                            id={item._id}
                                                            title={item.title}
                                                            Chapterid={DataSlug} />
                                                    </div>

                                                </TableCell>


                                            </TableRow>
                                        }

                                        )}
                                    </TableBody>
                                    : <TableBody>
                                        {Dummydta.map((item, index) => {
                                            return <TableRow hover key={index}>
                                                <TableCell>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ maxWidth: '50px' }}>
                                                            <Skeleton variant="circular">
                                                                <Avatar />
                                                            </Skeleton>

                                                        </div>
                                                        <div style={{ marginLeft: '5px', maxWidth: '120px' }}>
                                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} animation="wave" />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />

                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />


                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" />

                                                </TableCell>
                                                <TableCell align="right">
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={100} animation="wave" />
                                                    </div>

                                                </TableCell>


                                            </TableRow>
                                        }

                                        )}
                                    </TableBody>


                                }



                            </Table>
                        </TableContainer>
                    </div>


                </div>
            </div>


        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
