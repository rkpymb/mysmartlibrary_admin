import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Image from 'next/image';

import { FiFilter } from 'react-icons/fi';



import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";


import AddVideo from '../../components/Add/AddVideo'

import {
  Button,

  IconButton,

  styled,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,

  TableRow,
  TableContainer,




} from '@mui/material';
function DashboardCrypto() {
  const Contextdata = useContext(CheckloginContext)
  const [Retdata, setRetdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterText, setFilterText] = useState('All');
  const [initialData, setInitialData] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter()


  const [searchQuery, setSearchQuery] = useState('');

  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const GetData = async () => {
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = { JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/List/Videolist", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {

        if (parsed.ReqD.Videos) {
          setInitialData(parsed.ReqD.Videos)
          setRetdata(parsed.ReqD.Videos)
          setIsLoading(false)

        }
      })
  }
  useEffect(() => {


    GetData()


  }, [router.query])


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

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

  ]

  const ShortbyUpcoming = () => {
    const filteredData = initialData.filter(item => item.isActive == 1);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Private Videos');
  };
  const ShortbyPublic = () => {
    const filteredData = initialData.filter(item => item.isActive == 2);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Public Videos')
  };
  const ShortbyPrivate = () => {
    const filteredData = initialData.filter(item => item.isActive == 3);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Private Videos');
  };

  const ShortbyFree = () => {
    const filteredData = initialData.filter(item => item.isFree);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Free Videos')
  };
  const ShortbyPaid = () => {
    const filteredData = initialData.filter(item => !item.isFree);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Paid Videos')
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
    const filteredData = initialData.filter(item => (
      item.title.toLowerCase().includes(query) ||
      item.catid.toLowerCase().includes(query) ||
      item.subcatid.toLowerCase().includes(query) ||
      item.slug.toLowerCase().includes(query) ||
      item.details.toLowerCase().includes(query)
    ));

    setRetdata(filteredData);
  };

  return (
    <>
      <Head>
        <title>Videos</title>
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
                  <span>All Videos : <span>{FilterText}</span> ({Retdata.length})</span>
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
                    label="Search by Title, Slug"

                    defaultValue="Small"
                    size="small"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                <div className={MYS.Topbtnboxbtn}>

                  <AddVideo />
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

                  <MenuItem onClick={ShortbyFree}>
                    <small>Free</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyPaid}>
                    <small>Paid</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyUpcoming}>
                    <small>Upcoming</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyPublic}>
                    <small>Public</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyPrivate}>
                    <small>Private</small>
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
                    <TableCell>Video</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date/Time</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow className={MYS.CourselistItemTable} hover key={item._id} onClick={() => router.push(`/VideoMainDetails/${item._id}`)}>
                        <TableCell>
                          <div className={MYS.Courselistimgbox}>
                            <div className={MYS.videothumbimg}>
                              <Image
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}

                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={'100%'}
                                height={70}
                                quality={50}
                                blurDataURL={blurredImageData}

                              />
                            </div>
                            <div className={MYS.CourselistimgboxB}>
                              <div style={{ width: '250px' }}>
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                >
                                  {item.title}
                                </Typography>
                              </div>
                              <div>
                                <span>Main Price : ₹{item.mprice}</span>
                              </div>
                              <div>
                                <span>Sale Price : ₹{item.sprice}</span>
                              </div>

                              <div>
                                <span>Video Type : {item.VideoType ? <span>Free</span>
                                  : <span>Paid</span>
                                } </span>
                              </div>
                              <div>
                                {item.VideoType == 2 &&
                                  <small>Youtube</small>

                                }
                                {item.VideoType == 1 &&
                                  <small>Dailymotion</small>

                                }
                              </div>
                            </div>


                          </div>


                        </TableCell>
                        <TableCell>
                          <div

                          >
                            <span> {item.catid}</span>
                            <div> <small> {item.subcatid}</small></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div

                          >
                            {item.isActive ==1  && <span>upcoming</span> }
                            {item.isActive ==2  && <span>public</span> }
                            {item.isActive ==3 && <span>Private</span> }
                          </div>
                        </TableCell>
                        <TableCell>
                          <div

                          >
                            <span> {item.date}</span>
                            <div>
                              <small> {item.time}</small>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button

                            size='small'
                            variant='outlined'
                            color='primary'
                          >
                            View Details
                          </Button>
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
