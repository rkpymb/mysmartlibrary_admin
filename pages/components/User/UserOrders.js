
import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

import EditTSSubscription from '../Edit/EditTSSubscription'
import Image from 'next/image';


import { FiFilter,FiChevronRight } from 'react-icons/fi';

import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Badge from '@mui/material/Badge';


import {
    
    Button,
    styled,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,

    TableRow,
    TableContainer,




} from '@mui/material';


const UserCourses = ({ UserMobile }) => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const GetData = async () => {

        const sendUM = { JwtToken: Contextdata.JwtToken, mobile: UserMobile }
        const data = await fetch("/api/V3/User/UserOrderslist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD)
                if (parsed.ReqD.Orders) {
                    setRetdata(parsed.ReqD.Orders)
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
    return (
        <div>
           <TableContainer >
              <Table aria-label="sticky table">
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
    )
}

export default UserCourses
