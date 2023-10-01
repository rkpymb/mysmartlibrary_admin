import React from 'react'
import Mys from '../../../Styles/mystyle.module.css'
const index = () => {
  return (
    <div className={Mys.LogoBox}>
      <div className={Mys.Logomain}>
        <img src='https://supermarks.in/logo/logomain.png' alt='logo' />
       
      </div>
      <div className={Mys.LogoBoxB}> <small>Main Dashboard Panel</small></div>
  </div>
  )
}

export default index
