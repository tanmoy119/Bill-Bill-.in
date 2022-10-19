import React from 'react'
import Instockformattable from "./Instockformattable";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fontSize } from '@mui/system';
import { useState } from 'react';
import styled from 'styled-components';
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Instockformat = ({popupData,setOpenPopup}) => {
 // //console.log(popupData);
  const url = `https://billbil-api.herokuapp.com/app/v1/update/item?id=${popupData._id}`
 // const url = `http://localhost:5000/app/v1/update/item?id=${popupData._id}`
  const [input,setInput] = useState(false);

  const close = ()=>{
    setOpenPopup(false)
    setInput(false)
  }

  const [data, setData] = useState({
    name:popupData.name,
    qty:popupData.quantity,
    sprice:popupData.sellingPrice,
    bprice:popupData.buyingPrice,
    unit:popupData.unit,
    pfrom:popupData.sealler
    
  });


  const inputEvent = (e)=>{
    const {name,value} = e.target;
    setData((prevalue)=>{
       return {
        ...prevalue,
        [name]:value
      }
    });
  };

  const submit = async (e)=>{
    e.preventDefault();
     const res = await axios({
          method: 'post',
          url: url,
          headers: {}, 
          data: {
              name:data.name,
              quantity:data.qty,
              buyingPrice:data.bprice,
              sellingPrice:data.sprice,
              unit:data.unit,
              userId: popupData.userId,
              sealler: data.pfrom,
              date: new Date()
            
          }
        });
        if(res.status===201){
         
          notifySuccess();
        //  setTimeout(setComponent("In Stock"), 10000);
          
        }else{
          notifyError(res.data.message);
        }
        

        //console.log(res);
  }

  const notifySuccess = () =>{
    toast.success('Updated Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const notifyError = (err) =>{
    toast.error("err", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
//console.log(popupData);
  return (
    <>
    <Cointainer className="">
      <button  className=' text-blue-900  absolute' onClick={()=>close()}><ArrowBackIcon sx={{fontSize:"30px"}}/></button>
    <div className="w-[780px] h-screen flex flex-col  ml-auto mr-auto pr-[35px] pl-[35px]  border shadow-2xl">
    <div className="h-1/2 grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-center items-center  ">
          <h1 className='text-[55px] tracking-widest font-semibold'>LATEST</h1>

        <div className="flex text-sm">
          <div className="flex flex-col mr-3 ml-4">
            <h1 className='decoration-'>INVOICE NUMBER</h1>
            <span>00001</span>
          </div>
          <div className="flex flex-col">
            <h1 className='decoration-'>DATE OF ISSUE</h1>
            <span>{new Date(popupData.date).toLocaleString()}</span>
          </div>
          </div>
        </div>
        <div className=" ">
          <h1> </h1>
        </div>

        <div className="flex flex-col justify-center pl-9  ">
         <div className="">
          <h1 className='text-[20px]'>Current Price</h1>
          <h1 >₹ {popupData.sellingPrice}</h1>
          <h1 >{popupData.address}</h1>
          <h1 >West Bengal</h1>
          <h1 >{popupData.number}</h1>
         </div>
          
        </div>
        <div className="flex flex-col justify-center  ">
        <h1 className='font-medium m-1'>{popupData.name}</h1>
        <h1 className=''>Buying Price-{popupData.buyingPrice}</h1>
        <h1 className=''>Selling Price-{popupData.sellingPrice}</h1>
        <h1 className=''>Last Purchase From - {popupData.sealler}</h1>
        <h1 className=''>In Stock - {popupData.quantity}</h1>
        <h1 className=''>barmanhardwareandelectronics@gmail.com</h1>
          
        </div>
    </div>
    <Instockformattable popupData={popupData} />

    <div className="  grid grid-cols-1">
      <div className="flex flex-col  m-6 ">

        <div className="">
          <h1 className={`text-[25px] ${(popupData.status=="Paid")?"text-green-500":(popupData.status=="Due")?"text-red-600":"text-orange-400"}`} >{popupData.status}</h1>
          <h2 className=''>{(popupData)?
          <>
          {(!input)?<>
            <button className='border  border-green-600 p-1 mt-2 rounded-md' onClick={()=>setInput(true)} >EDIT</button></>:<></>
          }
          
          {(input)?<>
     <form className="grid grid-cols-3 " onSubmit={submit}>
       
       <div className="flex flex-col m-2 col-span-2">
         <label className="text-[#ea580c] text-xl" >Name</label>
         <input onChange={inputEvent} name="name" value={data.name} type="text" className="rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Item Name" />
       </div>

       <div className="flex flex-col m-2">
         <label className=" text-[#ea580c] text-xl" >Quantity</label>
         <input onChange={inputEvent} name="qty" value={data.qty} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Quantity" />
        
       </div>
       
       
      
       <div className="flex flex-col m-2">
         <label className="text-[#ea580c] text-xl" >Buying price</label>
         <input onChange={inputEvent} name="bprice" value={data.bprice} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Buying price" />
       </div>
       
       <div className="flex flex-col m-2">
         <label className="text-[#ea580c] text-xl" >Selling price</label>
         <input onChange={inputEvent} name="sprice" value={data.sprice} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Selling price" />
       </div>

       <div className="flex flex-col m-2">
         <label className="text-[#ea580c] text-xl" >Purchase From </label>
         <input onChange={inputEvent} name="pfrom" value={data.pfrom} type="String" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="purchase from " />
       </div>
       
       <div>
       <button type="submit" className="bg-green-700 hover:bg-green-600 rounded-md m-4 p-2 text-gray-300">Add</button>
       </div>
       
     </form>
          </>:<></>}
          </>:(popupData.status=="Pending")?
            <><h2>₹{(popupData.total-popupData.paidAmount).toFixed(2)}</h2>
            {(!input)?<>
              <button className='border  border-green-600 p-1 mt-2 rounded-md' onClick={()=>setInput(true)} >Repay Bill</button></>:<></>
            }
            
            {(input)?<>
            <form onSubmit={submit} className=" flex flex-col">
              <input type="Number" name="amount" className='inp border border-gray-500 appearance-none outline-none m-2' onChange={inputEvent}  value={data.amount} />
              <button type='Submit' className='border border-pink-600 w-1/2 p-1 rounded-lg  '>Submit</button>
            </form>
            </>:<></>}
            </>
          :""}</h2>
        </div>
      </div>



    </div>
    
    </div>
    </Cointainer>
    <ToastContainer className="z-10"/>
    </>
  )
}

export default Instockformat;

const Cointainer = styled.div`
 .inp::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

`


