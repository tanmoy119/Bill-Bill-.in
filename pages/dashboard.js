import { useState } from "react";
import Popup from "../components/Popup";
import Sell from "../components/Sell";

const dashboard = () => {
  const [openPopup,setOpenPopup] = useState(false);
  return (<>
    <div onClick={()=>setOpenPopup(true)} className="cursor-pointer">dashboard</div>
    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} >
        <Sell/>
    </Popup>
    </>
  )
}

export default dashboard;