import React, { useState, useEffect, useContext } from 'react';

import MYS from '/Styles/mystyle.module.css'
import Image from 'next/image';

import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import { FiTrash, } from "react-icons/fi";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';


import Uploadimg from '../../Comp/Uploadimg'

import {
  IconButton,

  styled,
  FormControl,
  TextField,


} from '@mui/material';


const BranchAmenities = ({ BranchData }) => {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


  const router = useRouter()

  const [IsLoading, setIsLoading] = useState(true);

  const [UploadedImage, setUploadedImage] = useState(null);
  const Contextdata = useContext(CheckloginContext)
  const [AmenitieTitle, setAmenitieTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Order, setOrder] = useState(0);
  const [Btnloading, setBtnloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [isActive, setIsActive] = useState(3);

  const [Amenities, setAmenities] = useState([]);


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleChangeTSStatus = (event) => {
    setIsActive(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const onImageUpload = (Filedata) => {
    if (Filedata) {

      setUploadedImage(Filedata.postData.fileName)
    } else {
      setUploadedImage(null)
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  useEffect(() => {

    GetAllAmenities(BranchData.BranchCode)
  }, [])


  const DeleteAmenitiePhoto = async (e) => {
    let text = "Do you really want to delete This Amenitie ?";
    if (confirm(text) == true) {

      const sendUM = {

        id: e
      }
      const data = await fetch("/api/V3/Admin/Amenities/DeleteAmenitie", {
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
            GetAllAmenities(BranchData.BranchCode)

          } else {
            alert('Something went wrong')
          }



        })
    }



  };

  const GetAllAmenities = async (e) => {

    const sendUM = {

      BranchCode: e
    }
    const data = await fetch("/api/V3/Admin/Amenities/GetAllAmenities", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
      
        if (parsed.ReqD.Amenities) {
          setAmenities(parsed.ReqD.Amenities)
          setIsLoading(false)
        }


      })



  };


  const handleSubmit = (e) => {

    e.preventDefault();
    let FinalFileName = UploadedImage
    if (FinalFileName !== null && AmenitieTitle !== '') {
      setBtnloading(true)
      AddAmenities(FinalFileName)

    } else {
      alert('all fields are required');
    }


  };

  const AddAmenities = async (e) => {
    const sendUM = {
      BranchCode: BranchData.BranchCode,
      img: e,
      Title: AmenitieTitle,
      Description: Description,
      isActive: isActive,
      order: Order,


    }
    const data = await fetch("/api/V3/Admin/Amenities/AddLbAmenities", {
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
          alert(`${AmenitieTitle} Added successfully`)
          setOpen(false)
          GetAllAmenities(BranchData.BranchCode)
        } else {

          alert('Something went Wrong, please try again')
        }


      })
  }

  return (
    <div>


      <div className={MYS.BranchDataBoxB}>
        <div className={MYS.LBsmallBoxHeader}>
          <div className={MYS.LBsmallBoxHeaderA}>
            <span>BranchAmenities</span>
          </div>
          <div className={MYS.LBsmallBoxHeaderB}>
            {!IsLoading &&
              <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
              >
                Add new
              </Button>}
          </div>
        </div>
        <div>
          {!IsLoading ?
            <div className={MYS.AmenitiesGrid}>
              {Amenities.map((item) => {
                return <div className={MYS.AmenitiesItem} key={item._id}>
                  <div className={MYS.AmenitiesGridimg}>
                    <Image
                      src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}

                      alt="image"
                      layout="responsive"
                      placeholder='blur'
                      width={'100%'}
                      height={100}
                      quality={100}
                      blurDataURL={blurredImageData}

                    />
                  </div>
                  <div className={MYS.AmenitiesText}>
                    {item.Title}
                  </div>
                  <div className={MYS.AmenitiesBtm}>
                    <IconButton aria-label="cart" onClick={() =>
                      DeleteAmenitiePhoto(item._id)
                    }>
                      <StyledBadge color="secondary" >
                        <FiTrash size={15} />
                      </StyledBadge>
                    </IconButton>
                  </div>
                </div>
              }

              )}
            </div> :
            <div> <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={130} height={130} animation="wave" /></div>

          }

        </div>


      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Branch Amenitie</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <form onSubmit={handleSubmit} >

            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Amenitie Title"
                fullWidth
                value={AmenitieTitle}

                onInput={e => setAmenitieTitle(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Description"
                fullWidth
                value={Description}

                onInput={e => setDescription(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Order"
                fullWidth
                value={Order}
                type='Number'
                onInput={e => setOrder(e.target.value)}

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
                  <MenuItem value={3}>Public</MenuItem>
                  <MenuItem value={2}>Upcoming</MenuItem>
                  <MenuItem value={1}>Private</MenuItem>

                </Select>
              </FormControl>
            </div>



            <div style={{ minHeight: 25 }}></div>
            <div className={MYS.featuresimagebox}>
              <Uploadimg onImageUpload={onImageUpload} Title={'Upload Icon'} />
            </div>


            <div style={{ minHeight: 25 }}></div>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            size="small"
            onClick={handleSubmit}
            endIcon={<SendIcon />}
            loading={Btnloading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Save Data</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BranchAmenities
