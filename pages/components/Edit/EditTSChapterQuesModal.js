import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';

import MYS from '../../../Styles/mystyle.module.css'

import { useRouter, useParams } from 'next/router'

import EditIcon from '@mui/icons-material/Edit';

import {
  
  TextField,
 
  styled
} from '@mui/material';
export default function ScrollDialog({ title, details, marks, Chapterid ,id}) {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [open, setOpen] = useState(false);

  const [scroll, setScroll] = useState('paper');
  const [Title, setTitle] = useState(title);
  const [Details, setDetails] = useState(details);



  const [Marks, setMarks] = useState(marks);


  const [Productid, setProductid] = useState(id);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Title !== '' && Marks !== '') {
      UpdateTS()
    } else {
      alert('all fields are required');
    }


  };


  const UpdateTS = async (e) => {
    const sendUM = { title: Title, details: Details, marks: Marks, id: Productid, JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Update/UpdateTSChapterQues", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed.senddta)
        if (parsed.senddta) {
          setOpen(false)
          router.push(`/TSChapterQues/${Chapterid}`)
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
                label="Marks"
                fullWidth
                type='number'
                value={Marks}

                onInput={e => setMarks(e.target.value)}

              />
            </div>





            <div style={{ minHeight: 25 }}></div>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}