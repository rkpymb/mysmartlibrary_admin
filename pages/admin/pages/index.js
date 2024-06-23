import React, { useState, useEffect, useContext } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import { FiEdit, FiTrash, FiArrowRightCircle } from "react-icons/fi";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import MenuItem from '@mui/material/MenuItem';

import ClickCopyText from '../Comp/ClickCopyText'

import Badge from '@mui/material/Badge';

import { LuPlus } from "react-icons/lu";

import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import TitleNav from '../../../src/components/Parts/TitleNav'

import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import {

  Button,

  IconButton,

  styled,

  FormControl,
} from '@mui/material';
import Image from 'next/image'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { useRouter, useParams } from 'next/router'
import { MediaFilesFolder, WebMainDomain } from '/Data/config'
function DashboardCrypto() {
  const router = useRouter()

  const [ReqData, setReqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [DataList, setDataList] = useState(0);
  const [limit, setlimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);




  const GetData = async () => {

    const sendUM = {

      page: page,
      limit: limit,

    };

    try {
      const data = await fetch("/api/V3/Admin/WebPage/WebPageList", {
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
          setDataList(parsed.ReqD.AllData)
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

  const DelPage = async (e) => {
    let text = "Do you really want to delete This Page ?";
    if (confirm(text) == true) {

      const sendUM = {

        id: e
      }
      const data = await fetch("/api/V3/Admin/WebPage/delete_page", {
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
            router.push('/admin/pages')
          } else {
            alert('Something went wrong')
          }



        })
    }



  };



  return (
    <>
      <TitleNav Title={`Pages`} />

      <div className={MYS.MboxMain}>
        <div className={MYS.BtnboxPage}>
          <div className={MYS.BtnboxPageA}>
            Total Pages : {DataList}
          </div>
          <div className={MYS.BtnboxPageB}>
            <LoadingButton
              size="small"
              onClick={() =>
                router.push(`/admin/pages/create_page`)
              }
              startIcon={<LuPlus />}

              loadingPosition="end"
              variant="contained"
            >
              <span>Add New Page</span>
            </LoadingButton>
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
                  <span style={{ fontSize: '18px' }}>{item.PageTitle}</span>
                  <div style={{ height: '10px' }}></div>
                  <small>Published  :{item.date}, {item.time}</small>
                </div>
                <div className={MYS.UrlBox}>
                  <div className={MYS.UrlBoxText}>
                    <small>Page Link</small>
                    <span> {`${WebMainDomain}${item.PageSlug}`}</span>
                  </div>

                  <div>
                    <ClickCopyText CopyData={`${WebMainDomain}${item.PageSlug}`} />
                  </div>

                </div>

                <div className={MYS.PMItemFotter}>
                  <div className={MYS.PMItemFA}>
                    <div className={MYS.Pmtag}>
                      <span> {item.StatusText}</span>
                    </div>

                  </div>
                  <div className={MYS.PMItemFB}>
                    <div className={MYS.Flexbtnbox}>

                      <div style={{ minWidth: '10px' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="cart"

                          onClick={() =>
                            DelPage(item._id)
                          }

                        >
                          <StyledBadge color="secondary" >
                            <FiTrash size={15} />
                          </StyledBadge>
                        </IconButton>

                        <div style={{ minWidth: '5px' }}></div>

                        <IconButton aria-label="cart"
                          onClick={() =>
                            router.push(`/admin/pages/edit?PageSlug=${item.PageSlug}`)
                          }
                        >
                          <StyledBadge color="secondary" >
                            <FiEdit size={15} />
                          </StyledBadge>
                        </IconButton>
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
