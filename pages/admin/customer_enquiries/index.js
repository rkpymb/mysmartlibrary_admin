import React, { useState, useEffect, useContext } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import { FiEye, FiTrash, FiArrowRightCircle, FiChevronRight } from "react-icons/fi";

import AddCustomerEnquiries from '../../components/Admin/Add/AddCustomerEnquiries'

import Badge from '@mui/material/Badge';
import TitleNav from '../../../src/components/Parts/TitleNav'

import LoadingButton from '@mui/lab/LoadingButton';

import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

import {


  IconButton,

  styled,

} from '@mui/material';
import Image from 'next/image'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { useRouter, useParams } from 'next/router'
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
function DashboardCrypto() {
  const router = useRouter()

  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const [ReqData, setReqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [AllData, setAllData] = useState(0);
  const [limit, setlimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);


  const GetData = async () => {

    const sendUM = {

      page: page,
      limit: limit,

    };

    try {
      const data = await fetch("/api/V3/Admin/customer_enquiries/customer_enquiries_list", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      });

      if (!data.ok) {
        throw new Error('Failed to fetch data');
      }
      const parsed = await data.json();

      if (parsed.ReqD) {
        if (parsed.ReqD.AllData) {
          setAllData(parsed.ReqD.AllData)
        }

        if (parsed.ReqD.DataList.length === 0) {
          setHasMore(false);
          setIsLoading(false);

        } else {

          if (page === 1) {
            setReqData([])
          }



          setReqData(prevData => [...prevData, ...parsed.ReqD.DataList]);
          setPage(page + 1)

          if (parsed.ReqD.DataList.length < limit) {
            setHasMore(false);

          }
          setIsLoading(false);
        }
        console.log(parsed.ReqD.DataList)

      } else {
        setHasMore(false);
      }


    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  const loadMoreData = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(function () {
        GetData();
      }, 1000);

    }
  };


  useEffect(() => {
    setPage(1)

    GetData();

  }, [router.query])


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const DeleteShift = async (item) => {
    let text = "Do you really want to delete ?";
    if (confirm(text) == true) {

      const sendUM = {
        id: item._id,
        Enqid:item.Enqid
      }
      const data = await fetch("/api/V3/Admin/customer_enquiries/delete_enquiry", {
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
            alert(parsed.ReqD.msg)
            router.push('/admin/customer_enquiries')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };



  return (
    <>
      <TitleNav Title={`Customer Enquiries`} />

      <div className={MYS.MboxMain}>
        <div className={MYS.BtnboxPage}>
          <div className={MYS.BtnboxPageA}>
            Total Enquiries : {AllData}
          </div>
          <div className={MYS.BtnboxPageB}>
            <AddCustomerEnquiries />
          </div>
        </div>
        <InfiniteScroll
          dataLength={ReqData.length}
          next={loadMoreData}
          hasMore={hasMore}
          scrollThreshold={0.2}
          loader={<div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
            <CircularProgress size={25} color="success" />
          </div>}
          endMessage={
            <div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
              <b>Yay! You have seen it all 🎉</b>
            </div>
          }
        >

          <div className={MYS.UserGrid}>
            {ReqData.map((item, index) => {
              return <div hover key={index} className={MYS.UserItemMain}>


                <div className={MYS.UserItemTitle}>
                  <span>{item.EnqData.title}</span>
                  <small>ENQ ID : {item.EnqData.Enqid}</small>

                  <small>Branch Code : {item.EnqData.Branchcode} </small>
                  <small>Branch Name : {item.EnqData.Enqdata && item.EnqData.Enqdata.BranchData.name} </small>
                </div>

                <div className={MYS.itemOrderM}>
                  <span>Customer </span>
                  <small>Name  : {item.EnqData.FullName}</small>
                  <small>Mobile : {item.EnqData.MobileNumber}</small>
                  <small>Email : {item.EnqData.Email}</small>
                  <small>Address : {item.EnqData.Enqdata && item.EnqData.Enqdata.Address}</small>

                </div>
                <div className={MYS.EnqMsg}>
                  <span>Message</span>

                  <small>{item.EnqData.Message}</small>
                </div>
                <div style={{ height: '10px' }}></div>
                <div className={MYS.UserItemTitle}>
                  <small>Date: {item.EnqData.date} {item.EnqData.time}</small>
                </div>


                <div className={MYS.PMItemFotter}>
                  <div className={MYS.PMItemFA}>
                    <div className={MYS.Pmtag}>
                      {item.EnqData.isActive == true ? <span>Open</span> : <span style={{ color: 'yellow' }}>Closed</span>}
                    </div>
                  </div>
                  <div className={MYS.PMItemFB}>
                    <div className={MYS.Flexbtnbox}>
                      <div style={{ minWidth: '10px' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="cart" onClick={() =>
                          DeleteShift(item.EnqData)
                        }>
                          <StyledBadge color="secondary" >
                            <FiTrash size={15} />
                          </StyledBadge>
                        </IconButton>
                        <div style={{ minWidth: '10px' }}></div>
                        <LoadingButton
                          size="small"
                          endIcon={<FiChevronRight />}
                          
                          loadingPosition="end"
                          variant="text"

                          onClick={() =>
                            router.push(`/admin/customer_enquiries/notes?Enqid=${item.EnqData.Enqid}`)
                          }
                        >
                          <span>{item.EnqNotes} Notes</span>
                        </LoadingButton>


                      </div>
                    </div>
                  </div>

                </div>


              </div>
            }

            )}
          </div>
        </InfiniteScroll>

      </div>



    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
