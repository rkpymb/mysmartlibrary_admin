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


import Avatar from '@mui/material/Avatar';



import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";


import AddPosterslider from '../../components/Add/AddPosterslider'
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


  const [PosterID, setPosterID] = useState('');

  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const [PosterUrl, setPosterUrl] = useState('');
  const [PType, setPType] = useState('Website');
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const handleClickOpenShiftEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseShiftEdit = () => {
    setOpenEdit(false);
  };

  const GetData = async () => {

    const sendUM = { JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/List/PosterSliderlist", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {

        if (parsed.ReqD.PosterSliders) {

          setInitialData(parsed.ReqD.PosterSliders)

          setRetdata(parsed.ReqD.PosterSliders)
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

  const ShortbyApp = () => {
    const filteredData = initialData.filter(item => item.PType == 'App');
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Active')
  };
  const ShortbyWebsite = () => {
    const filteredData = initialData.filter(item => item.PType == 'Website');
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Active')
  };
  const ShortbyActive = () => {
    const filteredData = initialData.filter(item => item.isActive);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Active')
  };

  // Function to sort products by price from high to low
  const ShortbyNotActive = () => {
    const filteredData = initialData.filter(item => !item.isActive);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Deactivated');
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handlePType = (event) => {
    setPType(event.target.value);

  };

  const handleisActive = (event) => {
    setIsActive(event.target.value);

  };


  const DeletePosterSlider = async (e) => {
    let text = "Do you really want to delete Poster ?";
    if (confirm(text) == true) {

      const sendUM = {
        JwtToken: Contextdata.JwtToken,
        id: e
      }
      const data = await fetch("/api/V3/Delete/DeletePosterSlider", {
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
            router.push('/Settings/PosterSliders')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };

  const EditPoster = async (SeatD) => {
    console.log(SeatD)
    setOrder(SeatD.order)
    setPType(SeatD.PType)
    setPosterUrl(SeatD.url)
    setIsActive(SeatD.isActive)
    setPosterID(SeatD._id)
    handleClickOpenShiftEdit('paper')

  };
  const OpenLinkNewtab = async (UrlNew) => {
    console.log(UrlNew)
    window.open(UrlNew, "_blank");

  };
  const UpdatePoster = async () => {
    if (PosterUrl !== '' && order !== '') {
      setBtnloading(true)
      const sendUM = {
        JwtToken: Contextdata.JwtToken,
        url: PosterUrl,
        PType:PType,
        isActive: isActive,
        order: order,
        id: PosterID,

      }
      const data = await fetch("/api/V3/Update/UpdatePosterSlider", {
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
          if (parsed.ReqData.done) {
            alert(`Poster Updated Successfully`)
            setOpenEdit(false)
            router.push(`/Settings/PosterSliders`)
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
        <title>Posters</title>
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
                  <span>Posters : <span>{FilterText}</span> ({Retdata.length})</span>
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


                <div className={MYS.Topbtnboxbtn}>

                  <AddPosterslider />
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
                  <MenuItem onClick={ShortbyWebsite}>
                    <small>Website</small>
                  </MenuItem>
                  <MenuItem onClick={ShortbyApp}>
                    <small>App</small>
                  </MenuItem>
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
                    <TableCell>Posters</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow hover key={item._id}>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className={MYS.videothumbimg} style={{ cursor: 'pointer' }}>
                              <Image
                                onClick={() => OpenLinkNewtab(`${MediaFilesUrl}${MediaFilesFolder}/${item.BigImg}`)}
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.BigImg}`}

                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={'100%'}
                                height={70}
                                quality={50}
                                blurDataURL={blurredImageData}

                              />
                              <small>Big Poster</small>
                            </div>
                            <div style={{ width: '20px' }}></div>
                            <div className={MYS.videothumbimg} style={{ cursor: 'pointer' }}>
                              <Image
                                onClick={() => OpenLinkNewtab(`${MediaFilesUrl}${MediaFilesFolder}/${item.SmallImg}`)}
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.SmallImg}`}

                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={'100%'}
                                height={70}
                                quality={50}
                                blurDataURL={blurredImageData}

                              />
                              <small>Small Poster</small>
                            </div>
                          </div>

                        </TableCell>
                        <TableCell>

                          <div style={{ width: 200 }}>
                            <div>
                              <span style={{ fontWeight: 600 }}>{item.isActive ? <span style={{ color: 'blue' }}>Active</span> : <span style={{ color: 'red' }}>Deactivated</span>}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 12 }}>Order  : {item.order}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 12 }}>Url  : {item.url}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 12 }}>Type  : {item.PType}</span>
                            </div>

                            <div>
                              <span style={{ fontSize: 12 }}>Created : {item.date}, {item.time}</span>
                            </div>


                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={MYS.Flexbtnbox}>

                            <div style={{ minWidth: '10px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton aria-label="cart" onClick={() =>
                                DeletePosterSlider(item._id)
                              }>
                                <StyledBadge color="secondary" >
                                  <FiTrash size={15} />
                                </StyledBadge>
                              </IconButton>
                              <div style={{ width: '5px' }}></div>
                              <IconButton aria-label="cart" onClick={() =>
                                EditPoster(item)
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
          <DialogTitle id="scroll-dialog-title">Edit Poster</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <form onSubmit={EditPoster} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Poster Order"
                  fullWidth
                  value={order}
                  onInput={e => setOrder(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Poster Url"
                  fullWidth
                  value={PosterUrl}
                  onInput={e => setPosterUrl(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={PType}
                    label="Select Platform"
                    onChange={handlePType}
                  >
                    <MenuItem value='App'>App</MenuItem>
                    <MenuItem value='Website'>Website</MenuItem>


                  </Select>
                </FormControl>
              </div>
              <div className={MYS.inputlogin}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Poster Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isActive}
                    label="Select Status"
                    onChange={handleisActive}
                  >
                    <MenuItem value={true}>Public</MenuItem>
                    <MenuItem value={false}>Private</MenuItem>




                  </Select>
                </FormControl>
              </div>
              <input type="hidden" id="FinalFileName" />

              <input type="hidden" id="FinalFileName2" />

              <div style={{ minHeight: 25 }}></div>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShiftEdit}>Cancel</Button>
            <LoadingButton
              size="small"
              onClick={UpdatePoster}
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
