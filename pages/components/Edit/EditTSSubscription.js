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
const EditCatModal = ({ SubsData }) => {
  const router = useRouter()
  const [Btnloading, setBtnloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const Contextdata = useContext(CheckloginContext)
  const [IsActive, setIsActive] = useState(false);
  const [Dataid, setDataid] = useState();
  const [StatusText, setStatusText] = useState();
  const [Validity, setValidity] = useState();
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
    setDataid(SubsData._id)
    setStatusText(SubsData.StatusText)
    setValidity(SubsData.validityEndDate)
    setIsActive(SubsData.isActive)
   
  }, [router.query])


  const handleChangeStatus = (event) => {
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

 

  const UpdateCat = async (e) => {
    if(StatusText !== '' && Validity !==''){
      setBtnloading(true)
      const sendUM = { JwtToken: Contextdata.JwtToken,
        StatusText: StatusText,
        validity: Validity,
        isActive: IsActive,
        Dataid: Dataid,
      }
      const data = await fetch("/api/V3/Update/EditTSSubscription", {
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
            window.location.reload();
          } else {
            alert('Something went wrong')
  
          }
  
  
        })
    }else{
      alert('Something went wrong')
    }

   
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
          <DialogTitle id="scroll-dialog-title">Edit : Subscription</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <form onSubmit={UpdateCat} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Validity"
                  fullWidth
                  value={Validity}
                  onInput={e => setValidity(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Subscription Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={IsActive}
                    label="Status"
                    onChange={handleChangeStatus}
                  >

                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Deactivate</MenuItem>

                  </Select>
                </FormControl>
              </div>


              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Subscription Status Text"
                  fullWidth
                
                  value={StatusText}
                  onInput={e => setStatusText(e.target.value)}

                />
              </div>
              
            

              <div style={{ minHeight: 25 }}></div>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              size="small"
              onClick={UpdateCat}
              endIcon={<SendIcon />}
              loading={Btnloading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Update Subscription</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default EditCatModal
