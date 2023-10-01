import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';
import CatTable from './Extra/CatTable';
import { subDays } from 'date-fns';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Label from 'src/components/Label';
import Image from 'next/image';
import EditCatModal from '../Edit/EditCatModal'

import { DO_SPACES_URL, DO_SPACES_FOLDER } from '../../../Data/config'

import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,

    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';

function RecentOrders() {

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/V3/List/CatList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD.categories)
                    setRetdata(parsed.ReqD.categories)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    return (<>
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cat Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Slug</TableCell>


                            </TableRow>
                        </TableHead>
                        {!isLoading &&
                            <TableBody>

                                {Retdata.map((item) => {
                                    return <TableRow hover key={item._id}>
                                        <TableCell>
                                            <div style={{maxWidth:'50px'}}>
                                                <Image
                                                    src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${item.image}`}
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
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.slug}
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="right">
                                            <div style={{display:'flex', alignItems: 'center'}}>
                                                {/* <Link href={`/managecategory/${item._id}`} >
                                                    <span>Manage</span>
                                                </Link> */}
                                                <EditCatModal CatID={item._id} Title={item.name} CatImg={item.image} CatOrder={item.order} />
                                          </div>
                                           
                                        </TableCell>


                                    </TableRow>
                                }

                                )}
                            </TableBody>

                        }



                    </Table>
                </TableContainer>
            </Card>

        </>
    );
}

export default RecentOrders;
