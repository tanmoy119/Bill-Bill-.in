import React from 'react'
import Billformattable from "./Billformattable";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fontSize } from '@mui/system';
import { useState } from 'react';
import styled from 'styled-components';
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Billformat = ({popupData,setOpenPopup}) => {
  //console.log(popupData);
  const url = "https://billbil-api.herokuapp.com/app/v1/bills/update"
  const [input,setInput] = useState(false);

  const [data, setData] = useState("");

  const inputEvent = (e)=>{
      const {name,value} = e.target;

      setData((prevalue)=>{
          return{
              ...prevalue,
              [name]:value
          }
          
      })


  }

  const close = ()=>{
    setOpenPopup(false)
    setInput(false)
  }

  const submit = async (e)=>{
    e.preventDefault();

    const res = await axios({
      method: 'post',
      url: url,
      headers: {}, 
      data: {
          id:popupData._id,
          amount: data.amount

      }
    });
    console.log(res);
    if(res.status==200){
      notifySuccess();
    }else{
      notifyError();
     
    }
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
          <h1 className='text-[55px] tracking-widest font-semibold'>INVOICE</h1>

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
          <h1 className='text-[20px]'>BILLED TO</h1>
          <h1 >{popupData.name}</h1>
          <h1 >{popupData.address}</h1>
          <h1 >West Bengal</h1>
          <h1 >{popupData.number}</h1>
         </div>
          
        </div>
        <div className="flex flex-col justify-center  ">
        <h1 className='font-medium m-1'>BARMAN HARDWARE & ELECTRONICS</h1>
        <h1 className=''>Siliguri Road</h1>
        <h1 className=''>Gumanihat, Lotapota, Cooch Behar</h1>
        <h1 className=''>735211</h1>
        <h1 className=''>9330629437</h1>
        <h1 className=''>barmanhardwareandelectronics@gmail.com</h1>
          
        </div>
    </div>
    <Billformattable popupData={popupData} />

    <div className="  grid grid-cols-2">
      <div className="flex flex-col  m-6 ">
        <h1 className='tracking-widest'>INVOICE TOTAL</h1>
        <h2 className='text-[30px]'>₹{popupData.total}</h2>

        <div className="">
          <h1 className={`text-[25px] ${(popupData.status=="Paid")?"text-green-500":(popupData.status=="Due")?"text-red-600":"text-orange-400"}`} >{popupData.status}</h1>
          <h2 className=''>{(popupData.status=="Due")?
          <><h2>₹{popupData.total}</h2>
          {(!input)?<>
            <button className='border  border-green-600 p-1 mt-2 rounded-md' onClick={()=>setInput(true)} >Repay Bill</button></>:<></>
          }
          
          {(input)?<>
          <form onSubmit={submit} className=" flex flex-col">
            <input type="Number" className='inp border border-gray-500 appearance-none outline-none m-2' />
            <button type='submit' className='border border-pink-600 w-1/2 p-1 rounded-lg  '>Submit</button>
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


      <div className="flex justify-end m-6 ">
      <div className="flex flex-col justify-center text-right mr-6 ">
      <h1>SUBTOTAL</h1>
      <h1>DISCOUNT</h1>
      <h1>(TAX RATE)</h1>
      <h1>TAX</h1>
      <h1>TOTAL</h1>
      </div>

      <div className="flex flex-col justify-center  ">
      <h1>{popupData.subtotal}</h1>
      <h1>0</h1>
      <h1>{popupData.tax}</h1>
      <h1>0</h1>
      <h1>{popupData.total}</h1>
      </div>


      </div>

    </div>
    
    </div>
    </Cointainer>
    <ToastContainer className="z-10"/>
    </>
  )
}

export default Billformat;

const Cointainer = styled.div`
 .inp::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

`


