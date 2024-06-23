import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '/Styles/mystyle.module.css';
import TitleNav from '../../../../src/components/Parts/TitleNav';

import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { useRouter } from 'next/router';
import CheckloginContext from '/context/auth/CheckloginContext';
import Skeleton from '@mui/material/Skeleton';

import BranchDetails from '../comp/BranchDetails';
import LibraryPosters from '../comp/LibraryPosters';
import LibraryPhotos from '../comp/LibraryPhotos';
import BranchAmenities from '../comp/BranchAmenities';

import {
    IconButton,
    styled,
    TextField,
    Button,
} from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function DashboardCrypto() {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const {BranchCode  } = router.query;

    const [IsLoading, setIsLoading] = useState(true);
    const [BranchData, setBranchData] = useState({});

    useEffect(() => {
        if (BranchCode) {
            GetBranchData(BranchCode);
        }
    }, [router.query]);

    const GetBranchData = async (BranchCode) => {
        setIsLoading(true);
        const sendUM = { BranchCode: BranchCode, JwtToken: Contextdata.JwtToken };
        const data = await fetch("/api/V3/Admin/Branches/BranchDetails", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => a.json())
          .then((parsed) => {
              if (parsed.ReqD.BranchData) {
                  if (parsed.ReqD.BranchData.length === 1) {
                      console.log(parsed.ReqD.BranchData[0]);
                      setBranchData(parsed.ReqD.BranchData[0]);
                      setIsLoading(false);
                  } else {
                      alert('Something Went Wrong');
                  }
              }
          });
    };

    return (
        <>
            {!IsLoading && <TitleNav Title={BranchData && BranchData.name} />}
            <div>
                <div className={MYS.MboxMain}>
                    {!IsLoading && <BranchDetails BranchData={BranchData} />}
                    {!IsLoading && <BranchAmenities BranchData={BranchData} />}
                    {!IsLoading && <LibraryPosters BranchData={BranchData} />}
                    {!IsLoading && <LibraryPhotos BranchData={BranchData} />}
                </div>
            </div>
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
