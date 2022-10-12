import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Popup from "../components/Popup";
import Sell from "../components/Sell";
import Sidebar from "../components/Sidebar";
import  { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';
import axios from 'axios'

const Dashboard = () => {
  const url ="https://billbil-api.herokuapp.com/app/v1/verify/jwt"

  const [openPopup,setOpenPopup] = useState(false);
  const [user, setUser] = useState({});

  const router =  useRouter();

  const Cokies = new Cookies();


  const  token = Cokies.get('jwt');

  useEffect(()=>{
    
    
    (async ()=>{
     if(!token){
       router.push("/");
     }
      const res = await axios({
       method: 'post',
       url: url,
       headers: {}, 
       data: {
           token:token
         
       }
     }); 
     const udata = res.data; 
      
     if(!udata.verified){
       router.push("/");
     }else if(res.status == 200 ){
     setUser(udata);
     }
   })()
   },[url]);
  
  return (<div className="h-screen"  style={{backgroundColor:"#1b203d"}}>
    <Navbar className="z-10"/>
    <Sidebar openPopup={openPopup} setOpenPopup={setOpenPopup} user={user} className="z-[-1]"/>
    
    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} >
        <Sell openPopup={openPopup} setOpenPopup={setOpenPopup} user={user}/>
    </Popup>
    </div>
  )
}

export default Dashboard;