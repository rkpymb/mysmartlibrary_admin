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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';



import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";


import CreateSubscription from '../../components/Library/Add/CreateSubscription'
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

  const [StatusText, setStatusText] = useState('');
  const [validityStartDate, setValidityStartDate] = useState('');
  const [validityEndDate, setValidityEndDate] = useState('');
  const [SeatData, setSeatData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [CurrentSubID, setCurrentSubID] = useState('');
  const [CurrentOID, setCurrentOID] = useState('');

  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';



  const handleClickOpenShiftEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseShiftEdit = () => {
    setOpenEdit(false);
  };

  const GetData = async () => {

    const sendUM = { JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Library/LBSubscriptions/LBSubscriptionAll", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed.ReqD.LBSubscriptionsList)

        if (parsed.ReqD.LBSubscriptionsList) {
          setInitialData(parsed.ReqD.LBSubscriptionsList)

          setRetdata(parsed.ReqD.LBSubscriptionsList)
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
    if (event.target.value === true) {
      setStatusText('Active')
    } else {
      setStatusText('Deactivated')
    }
  };

  const ShortbyActive = () => {
    const filteredData = initialData.filter(item => item.isActive == 3);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Active')
  };

  // Function to sort products by price from high to low
  const ShortbyNotActive = () => {
    const filteredData = initialData.filter(item => !item.isActive == 3);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Not Active');
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
      item.Branchcode.toLowerCase().includes(query) ||
      item.SeatCode.toLowerCase().includes(query)||
      item.passid.toLowerCase().includes(query)||
      item.Orderid.toLowerCase().includes(query)||
      item.mobile.toLowerCase().includes(query)

    ));

    setRetdata(filteredData);
  };

  const DeleteShift = async (e) => {
    let text = "Do you really want to delete This Subscription ?";
    if (confirm(text) == true) {

      const sendUM = {
        JwtToken: Contextdata.JwtToken,
        id: e
      }
      const data = await fetch("/api/V3/Library/LBSubscriptions/DeleteLBSubscription", {
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
            router.push('/Library/LibrarySubscription')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };

  const EditShift = async (SeatD) => {


    console.log(SeatD)
    setStatusText(SeatD.StatusText)
    setValidityStartDate(SeatD.validityStartDate)
    setValidityEndDate(SeatD.validityEndDate)
    setSeatData(SeatD.SeatData)
    setIsActive(SeatD.isActive)
    setCurrentSubID(SeatD._id)
    setCurrentOID(`${SeatD.Orderid} ${SeatD.title}`)

    handleClickOpenShiftEdit('paper')

  };
  const UpdateShift = async () => {
    if (StatusText !== '' && validityStartDate !== '' && validityEndDate !== '') {
      setBtnloading(true)
      const sendUM = {
        JwtToken: Contextdata.JwtToken,
        isActive: isActive,
        StatusText: StatusText,
        validityStartDate: validityStartDate,
        validityEndDate: validityEndDate,
        SeatData: SeatData,
        id: CurrentSubID,

      }
      const data = await fetch("/api/V3/Library/LBSubscriptions/UpdateLBSubscription", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {
          setBtnloading(false)
          if (parsed.ReqD.done) {
            alert(`${CurrentOID} Updated Successfully`)
            setOpenEdit(false)
            router.push(`/Library/LibrarySubscription`)
          } else {

            alert('Something went Wrong, please try again')
          }


        })

    } else {
      alert('Please Provide all Required Details ')
    }


  };



  return (
    <>
      <Head>
        <title>Library Subscriptions</title>
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
                  <span>Library Subscriptions : <span>{FilterText}</span> ({Retdata.length})</span>
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
                    label="Search by Name, Branch Code"

                    defaultValue="Small"
                    size="small"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                <div className={MYS.Topbtnboxbtn}>

                  <CreateSubscription />
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
                    <TableCell>Subscription</TableCell>
                    <TableCell>Validity</TableCell>
                    <TableCell>Pass ID</TableCell>
                    <TableCell>Branch Code</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow hover key={item._id}>
                        <TableCell>

                          <div style={{ width: 200 }}>
                            <div>
                              <span style={{ fontWeight: 600 }}>{item.title}</span>
                            </div>

                            <div>
                              <span style={{ fontSize: 12 }}>User : {item.mobile}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 12 }}>Order ID : {item.Orderid}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 12 }}>Paid : ₹ {item.sprice}</span>
                            </div>

                            <div>
                              <span style={{ fontSize: 12 }}>Addons : {item.Addon.length}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 12 }}>{item.SeatData.title} ({item.SeatData.SeatCode})</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 12 }}>{item.ShiftData.title} ({item.ShiftData.Shiftid})</span>
                            </div>


                            <div>
                              <span style={{ fontSize: 12 }}>Date : {item.date}, {item.time}</span>
                            </div>


                          </div>
                        </TableCell>
                        <TableCell>
                          {item.validityStartDate} to {item.validityEndDate}

                        </TableCell>
                        <TableCell>
                          <div style={{ width: 200 }}>
                            <div> {item.PassData.title}</div>
                            <div><small> {item.passid}</small></div>
                          </div>

                        </TableCell>
                        <TableCell>
                          {item.BranchCode}

                        </TableCell>
                        <TableCell>
                          {item.StatusText}

                        </TableCell>

                        <TableCell>
                          <div className={MYS.Flexbtnbox}>

                            <div style={{ minWidth: '10px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton aria-label="cart" onClick={() =>
                                DeleteShift(item._id)
                              }>
                                <StyledBadge color="secondary" >
                                  <FiTrash size={15} />
                                </StyledBadge>
                              </IconButton>
                              <div style={{ width: '5px' }}></div>
                              <IconButton aria-label="cart" onClick={() =>
                                EditShift(item)
                              }>
                                <StyledBadge color="secondary" >
                                  <FiEdit size={15} />
                                </StyledBadge>
                              </IconButton>
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


      <div>

        <Dialog
          open={OpenEdit}
          onClose={handleCloseShiftEdit}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Edit : {CurrentOID}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <form onSubmit={UpdateShift} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="validity Start Date"
                  fullWidth
                  value={validityStartDate}

                  onInput={e => setValidityStartDate(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="validity End Date"
                  fullWidth
                  value={validityEndDate}

                  onInput={e => setValidityEndDate(e.target.value)}

                />
              </div>


              <div className={MYS.inputlogin}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isActive}
                    label="Status"
                    onChange={handleChangeTSStatus}
                  >

                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Deactivated</MenuItem>

                  </Select>
                </FormControl>
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Subscription Status"
                  fullWidth
                  value={StatusText}

                  onInput={e => setStatusText(e.target.value)}

                />
              </div>




              <div style={{ minHeight: 25 }}></div>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShiftEdit}>Cancel</Button>
            <LoadingButton
              size="small"
              onClick={UpdateShift}
              endIcon={<SendIcon />}
              loading={Btnloading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Update</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
