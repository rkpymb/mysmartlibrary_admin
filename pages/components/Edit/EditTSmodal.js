import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import MYS from '../../../Styles/mystyle.module.css'
import UploadDoimg from '../UploadDo/UploadDoimg'

import { useRouter, useParams } from 'next/router'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import { DO_SPACES_URL, DO_SPACES_FOLDER } from '../../../Data/config'
import {
  TextField,
  FormControl,
  styled
} from '@mui/material';
export default function ScrollDialog(props) {
  const Contextdata = useContext(CheckloginContext)
  const router = useRouter()
  const toast = useRef(null);
  const [open, setOpen] = useState(false);
  const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
  const [scroll, setScroll] = useState('paper');
  const [Title, setTitle] = useState(props.title);
  const [Details, setDetails] = useState(props.details);
  const [Stock, setStock] = useState(props.stock);
  const [IsActive, setIsActive] = useState(props.isActive);

  const [Category, setCategory] = useState(props.catid);
  const [Sprice, setSprice] = useState(props.sprice);
  const [Mprice, setMprice] = useState(props.mprice);
  const [Duration, setDuration] = useState(props.duration);
  const [Tagline, setTagline] = useState(props.tagline);
  const [Taglinetwo, setTaglinetwo] = useState(props.taglinetwo);
  const [IsFree, setIsFree] = useState(props.isFree);
  const [CatListdata, setCatListdata] = useState([]);
  const [ImageMain, setImageMain] = useState(props.img);
  const [Productid, setProductid] = useState(props.id);
  const [Btnloading, setBtnloading] = useState(false);
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
    let FinalFileName = document.querySelector('#FinalFileName').value
    if (Title !== '' && FinalFileName !== '' && Category !== '' && Sprice !== '' && Mprice !== '' && Duration !== '' && Tagline !== '' && Taglinetwo !== '' && IsFree !== '') {
      setBtnloading(true)
      UpdateTS(FinalFileName)
    } else {
      alert('all fields are required');
    }


  };
  const handleChangeFree = (event) => {
    setIsFree(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const UpdateTS = async (e) => {
    const sendUM = { catid: Category, title: Title, details: Details, img: e, mprice: Mprice, sprice: Sprice, isActive: IsActive,stock: Stock, duration: Duration, tagline: Tagline, taglinetwo: Taglinetwo, isFree: IsFree, Productid: Productid, JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Update/UpdateTS", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed)
        setBtnloading(false)
        if (parsed.senddta) {
          setOpen(false)
          router.push('/Academics/TestSeries')
        } else {
          alert('Something Went Wrong')
        }

      })
  }
  useEffect(() => {

    const handleSubmit = async () => {
      const dataid = '08c5th4rh86ht57h6g';
      const sendUM = { dataid }
      const data = await fetch("/api/V3/List/CatList", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {
          console.log(parsed.ReqD.categories)
          setCatListdata(parsed.ReqD.categories)

        })
    }
    handleSubmit()


  }, [])

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
        <DialogTitle id="scroll-dialog-title">Edit : {props.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>

          <div className={MYS.featuresimagebox}>
            <div className={MYS.featuresimageboxA}>
              <img
                src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${ImageMain}`}
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
              <UploadDoimg />
            </div>
          </div>
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Category}
                  label="Select Category"
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={Category}>{Category}</MenuItem>
                  {CatListdata.map((item) => {
                    return <MenuItem value={item.slug}>{item.name}</MenuItem>


                  }

                  )}



                </Select>
              </FormControl>
            </div>

            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Main price"
                fullWidth
                type='number'
                value={Mprice}

                onInput={e => setMprice(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Sale price"
                fullWidth
                type='number'
                value={Sprice}

                onInput={e => setSprice(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Validity in days"
                fullWidth
                type='number'
                value={Duration}

                onInput={e => setDuration(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Tagline"
                fullWidth
                value={Tagline}

                onInput={e => setTagline(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Tagline"
                fullWidth
                value={Taglinetwo}

                onInput={e => setTaglinetwo(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is this product is Free ?</InputLabel>
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


            <input type="hidden" id="FinalFileName" value={ImageMain} />

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