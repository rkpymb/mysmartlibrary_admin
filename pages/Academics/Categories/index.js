import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'

import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';

import { FiEye, FiTrash } from "react-icons/fi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Image from 'next/image';

import { FiFilter } from 'react-icons/fi';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";


import AddCat from '../../components/Add/AddCat'
import AddSubCat from '../../components/Add/AddSubCat'

import EditCatModal from '../../components/Edit/EditCatModal'
import EditSubCatModal from '../../components/Edit/EditSubCatModal'
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
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = { JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/List/CatlisMain", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {

        if (parsed.CatData) {
          setInitialData(parsed.CatData)

          setRetdata(parsed.CatData)
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
    const filteredData = initialData.filter(item => item.category.isActive);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Active Categories')
  };

  // Function to sort products by price from high to low
  const ShortbyNotActive = () => {
    const filteredData = initialData.filter(item => !item.category.isActive);
    setRetdata(filteredData);
    setAnchorEl(null);
    setFilterText('Not Active Categories');
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
      item.category.name.toLowerCase().includes(query) ||
      item.category.slug.toLowerCase().includes(query)
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
        <title>Categories</title>
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
                  <span>All Categories : <span>{FilterText}</span> ({Retdata.length})</span>
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
                    label="Search by Name, Slug"

                    defaultValue="Small"
                    size="small"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                <div className={MYS.Topbtnboxbtn}>

                  <AddCat />
                </div>
                <div className={MYS.Topbtnboxbtn}>

                  <AddSubCat />
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
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Sub Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Action</TableCell>


                  </TableRow>
                </TableHead>

                {!isLoading ?
                  <TableBody>

                    {Retdata.map((item) => {
                      return <TableRow hover key={item.category._id}>
                        <TableCell>

                          <div style={{ maxWidth: '50px' }}>
                            <Image
                              src={`${MediaFilesUrl}${MediaFilesFolder}/${item.category.image}`}
                              width={100}
                              height={100}
                              layout='responsive'
                              alt='img'

                            />
                          </div>

                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {item.category.name}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <div>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>{item.subcategories.length}</Typography>
                              </AccordionSummary>
                              <div style={{ backgroundColor: '#F5EEF8', }}>
                                {item.subcategories.map((subcategory) => {
                                  return <div>

                                    <TableRow hover key={subcategory._id}>
                                      <TableCell>
                                        <div style={{ width: '50px', height: '50px' }}>
                                          <Image
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${subcategory.image}`}
                                            width={100}
                                            height={100}
                                            layout='responsive'
                                            alt='img'

                                          />

                                        </div>

                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="body1"
                                          fontWeight="bold"
                                          color="text.primary"
                                          gutterBottom
                                          noWrap
                                        >
                                          {subcategory.name}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <div className={MYS.Flexbtnbox} >
                                          <div>
                                            <IconButton aria-label="cart" onClick={() =>
                                              DeleteSubCategory(subcategory._id)
                                            }>
                                              <StyledBadge color="secondary" >
                                                <FiTrash size={15} />
                                              </StyledBadge>
                                            </IconButton>

                                          </div>
                                          <div style={{ minWidth: '10px' }}></div>
                                          <div>
                                            <EditSubCatModal CatData={subcategory} />
                                          </div>
                                        </div>


                                      </TableCell>
                                     
                                    </TableRow>
                                  </div>
                                }

                                )}
                              </div>
                            </Accordion>
                          </div>

                        </TableCell>
                        <TableCell>
                          {item.category.isActive ? <span>Active</span> : <span>Deactivated</span>}

                        </TableCell>
                        <TableCell>
                          <span> {item.category.order}</span>

                        </TableCell>
                        <TableCell>
                          <div className={MYS.Flexbtnbox}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton aria-label="cart" onClick={() =>
                                DeleteCategory(item.category._id)
                              }>
                                <StyledBadge color="secondary" >
                                  <FiTrash size={15} />
                                </StyledBadge>
                              </IconButton>

                            </div>
                            <div style={{ minWidth: '10px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <EditCatModal CatData={item.category} />
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
