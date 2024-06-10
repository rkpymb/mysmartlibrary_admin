import { useRef, useState, useContext, useEffect } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter } from 'next/router';
const Logout = () => {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)

  useEffect(() => {
    Contextdata.Logout()
    removeCookie('jwt_token');
  
  }, []);

  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    alert('Logout Succesfully', 'success');
    router.push('/Login')

  };

  return (
    <div>

    </div>
  )
}

export default Logout
