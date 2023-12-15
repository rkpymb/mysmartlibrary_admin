import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';

import MYS from '../../../Styles/mystyle.module.css'

import { useRouter, useParams } from 'next/router'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

import {
  TextField,
  FormControl,
  styled
} from '@mui/material';
export default function ScrollDialog({ Chdata, tsid }) {
 
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [open, setOpen] = useState(false);
  const [Btnloading, setBtnloading] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [Title, setTitle] = useState();
  const [Details, setDetails] = useState();
  const [TestID, setTestID] = useState();

  const [IsActive, setIsActive] = useState();

  const [Duration, setDuration] = useState();

  const [IsFree, setIsFree] = useState();

  const [Productid, setProductid] = useState();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  useEffect(() => {
    setTestID(tsid)
    setTitle(Chdata.title)
    setDetails(Chdata.details)
    setIsActive(Chdata.isActive)
    setDuration(Chdata.duration)
    setIsFree(Chdata.isFree)
    setProductid(Chdata._id)


  }, [router.query])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Title !== '' && Duration !== '' && IsFree !== '') {
      setBtnloading(true)
      UpdateTS()
    } else {
      alert('all fields are required');
    }


  };
  const handleChangeFree = (event) => {
    setIsFree(event.target.value);
  };
  const handleChangeisActive = (event) => {
    setIsActive(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const UpdateTS = async (e) => {
    const sendUM = { title: Title, details: Details, isActive: IsActive, duration: Duration, isFree: IsFree, id: Productid, JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Update/UpdateTSChapter", {
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
        if (parsed.senddta) {
          setOpen(false)
          router.push(`/TSChapters/${TestID}`)
        } else {
          alert('Something went wrong')
        }

      })
  }


  return (
    <div>

      <Button size='small' onClick={handleClickOpen('paper')} variant="outlined" startIcon={<EditIcon />}>
        Edit
      </Button>
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
                label="Title"
                fullWidth
                value={Title}

                onInput={e => setTitle(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Full Details"
                fullWidth
                value={Details}

                onInput={e => setDetails(e.target.value)}

              />
            </div>



            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Duration in minutes"
                fullWidth
                type='number'
                value={Duration}

                onInput={e => setDuration(e.target.value)}

              />
            </div>

            <div className={MYS.inputlogin}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is this Chapter Free ?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={IsFree}
                  label="Is this product is Free ?"
                  onChange={handleChangeFree}
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>

                </Select>
              </FormControl>
            </div>
            <div className={MYS.inputlogin}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chapter Status ?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={IsActive}
                  label="Is this product is Free ?"
                  onChange={handleChangeisActive}
                >
                  <MenuItem value={false}>Deactivated</MenuItem>
                  <MenuItem value={true}>Active</MenuItem>

                </Select>
              </FormControl>
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
            <span>Update</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}