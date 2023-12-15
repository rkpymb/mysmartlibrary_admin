import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import MYS from '../../../Styles/mystyle.module.css'
import FileUpload from '../Upload/FileUpload'
import { useRouter, useParams } from 'next/router'
import Skeleton from '@mui/material/Skeleton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import {
  TextField,
  FormControl,
  styled
} from '@mui/material';
export default function ScrollDialog({ CourseMainData }) {
  const Contextdata = useContext(CheckloginContext)
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [LoadingSubCat, setLoadingSubCat] = useState(true);
  const [Btnloading, setBtnloading] = useState(false);
  const [SubCatListdata, setSubCatListdata] = useState([]);
  const [editorContent, setEditorContent] = useState('');



  const [SubCategory, setSubCategory] = useState();
  const [Sprice, setSprice] = useState();
  const [Mprice, setMprice] = useState();
  const [Duration, setDuration] = useState();
  const [Tagline, setTagline] = useState();
  const [Taglinetwo, setTaglinetwo] = useState();
  const [IsFree, setIsFree] = useState();
  const [CatListdata, setCatListdata] = useState([]);
  const [ImageMain, setImageMain] = useState();
  const [Availability, setAvailability] = useState();
  const [Productid, setProductid] = useState();
  const [pid, setPid] = useState();
  const [withcertificate, setWithcertificate] = useState();
  const [Title, setTitle] = useState();
  const [Details, setDetails] = useState();
  const [Stock, setStock] = useState();
  const [IsActive, setIsActive] = useState();
  const [CertiDetails, setCertiDetails] = useState();
  const [CertificationFee, setCertificationFee] = useState();
  const [lang, setLang] = useState();
  const [CourseDuration, setCourseDuration] = useState();
  const [Category, setCategory] = useState();
  useEffect(() => {
    setSubCategory(CourseMainData.Subcatid)
    setSprice(CourseMainData.sprice)
    setMprice(CourseMainData.mprice)
    setDuration(CourseMainData.duration)
    setTagline(CourseMainData.tagline)
    setTaglinetwo(CourseMainData.taglinetwo)
    setIsFree(CourseMainData.isFree)

    setImageMain(CourseMainData.img)
    setAvailability(CourseMainData.Availability)
    setProductid(CourseMainData._id)
    setPid(CourseMainData.pid)
    setWithcertificate(CourseMainData.withcertificate)
    setTitle(CourseMainData.title)
    setDetails(CourseMainData.details)
    setStock(CourseMainData.stock)
    setIsActive(CourseMainData.isActive)
    setCertiDetails(CourseMainData.CertiDetails)
    setCertificationFee(CourseMainData.CertificationFee)
    setLang(CourseMainData.lang)
    setCourseDuration(CourseMainData.CourseDuration)
    setCategory(CourseMainData.catid)


  }, [router.query])

  const notify = (T) => toast(T, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const handleEditorChange = (content) => {
    setEditorContent(content);
    setDetails(content);
  };
  const editorStyle = {
    height: '200px', // Set the desired height
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeCerti = (event) => {
    setWithcertificate(event.target.value);
  };
  const handleAvailability = (event) => {
    setAvailability(event.target.value);
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

  const Subcatlist = async (e) => {
    setSubCategory('')
    setLoadingSubCat(true)
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = { MainCat: e }
    const data = await fetch("/api/V3/List/SubCategoriesList", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        if (parsed.ReqD.categories) {
          setLoadingSubCat(false)
          setSubCatListdata(parsed.ReqD.categories)
        }


      })
  }




  const UpdateTS = async (e) => {
    const sendUM = {
      catid: Category, Subcatid: SubCategory, title: Title, details: editorContent, img: e, mprice: Mprice, sprice: Sprice, isActive: IsActive, stock: Stock, duration: Duration, tagline: Tagline, taglinetwo: Taglinetwo, isFree: IsFree, Productid: Productid, JwtToken: Contextdata.JwtToken, lang: lang,
      CourseDuration: CourseDuration,
      withcertificate: withcertificate,
      Availability: Availability,

      CertiDetails: CertiDetails,
      CertificationFee: CertificationFee,
    }
    const data = await fetch("/api/V3/Update/UpdateCourse", {
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
        if (parsed.senddta.done) {
          setOpen(false)
          notify('Course Updated Successfully')
          router.push(`/coursedetails/${pid}`)
        } else {
          alert(parsed.senddta.message)
        }

      })
  }

  const GetCatlist = async () => {
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

        setCatListdata(parsed.ReqD.categories)

      })
  }
  useEffect(() => {


    GetCatlist()


  }, [])


  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    Subcatlist(event.target.value)
  };


  const handleChangeSubCategory = (event) => {
    setSubCategory(event.target.value);
  };

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
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

          <div className={MYS.featuresimagebox}>
            <div className={MYS.featuresimageboxA}>
              <img
                src={`${MediaFilesUrl}${MediaFilesFolder}/${ImageMain}`}
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={SubCategory}
                  label="Sub Category"

                  onChange={handleChangeSubCategory}
                >
                  <MenuItem value={SubCategory}>{SubCategory}</MenuItem>
                  {!SubCatListdata.length > 0 &&
                    <div>
                      {SubCatListdata.map((item) => {
                        return <MenuItem value={item.slug}>{item.name}</MenuItem>


                      }

                      )}
                    </div>

                  }



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
                label="Course Languages"
                fullWidth

                value={lang}
                onInput={e => setLang(e.target.value)}

              />
            </div>
            <div className={MYS.inputlogin}>
              <TextField
                required
                label="Aprox Course Duration"
                fullWidth

                value={CourseDuration}

                onInput={e => setCourseDuration(e.target.value)}

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
            <div className={MYS.inputlogin}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is this product is Free ?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Availability}
                  label="Is this product is Free ?"
                  onChange={handleAvailability}
                >
                  <MenuItem value={0}>Private</MenuItem>
                  <MenuItem value={1}>Public</MenuItem>

                </Select>
              </FormControl>
            </div>

            <div className={MYS.inputlogin}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is this Course provide certification after Completion of Course ?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={withcertificate}
                  label="Is this Course provide certification after Completion of Course ?"
                  onChange={handleChangeCerti}
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>

                </Select>
              </FormControl>
            </div>

            {withcertificate &&
              <div>
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Certification Details"
                    fullWidth
                    value={CertiDetails}

                    onInput={e => setCertiDetails(e.target.value)}

                  />
                </div>
                <div className={MYS.inputlogin}>
                  <TextField
                    required
                    label="Certification Fee"
                    fullWidth
                    value={CertificationFee}
                    type='Number'
                    onInput={e => setCertificationFee(e.target.value)}

                  />
                </div>
              </div>
            }

            <div className={MYS.inputlogin}>
              <div>
                <ReactQuill
                  theme="snow" // You can change the theme as per your preference
                  value={Details}
                  onChange={handleEditorChange}
                  style={editorStyle}
                />
              </div>



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