import { useState } from "react";
import Navbar from "../components/Navbar";
import Popup from "../components/Popup";
import Sell from "../components/Sell";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [openPopup,setOpenPopup] = useState(false);
  
  return (<div className="h-screen"  style={{backgroundColor:"#1b203d"}}>
    <Navbar className="z-10"/>
    <Sidebar openPopup={openPopup} setOpenPopup={setOpenPopup} className="z-[-1]"/>
    
    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} >
        <Sell openPopup={openPopup} setOpenPopup={setOpenPopup}/>
    </Popup>
    </div>
  )
}

export default Dashboard;