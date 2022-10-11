import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SellIcon from '@mui/icons-material/Sell';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import Instock from './Instock';
import Outofstock from './Outofstock';
import Bills from "../components/Bills";
import Due from "../components/Due";
import Addstock from "../components/Addstock";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import Expense from './Expense';
import Billformat from './Billformat';

const Sidebar = ({openPopup, setOpenPopup}) => {
    const [open,setOpen] = useState(false);
    const [component,setComponent] = useState("");
    
    const Menus = [
        {title:"Dashboard"},
        {title:"Sell"},
        {title:"In Stock"},
        {title:"Out-of-Stock"},
        {title:"Bill's"},
        {title:"Due"},
        {title:"Add to Stock"},
        {title:"Expenses"}
    ]
  return (
    <div className="flex fixed">
    <div className={`${open?"w-72": "w-20"} duration-300 md:h-[873px] top-[64px]  bg-[#272c4a]  relative  `}>
        <div className="absolute bg-white cursor-pointer rounded-full -right-3 top-9 w-7 border-[1.5px] border-[#14065a]  "
         onClick={()=>setOpen(!open)}>
            {open?<KeyboardArrowLeftIcon/>:<KeyboardArrowRightIcon />}
        </div>
        <div className="flex justify-center">
            <h1 className={`text-xl text-gray-300 m-5 ${!open && "scale-0"} duration-300`}>Dashboard</h1>
        </div>
        <ul className='pt-6'>
            {Menus.map((cl,i)=>(
                <li onClick={()=>((cl.title==="Sell")?setOpenPopup(true):setComponent(cl.title))} key={i} className='text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-4 hover:bg-[#8f8f8fa1] '>
                   {(cl.title==="Dashboard")?<DashboardIcon sx={(!open)?{fontSize:"35px"}:{fontSize:"30"}} className={`text-green-600   duration-300 transition-all`}/>:(cl.title==="Sell")?<SellIcon sx={(!open)?{fontSize:"35px"}:{fontSize:"30"}} className={`text-pink-600   duration-300 transition-all`}/>:
                   (cl.title==="In Stock")?<InventorySharpIcon sx={(!open)?{fontSize:"35px"}:{fontSize:"30"}} className={`text-blue-600   duration-300 transition-all`}/>:(cl.title==="Out-of-Stock")?<RemoveShoppingCartIcon sx={(!open)?{fontSize:"35px"}:{fontSize:"30"}} className={`text-purple-700   duration-300 transition-all`}/>:
                   (cl.title==="Bill's")?<FileCopyIcon sx={(!open)?{fontSize:"35px"}:{fontSize:"30"}} className={`text-orange-600   duration-300 transition-all`}/>:(cl.title==="Due")?<NoteAltIcon sx={(!open)?{fontSize:"35px"}:{fontSize:"30"}} className={`text-red-600   duration-300 transition-all`}/>:(cl.title==="Add to Stock")?<AddShoppingCartIcon sx={(!open)?{fontSize:"35px"}:{fontSize:"30"}} className={`text-red-600   duration-300 transition-all`} />:
                    <MoneyOffIcon sx={(!open)?{fontSize:"35px"}:{fontSize:"30"}} className={`text-red-600   duration-300 transition-all`}/>
                   }<span className={`${!open && "hidden"} origin-left duration-300`}>{cl.title}</span> 
                </li>
            ))}
        </ul>
        </div>
        <div className={`p-7 flex-1 h-screen md:h-[873px] absolute top-16 left-64 flex justify-center pl-auto pr-auto z-[-1]`}>
        {(component==="In Stock")?<Instock/>:(component==="Out-of-Stock")?<Outofstock/>:(component==="Bill's")?<Bills setComponent={setComponent} />:(component==="Due")?<Due setComponent={setComponent}/>
        :(component==="Add to Stock")?<Addstock setComponent={setComponent} />:(component==="Expenses")?<Expense/>:(component==="Billformat")?<Billformat/>: <>
        <h1>Dashboard</h1>
        
        
        </>}
        </div>
    </div>
  )
}

export default Sidebar;