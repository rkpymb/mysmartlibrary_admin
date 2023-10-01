import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  CardHeader,
  CardContent,
  Card,
  Typography,
  TextField,
  Divider,

  FormControl,
  OutlinedInput,
  InputAdornment,
  styled
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Link from 'src/components/Link';
import MYS from '../../../Styles/mystyle.module.css'


import CheckloginContext from '../../../context/auth/CheckloginContext'


function Hero() {
  const Contextdata = useContext(CheckloginContext)
  const [MobileNumber, setMobileNumber] = useState('');

  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (MobileNumber.length == 10 && Password !=='') {
     
      CheckLogin()

    } else {
      alert('invalid credentials')
    }

  };


  const CheckLogin = async () => {

    const sendUM = { mobile: MobileNumber, pass: Password }
    const data = await fetch("/api/V3/auth/CheckLogin", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        if (parsed.ReqD.token) {

          localStorage.setItem('userid', parsed.ReqD.token);
          window.location.reload();
        } else {
          alert(parsed.ReqD.message)
        }

      })
  }

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Card sx={{ textAlign: 'center', mt: 5, p: 5 }}>
          <div><h1>Admin Login </h1></div>
          
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
            <Button
              type="submit"
              variant='contained'
              color='primary'
            >
              Procced to Login
            </Button>
          </form>

        
        </Card>
      </Grid>
    </Container>
  );
}

export default Hero;
