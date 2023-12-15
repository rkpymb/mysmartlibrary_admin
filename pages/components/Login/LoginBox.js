import { useState, useEffect, useContext } from 'react';
import {
  Card,
  TextField,
  styled
} from '@mui/material';

import MYS from '../../../Styles/mystyle.module.css'
import LoadingButton from '@mui/lab/LoadingButton';

import CheckloginContext from '../../../context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'

function Hero() {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [MobileNumber, setMobileNumber] = useState('');
  const [OTPtext, setOTPtext] = useState('');
  const [BtnLoading, setBtnLoading] = useState(false);
  const [MobileBox, setMobileBox] = useState(true);
  const [OtpBox, setOtpBox] = useState(false);
  const [Password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (MobileNumber.length == 10 && Password !== '') {
      CheckLogin()
    } else {
      alert('invalid credentials')
    }
  };

  const VerifyOTP = async (e) => {
    e.preventDefault();

    if (MobileNumber.length == 10 && OTPtext !== '') {
      setBtnLoading(true)
      const sendUM = { mobile: MobileNumber, OTPtext: OTPtext }
      const data = await fetch("/api/V3/auth/verifyOtp", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {
          setBtnLoading(false)
          console.log(parsed.ReqD.token)
          if (parsed.ReqD.token) {
            localStorage.setItem('userid', parsed.ReqD.token);
            router.push('/dashboards/main')
          } else {
            alert(parsed.ReqD.message)
          }

        })


    } else {
      alert('Please Enter OTP')
    }

  };

  const CheckLogin = async () => {
    setBtnLoading(true)
    const sendUM = { mobile: MobileNumber, pass: Password }
    const data = await fetch("/api/V3/auth/LoginAdminuser", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        setBtnLoading(false)
        console.log(parsed.ReqD)
        if (parsed.ReqD.OTPStatus) {
          alert(parsed.ReqD.message)
          setMobileBox(false)
          setOtpBox(true)
          // localStorage.setItem('userid', parsed.ReqD.token);
          // window.location.reload();
        } else {
          alert(parsed.ReqD.message)
        }

      })
  }

  return (
    <div>
      <div className={MYS.LoginBoxContainer}>
        <div className={MYS.logomainDB}>
          <div className={MYS.logomain}>
            <img src='/logo/weblogo.png' alt='logo' width={'100%'} />
          </div>
        </div>
        {MobileBox &&
          <div className={MYS.LoginBox}>

            <div>
              <h1>Admin Login </h1>
              <span>Please Login to access Admin Dashboard</span>

            </div>
            <form onSubmit={handleSubmit} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Mobile number"
                  fullWidth
                  value={MobileNumber}

                  onInput={e => setMobileNumber(e.target.value)}
                  type="number"
                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  fullWidth
                  value={Password}

                  onInput={e => setPassword(e.target.value)}

                  required
                  label="Password"
                  type="password"
                />
              </div>

              <div style={{ minHeight: 25 }}></div>

              <LoadingButton
                type="submit"
                size="small"

                // endIcon={<SendIcon />}
                loading={BtnLoading}
                loadingPosition="end"
                variant="contained"
              >
                <span>Procced to Login</span>
              </LoadingButton>
            </form>
          </div>
        }


        {OtpBox &&

          <div className={MYS.LoginBox}>
            <div><h1>Enter OTP </h1>
              <span>OTP Succesfully sent on Your Mobile Number</span>
            </div>
            <form onSubmit={VerifyOTP} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="ENTER OTP"
                  fullWidth
                  value={OTPtext}

                  onInput={e => setOTPtext(e.target.value)}
                  type="number"
                />
              </div>


              <div style={{ minHeight: 25 }}></div>

              <LoadingButton
                type="submit"
                size="small"

                // endIcon={<SendIcon />}
                loading={BtnLoading}
                loadingPosition="end"
                variant="contained"
              >
                <span>Verify OTP</span>
              </LoadingButton>
            </form>
          </div>
        }






      </div>
    </div>
  );
}

export default Hero;
