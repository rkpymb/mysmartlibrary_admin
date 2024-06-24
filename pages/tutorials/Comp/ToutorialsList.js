import React, { useState, useEffect, useContext } from 'react';



import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/toutorials.module.css'
import Skeleton from '@mui/material/Skeleton';


import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";



import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

import LoadingButton from '@mui/lab/LoadingButton';


import {


  styled,
  IconButton

} from '@mui/material';
import Image from 'next/image'

import { useRouter, useParams } from 'next/router'
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
function DashboardCrypto({SearchResult}) {
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
      const data = await fetch("/api/Main/tutorials/tutorials_list", {
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
    setPage(1);

    if(SearchResult){
     setReqData(SearchResult)
     setIsLoading(false);
     setHasMore(false);
    }else{
      GetData();
    }
   

  }, [router.query,SearchResult])


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));




  return (
    <div>

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

        <div className={MYS.tutorialGrid}>
          {ReqData.map((item, index) => {
            return <div hover key={index} className={MYS.tutorialItem}
              onClick={() => router.push(`/tutorials/p?slug=${item.slug}`)}
            >

              <div className={MYS.tutorialItemA}>
                <div className={MYS.tutorialItemImg}>
                  <Image
                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.Image}`}
                    alt="image"
                    layout="responsive"
                    placeholder='blur'
                    width={30}
                    height={30}
                    quality={100}
                    blurDataURL={blurredImageData}

                  />
                </div>
              </div>
              <div className={MYS.tutorialItemB}>
              <div className={MYS.tutorialItemBDate}>
                  <small>Updated at {item.date}</small>
                 
                </div>
                <span>{item.Title}</span>
               
              </div>


            </div>
          }

          )}
        </div>
      </InfiniteScroll>

    </div>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
