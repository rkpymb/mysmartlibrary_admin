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

import { FiFilter,FiChevronRight } from 'react-icons/fi';




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
    const data = await fetch("/api/V3/List/Orderslist", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed)

        if (parsed.reD) {
          setInitialData(parsed.reD.Orders)

          setRetdata(parsed.reD.Orders)
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



  const ShortbyPending = () => {
    const filteredData = initialData.filter(item => item.OrderStatus);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Pending Orders')
  };

  // Function to sort products by price from high to low
  const ShortbyCompleted = () => {
    const filteredData = initialData.filter(item => !item.OrderStatus);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Completed Orders');
  };
  const ShortbyPaid = () => {
    const filteredData = initialData.filter(item => item.PayStatus);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Paid');
  };
  const ShortbyNotPaid = () => {
    const filteredData = initialData.filter(item => !item.PayStatus);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Not Paid');
  };
  const ShortbyCourse = () => {
    const filteredData = initialData.filter(item => item.ProductType == 'Course');
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Courses');
  };
  const ShortbyTs = () => {
    const filteredData = initialData.filter(item => item.ProductType == 'TS');
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Test Series');
  };
  const ShortbyFree = () => {
    const filteredData = initialData.filter(item => item.amt == '0');
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Free');
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
      item.OrderTitle.toLowerCase().includes(query) ||
      item.usermob.toString().includes(query) ||
      item.Orderid.toString().includes(query)
    ));

    setRetdata(filteredData);
  };

  const DeleteCategory = async (e) => {
    let text = "Do you really want to delete ?";
    if (confirm(text) == true) {

      const sendUM = {
        JwtToken: Contextdata.JwtToken,
        id: e
      }
      const data = await fetch("/api/V3/Delete/DeleteCategory", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {

          if (parsed.ReqData.done) {
            alert(parsed.ReqData.done)
            router.push('/Academics/Categories')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };
  const DeleteSubCategory = async (e) => {
    let text = "Do you really want to delete ?";
    if (confirm(text) == true) {

      const sendUM = {
        JwtToken: Contextdata.JwtToken,
        id: e
      }
      const data = await fetch("/api/V3/Delete/DeleteSubCategory", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {

          if (parsed.ReqData.done) {
            alert(parsed.ReqData.done)
            router.push('/Academics/Categories')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };

  return (
    <>
      <Head>
        <title>Subscription orders</title>
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
                  <span>Subscription orders : <span>{FilterText}</span> ({Retdata.length})</span>
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
                  <MenuItem onClick={ShortbyFree}>
                    <small>Free Orders</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyPending}>
                    <small>Pending Order</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyCompleted}>
                    <small>Completed Order</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyPaid}>
                    <small>Paid</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyNotPaid}>
                    <small>Not Paid</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyCourse}>
                    <small>Course</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyTs}>
                    <small>Test Series</small>
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
                    <TableCell>Order</TableCell>
                    <TableCell>Order by</TableCell>
                    <TableCell>Order Status</TableCell>
                    <TableCell>payment Status</TableCell>

                    <TableCell>Action</TableCell>


                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow hover key={item._id} onClick={() => router.push(`/ManageOrder/${item._id}`)} style={{cursor:'pointer'}}>
                        <TableCell>
                          <div style={{ maxWidth: '270px' }}>
                            <div>
                              <small>#{item.Orderid}</small>
                            </div>
                            <div>
                              <b>{item.OrderTitle}</b>
                            </div>
                            <div>
                              <small>Type : {item.ProductType}</small>
                            </div>
                            <div>
                              <small>Price : ₹ {item.mprice}</small>
                            </div>
                            <div>
                              <small>Dicount ₹ : {item.TotalDiscount}</small>
                            </div>
                            <div>
                              <small>Total  : ₹ {item.amt}</small>
                            </div>
                          </div>

                        </TableCell>
                        <TableCell>
                          <div style={{ maxWidth: '150px' }}>
                            <span>By : {item.usermob}</span>
                            <div><small>@ {item.date},{item.time}</small></div>

                          </div>
                        </TableCell>


                        <TableCell>
                          <div style={{ maxWidth: '150px' }}>
                            <small>{item.OrderStatusText}</small>
                          </div>

                        </TableCell>
                        <TableCell>
                          <div style={{ maxWidth: '150px' }}>
                            <small>{item.PayStatusText}</small>
                          </div>

                        </TableCell>
                        <TableCell>
                          <Button variant="outlined" endtIcon={<FiChevronRight />}
                           size='small'

                           
                          >
                            Manage Order
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
