import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from '../Upload/FileUpload'
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import { FiEdit, FiTrash } from "react-icons/fi";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Badge from '@mui/material/Badge';
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import MYS from '../../../Styles/mystyle.module.css'
import {
  Tooltip,
  FormControl,
  TextField,
  useTheme,
  styled,
  IconButton
} from '@mui/material';
import CheckloginContext from '../../../context/auth/CheckloginContext'
const EditCatModal = ({ CatData }) => {
  const router = useRouter()
  const [Btnloading, setBtnloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [CatID, setCatID] = useState();
  const [CatOrder, setCatOrder] = useState();
  const [Title, setTitle] = useState();
  const [CatImg, setCatImg] = useState();
  const Contextdata = useContext(CheckloginContext)

  const [TSStatus, setTSStatus] = useState();
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
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
    setCatID(CatData._id)
    setCatOrder(CatData.order)
    setTitle(CatData.name)
    setCatImg(CatData.image)
    setTSStatus(CatData.isActive)
  }, [router.query])


  const handleChangeTSStatus = (event) => {
    setTSStatus(event.target.value);
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

  const handleSubmit = (e) => {

    e.preventDefault();
    let FinalFileName = document.querySelector('#FinalFileName').value
    let FinalCatImg = ''
    if (Title !== '' && FinalFileName !== '') {
      setBtnloading(true)
      UpdateCat(FinalFileName)

    } else {
      alert('all fields are required');
    }


  };

  const UpdateCat = async (e) => {

    const sendUM = { imageUrl: e, name: Title, catid: CatID, JwtToken: Contextdata.JwtToken, CatOrder: CatOrder, isActive: TSStatus, }
    const data = await fetch("/api/V3/Update/EditCat", {
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
          alert(parsed.ReqData.done)
          setOpen(false)
          router.push('/Academics/Categories')
        } else {
          alert('Something went wrong')

        }


      })
  }
  return (
    <div>
      <div>

        <IconButton aria-label="cart" onClick={handleClickOpen('paper')}>
          <StyledBadge color="secondary" >
            <FiEdit size={15} />
          </StyledBadge>
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Edit : {Title}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <form onSubmit={handleSubmit} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Category Title"
                  fullWidth
                  value={Title}
                  onInput={e => setTitle(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={TSStatus}
                    label="Status"
                    onChange={handleChangeTSStatus}
                  >

                    <MenuItem value={true}>Public</MenuItem>
                    <MenuItem value={false}>Private</MenuItem>

                  </Select>
                </FormControl>
              </div>


              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Category Order"
                  fullWidth
                  type='Number'
                  value={CatOrder}
                  onInput={e => setCatOrder(e.target.value)}

                />
              </div>
              <div style={{ minHeight: 25 }}></div>
              <div className={MYS.featuresimagebox}>
                <div className={MYS.featuresimageboxA}>
                  <img
                    src={`${MediaFilesUrl}${MediaFilesFolder}/${CatImg}`}
                    width={100}
                    height={100}
                    layout='responsive'
                    alt='img'
                    id="Fimage"

                  />
                  <div>
                    <small>features images</small>
                  </div>
                </div>

                <div className={MYS.featuresimageboxB}>
                  <FileUpload />
                </div>
              </div>
              <input type="hidden" value={CatImg} id="FinalFileName" />

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
              <span>Update</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default EditCatModal
