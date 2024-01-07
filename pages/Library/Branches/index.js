import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'


import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';

import { FiEye, FiTrash, FiArrowRightCircle } from "react-icons/fi";
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


import AddBranch from '../../components/Library/Add/AddBranch'


import EditCatModal from '../../components/Edit/EditCatModal'

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
    const data = await fetch("/api/V3/Library/Branches/AllBranches", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed.ReqD.Branchlist)

        if (parsed.ReqD.Branchlist) {
          setInitialData(parsed.ReqD.Branchlist)

          setRetdata(parsed.ReqD.Branchlist)
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
      item.name.toLowerCase().includes(query) ||
      item.BranchCode.toLowerCase().includes(query)
    ));

    setRetdata(filteredData);
  };




  return (
    <>
      <Head>
        <title>Library Branches</title>
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
                  <span>Library Branches : <span>{FilterText}</span> ({Retdata.length})</span>
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

                  <AddBranch />
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
                    <TableCell>Branch</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow hover key={item._id}>
                        <TableCell>

                          <div style={{ maxWidth: 200 }}>
                            <div>
                              <span style={{ fontWeight: 600 }}>{item.name}</span>
                            </div>
                            <div>
                              <span style={{ fontWeight: 500, fontSize: '12px' }}>{item.BranchCode}</span>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                              <span style={{ fontWeight: 500, fontSize: '12px' }}>{item.City}, {item.State} {item.pincode}</span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {item.isActive ? <span>Active</span> : <span>Deactivated</span>}

                        </TableCell>

                        <TableCell>
                          <div className={MYS.Flexbtnbox}>

                            <div style={{ minWidth: '10px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton aria-label="cart" onClick={() =>
                                router.push(`/Library/BranchDetails/${item.BranchCode}`)
                              }>
                                <StyledBadge color="secondary" >
                                  <FiArrowRightCircle size={15} />
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
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
