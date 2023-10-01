import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import MYS from '../../../Styles/mystyle.module.css'

import { useRouter, useParams } from 'next/router'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ChecklistIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';

import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  
  TextField,

  FormControl,
 
  styled
} from '@mui/material';
export default function ScrollDialog({ id, Chapterid, title }) {
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const [AddNewBox, setAddNewBox] = useState(false);
  const [EditBox, setEditBox] = useState(false);
  const [MainBox, setMainBox] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scroll, setScroll] = useState('paper');

  const [IsActive, setIsActive] = useState(false);
  const [Title, setTitle] = useState('');
  const [Details, setDetails] = useState();
  const [OptionID, setOptionID] = useState('');

  const [Productid, setProductid] = useState(id);
  const [Retdata, setRetdata] = useState([]);
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
    GetOptionList()
  }, [])
  const GetOptionList = async () => {
    const sendUM = { quid: Productid }
    const data = await fetch("/api/V3/List/TSoptionsList", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        setRetdata(parsed.ReqD.AllOptions)
        setIsLoading(false)
        ShowMain(true)
      })
  }

  const ShowAddnew = () => {
    setMainBox(false)

    setEditBox(false)
    setAddNewBox(true)

  };
  const ShowMain = () => {

    setAddNewBox(false)
    setEditBox(false)
    setMainBox(true)
  };
  const ShowEdit = (e) => {
    console.log(e)
    setTitle(e.Title)
    setIsActive(e.IsActive)
    setDetails(e.Details)
    setOptionID(e.OptionID)
    setAddNewBox(false)
    setMainBox(false)
    setEditBox(true)
  };

  const AddNewOption = async (e) => {
    e.preventDefault();
    if (Title !== '' && Details !== '' && IsActive !== '') {
      const sendUM = { title: Title, details: Details, isActive: IsActive, quid: Productid }
      const data = await fetch("/api/V3/Add/AddTSOptions", {
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
            GetOptionList();
          }

        })
    } else {
      alert('all fields are required');
    }


  };
  const EditOption = async (e) => {
    e.preventDefault();
    console.log(OptionID)
    if (Title !== '' && Details !== '' && IsActive !== '' && OptionID !== '') {
      const sendUM = { title: Title, details: Details, isActive: IsActive, id: OptionID }
      const data = await fetch("/api/V3/Update/UpdateTSOption", {
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
            GetOptionList();
          }

        })
    } else {
      alert('all fields are required');
    }

  };



  const handleChangeOption = (event) => {
    setIsActive(event.target.value);
  };


  return (
    <div>

      <Button size='small' onClick={handleClickOpen('paper')} variant="outlined" startIcon={<ChecklistIcon />}>
        Options
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        <DialogContent dividers={scroll === 'paper'}>

          {MainBox &&
            <div>
              <div className={MYS.Modalheader}>
                <div className={MYS.ModalheaderIcon}>
                  <ArrowBackIcon size={10} onClick={handleClose} className={MYS.Curserpointer} />
                </div>
                <div className={MYS.ModalheaderText}>
                  Options :{title}
                </div>

              </div>
              <div style={{ minHeight: '20px' }}></div>
              {Retdata.map((item, index) => {
                return <div className={MYS.OptionItem} key={item._id}>
                  <div className={MYS.OptionItemBox}>
                    <div className={MYS.OptionItemBoxA}>
                      <h3>{index + 1}. {item.title}</h3>
                      <small> {item.details}</small>
                      <div>
                        {item.isActive &&
                          <span>Correct</span>
                        }
                      </div>
                    </div>

                    <div className={MYS.OptionItemBoxB}>
                      <EditIcon size={10} onClick={() => ShowEdit({ Title: item.title, IsActive: item.isActive, Details: item.details, OptionID: item._id })} />
                    </div>



                  </div>


                </div>
              }

              )}

            </div>
          }

          {AddNewBox &&

            <div>
              <div className={MYS.Modalheader}>
                <div className={MYS.ModalheaderIcon}>
                  <ArrowBackIcon size={10} onClick={ShowMain} className={MYS.Curserpointer} />
                </div>
                <div className={MYS.ModalheaderText}>
                  Add New option
                </div>

              </div>
              <div style={{ minHeight: '20px' }}></div>
              <form onSubmit={AddNewOption} >
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Option Title"
                    fullWidth
                    value={Title}

                    onInput={e => setTitle(e.target.value)}

                  />
                </div>
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Option details"
                    fullWidth
                    value={Details}

                    onInput={e => setDetails(e.target.value)}

                  />
                </div>



                <div className={MYS.inputlogin}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">True or False ?</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={IsActive}
                      label="True or False"
                      onChange={handleChangeOption}
                    >
                      <MenuItem value={true}>True</MenuItem>
                      <MenuItem value={false}>False</MenuItem>

                    </Select>
                  </FormControl>
                </div>
              </form>
            </div>
          }

          {EditBox &&

            <div>
              <div className={MYS.Modalheader}>
                <div className={MYS.ModalheaderIcon}>
                  <ArrowBackIcon size={10} onClick={ShowMain} className={MYS.Curserpointer} />
                </div>
                <div className={MYS.ModalheaderText}>
                  Edit Option : {Title}
                </div>

              </div>

              <div style={{ minHeight: '20px' }}></div>
              <form onSubmit={EditOption} >
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Option Title"
                    fullWidth
                    value={Title}

                    onInput={e => setTitle(e.target.value)}

                  />
                </div>
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Option Details"
                    fullWidth
                    value={Details}

                    onInput={e => setDetails(e.target.value)}

                  />
                </div>



                <div className={MYS.inputlogin}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">True or False ?</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={IsActive}
                      label="True or False"
                      onChange={handleChangeOption}
                    >
                      <MenuItem value={true}>True</MenuItem>
                      <MenuItem value={false}>False</MenuItem>

                    </Select>
                  </FormControl>
                </div>
              </form>
            </div>
          }

        </DialogContent>
        {MainBox &&
          <DialogActions>

            <Button onClick={handleClose}>Close</Button>
            <Button onClick={ShowAddnew}>Add new Option</Button>

          </DialogActions>

        }

        {AddNewBox &&
          <DialogActions>


            <Button onClick={AddNewOption}>Save</Button>

          </DialogActions>

        }
        {EditBox &&
          <DialogActions>


            <Button onClick={EditOption}>Update</Button>

          </DialogActions>

        }
      </Dialog>
    </div>
  );
}