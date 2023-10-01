import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
const CheckloginStates = (props) => {
    const [Data, setData] = useState({});
    const [IsLogin, setIsLogin] = useState(false);
    const [JwtToken, setJwtToken] = useState(null);
    const router = useRouter()

    useEffect(() => {
        try {
            if (localStorage.getItem('userid')) {
                setIsLogin(true)
                const T = localStorage.getItem('userid')
                setJwtToken(T)
                CheckLogin(T)
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            console.error(error)
            
        }
      

    }, [router.query]);

   

   
    const CheckLogin = async (T)  => {
        const sendUM = { JwtToken: T }
        const data = await fetch("/api/V3/auth/CheckAccount", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (!parsed.ReqData.SatusData) {
                    setIsLogin(false)
                } 

            })
    };
    const Logout = async (T) => {
        let text = "Do you really want to logout ?";
        if (confirm(text) == true) {
            localStorage.clear()
            router.push('/')
        } 
       
    };

    return (
        <CheckloginContext.Provider value={{ Data, IsLogin, JwtToken, Logout }}>
            {props.children}
        </CheckloginContext.Provider>
    )

}
export default CheckloginStates;