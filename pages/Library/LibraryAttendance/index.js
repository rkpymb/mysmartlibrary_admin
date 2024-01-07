import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';

import { FiEdit, FiTrash, FiArrowRightCircle } from "react-icons/fi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Image from 'next/image';

import { FiFilter } from 'react-icons/fi';
import EditAtt from '../../components/Library/Edit/EditAtt'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';



import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";



import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
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
  FormControl,




} from '@mui/material';
function DashboardCrypto() {
  const [OpenEdit, setOpenEdit] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const Contextdata = useContext(CheckloginContext)
  const [Retdata, setRetdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterText, setFilterText] = useState('All');
  const [initialData, setInitialData] = useState([]);
  const [Btnloading, setBtnloading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('');


  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';



  const GetData = async () => {
    const sendUM = { JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Library/LibraryAttendance/AllAttendance", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed.ReqD.Attlist)

        if (parsed.ReqD.Attlist) {
          setInitialData(parsed.ReqD.Attlist)

          setRetdata(parsed.ReqD.Attlist)
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

  const handleChangeTSStatus = (event) => {
    setIsActive(event.target.value);
  };

  const ShortbyActive = () => {
    const filteredData = initialData.filter(item => item.AttData.isActive);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Present')
  };

  // Function to sort products by price from high to low
  const ShortbyNotActive = () => {
    const filteredData = initialData.filter(item => !item.AttData.isActive);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Absent');
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
      item.AttbyUser.mobile.toString().includes(query) ||
      item.AttbyUser.name.toLowerCase().includes(query) ||
      item.AttData.BranchCode.toLowerCase().includes(query)

    ));

    setRetdata(filteredData);
  };

  const DeletePass = async (e) => {
    let text = "Do you really want to delete This Attendance ?";
    if (confirm(text) == true) {
      const sendUM = {
        JwtToken: Contextdata.JwtToken,
        AttData: e,

      }
      const data = await fetch("/api/V3/Library/LibraryAttendance/DeleteAtt", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {

          if (parsed.ReqD.done) {
            alert(parsed.ReqD.done)
            router.push('/Library/LibraryAttendance')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };




  return (
    <>
      <Head>
        <title>Library Attendance
        </title>
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
                  <span>Library Attendance : <span>{FilterText}</span> ({Retdata.length})</span>
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
                    label="Branch Code,Mobile,Name"

                    defaultValue="Small"
                    size="small"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                <div className={MYS.Topbtnboxbtn}>

                  {/* <AddAddon /> */}
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
                    <small>Present</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyNotActive}>
                    <small>Absent</small>
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
                    <TableCell>Attendance</TableCell>
                    <TableCell>Seat Details</TableCell>
                    <TableCell>Branch Code</TableCell>
                    <TableCell>Marked by</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow hover key={item._id}>
                        <TableCell>
                          <div style={{ maxWidth: '250px', display: 'flex', }}>
                            <div>
                              <Avatar
                                alt={item.AttbyUser.name}
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                              />
                            </div>
                            <div style={{ marginLeft: '5px' }}>
                              <div style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: 13 }}>
                                {item.AttbyUser.name}
                              </div>
                             
                              <div style={{ fontWeight: 600, textTransform: 'uppercase' }}>
                                {item.AttData.isActive ? <span style={{ color: 'blue' }}>Present</span> : <span style={{ color: 'red' }}>Absent</span>}
                              </div>
                              <div>
                                <span style={{ fontSize: 12 }}>Wallet Point : {item.AttData.BonusPoint}  </span>
                              </div>

                              <div>
                                <span style={{ fontSize: 12 }}>Date / Time : {item.AttData.date}, {item.AttData.time}</span>
                              </div>


                            </div>
                          </div>


                        </TableCell>

                        <TableCell>
                          <div style={{ width: 200, }}>
                            <div style={{ fontSize: 12 }}>
                              <div>
                                <span>{item.AttData.ShiftData.title}</span>
                              </div>
                              <div>
                                <small>{item.AttData.ShiftData.uptime} - {item.AttData.ShiftData.downtime}</small>
                              </div>
                            </div>
                            <div style={{ fontSize: 12 }}>
                              <b> {item.AttData.SeatData.title}</b> ({item.AttData.SeatData.SeatCode})

                            </div>
                          </div>

                        </TableCell>
                        <TableCell>
                          {item.AttData.BranchCode}

                        </TableCell>
                        <TableCell>
                          <div style={{ fontSize: 13, maxWidth: '200px' }}>
                            <div> {item.AttbyUser.name}</div>
                            <div> {item.AttbyUser.mobile}</div>
                            <div> {item.AttbyUser.email}</div>

                          </div>
                          {item.AttData.ByUser ? <span style={{ color: 'blue' }}>By User</span> : <span style={{ color: 'green' }}>By Admin</span>}

                        </TableCell>

                        <TableCell>
                          <div className={MYS.Flexbtnbox}>

                            <div style={{ minWidth: '10px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton aria-label="cart" onClick={() =>
                                DeletePass(item.AttData)
                              }>
                                <StyledBadge color="secondary" >
                                  <FiTrash size={15} />
                                </StyledBadge>
                              </IconButton>
                              <div style={{ width: '5px' }}></div>
                              <EditAtt AttData={item.AttData} />
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
