import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
import axios from 'axios';


const Navbar = ({login}) => {
    const url = "https://billbil-api.herokuapp.com/app/v1/verify/jwt";
    const url2 = "https://billbil-api.herokuapp.com/app/v1/logout"
    const [open,setOpen] = useState(false);
    const [user,setUser] = useState(false);
    
    let Links = [
        {name:"HOME",link:"/"},
        {name:"DASHBOARD",link:"/dashboard"},
        {name:"ABOUT US",link:"/aboutus"},
        {name:"CONTACT US",link:"/CONTACT US"},
        {name:"LOG IN",link:"/login"}
    ]

    const router =  useRouter();

    const Cokies = new Cookies();
  
  
    const  token = Cokies.get('jwt');
    
    
   
  
    // Server-render loading state
  
    useEffect(()=>{
      
      
     (async ()=>{
    //   if(!token){
    //     router.push("/");
    //   }
       const res = await axios({
        method: 'post',
        url: url,
        headers: {}, 
        data: {
            token:token
          
        }
      }); 
        const udata = res.data ; 
       
      if(!udata.verified){
       // router.push("/");
      }else if(res.status == 200 ){
       setUser(udata);
      }
    })()
    },[url]);


    const logout = async (token)=>{

        const res = await axios({
          method: 'post',
          url: url2,
          headers: {}, 
          data: {
            token:token 
            
          }
        });
        router.push('/login');
       Cokies.remove('jwt');
    
    
      }
  return (
   <>
   <div className={`shadow-md w-full fixed top-0 left-0 ${(login)?'bg-[#272c4a]':''} `}>
    <div className="md:flex items-center justify-between  py-4  text-black">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[poppins] text-gray-800">
            <span className="text-3xl text-indigo-600 mr-1 pt-2"></span>
            <span className='text-green-300  pl-10'>Bill Bill</span>
        </div>
        <div onClick={()=>setOpen(!open)} className=" absolute right-8 top-5 cursor-pointer md:hidden">
        {open?<CloseIcon sx={{ fontSize: 27, color:"gray" }}/>:<MenuIcon sx={{ fontSize: 27, color:"gray" }}/>}
        </div>
        <ul className={`md:flex md:items-center absolute md:static backdrop-blur-lg md:z-auto z-[-1] left-0 w-full md:w-auto pl-9 
        transition-all duration-500 ease-in ${open?'top-20 opacity-100':'top-[-490px]'} `}>
            {
                Links.map((cl)=>{
                    if(user && cl.name==="LOG IN"){
                        return(<li key={cl.name} className="md:mr-8 text-base text-gray-200 hover:text-gray-400 duration-300  md:my-0 my-7 ml-10">
                    
                       <button onClick={()=>logout(token)}> <Avatar alt='img' src='https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png'/></button>
                        
                        </li>);
                    }
                    if(!user && cl.name==="DASHBOARD"){
                        return;
                    }
                    return (
                    <li key={cl.name} className="md:mr-8 text-base text-gray-200 hover:text-gray-400 duration-300  md:my-0 my-7">
                    <Link className='' href={cl.link}>
                    {cl.name}
                    </Link>
                    </li>
                    )
                })
            }
        </ul>
    </div>
   </div>
   </>
  )
}

export default Navbar;