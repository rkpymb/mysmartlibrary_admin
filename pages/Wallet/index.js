import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '/context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';

import { FiEye, FiTrash } from "react-icons/fi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Image from 'next/image';

import { FiFilter, FiChevronRight } from 'react-icons/fi';




import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";




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


  const GetData = async () => {
    const sendUM = { JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Wallet/WalletTransactions", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed.ReqD.WTlist)

        if (parsed.ReqD.WTlist) {
          console.log(parsed.ReqD.WTlist)

          setRetdata(parsed.ReqD.WTlist)
          setInitialData(parsed.ReqD.WTlist)
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





  const ShortbyCredit = () => {
    const filteredData = initialData.filter(item => item.WTData.isActive == true);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Credited');
  };
  const ShortbyDebit = () => {
    const filteredData = initialData.filter(item => item.WTData.isActive == false);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Debited');
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
      item.WTData.title.toLowerCase().includes(query) ||
      item.WTData.Refid.toLowerCase().includes(query) ||
      item.WTData.TrnsactionId.toLowerCase().includes(query) ||
      item.UserData.mobile.toString().includes(query) 
    ));

    setRetdata(filteredData);
  };




  return (
    <>
      <Head>
        <title>Wallet Transactions</title>
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
                  <span>Wallet Transactions : <span>{FilterText}</span> ({Retdata.length})</span>
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
                    label="Search by Title, Order ID, Mobile"

                    defaultValue="Small"
                    size="small"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
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
                  <MenuItem onClick={ShortbyCredit}>
                    <small>Credited</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyDebit}>
                    <small>Debited</small>
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
                    <TableCell>Transaction</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>User Details</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow hover key={item._id} onClick={() => router.push(`/ManageOrder/${item._id}`)} style={{ cursor: 'pointer' }}>
                        <TableCell>
                          <div style={{ maxWidth: '270px' }}>


                            <div style={{fontSize:'20px', fontWeight:600}}>
                              {item.WTData.isActive ? <small style={{ color: 'blue' }}>+{item.WTData.amt}</small> : <small style={{ color: 'red' }}>-{item.WTData.amt}</small>}
                            </div>
                            <div>
                              <small>#{item.WTData.TrnsactionId}</small>
                            </div>
                            <div>
                              <small>{item.WTData.title}</small>
                            </div>

                            <div>
                              <small>Ref ID :  {item.WTData.Refid}</small>
                            </div>
                            <div style={{ fontSize: '12px' }}>
                              <small>{item.WTData.date},{item.WTData.time}</small>
                            </div>

                          </div>

                        </TableCell>
                        <TableCell>
                          <div style={{ maxWidth: '150px' }}>
                            <div style={{fontSize:'20px', fontWeight:600}}>
                              {item.WTData.isActive ? <small style={{ color: 'blue' }}>+{item.WTData.amt}</small> : <small style={{ color: 'red' }}>-{item.WTData.amt}</small>}

                            </div>
                          </div>

                        </TableCell>
                        <TableCell>
                          <div style={{ maxWidth: '150px' }}>
                            <span>By : {item.UserData.name}</span>
                            <div><small>{item.UserData.mobile}</small></div>
                            <div><small>{item.UserData.email}</small></div>

                          </div>
                        </TableCell>


                        <TableCell>
                          <div style={{ maxWidth: '150px' }}>
                            <div>
                              {item.WTData.isActive ? <small>Credited</small> : <small>Debited</small>}

                            </div>
                          </div>

                        </TableCell>
                        <TableCell>
                          <div style={{ maxWidth: '150px' }}>
                            <div>
                              {item.WTData.StatusText}

                            </div>
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
