import styled from 'styled-components';
import React from 'react'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import  { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {
    const url = "https://billbil-api.herokuapp.com/app/v1/login";
    const url2 = "https://billbil-api.herokuapp.com/app/v1/verify/jwt"

    const [cookies, setCookie] = useCookies('jwt');
    const router =  useRouter();
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


  const Cokies = new Cookies();


  const  token = Cokies.get('jwt');
  
  
 

  // Server-render loading state

  useEffect(()=>{
    
    
   (async ()=>{
    if(token){
      //router.push("/");
    
     const res = await axios({
      method: 'post',
      url: url2,
      headers: {}, 
      data: {
          token:token
        
      }
    }); 
    const user = res.data; 
     
    if(res.status == 200){
      router.push("/dashboard");
    }else{
        Cokies.remove('jwt');;
    }
    }
  })()
  },[url]);



    const submit = async (e)=>{
            e.preventDefault();

            const res = await axios({
                method: 'post',
                url: url,
                headers: {}, 
                data: {
                      email: data.email,
                      password: data.password
            
                     }
            });
            console.log();

            const token = res.data.token;
            if(token){
                notifySuccess();
                setCookie('jwt', token , {path:'/'});
                router.push('/dashboard');
            }else{
                notifyError(res.data.error);
            }




    }

    const notifySuccess = () =>{
        toast.success('Log In Successfully', {
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
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        }
  return (<>
    <Navbar login/>
    <Cointainer className='w-screen grid grid-cols-4'>
        <div className="bg-green-500 h-screen"> .</div>
        <div className="col-span-3 flex justify-center text-center items-center h-screen">
            <div className=" ">
                <h1 className='font-semibold text-[38px] mb-[4rem] tracking-widest'>Log in</h1>

                <form onSubmit={submit} className='flex flex-col  tracking-widest text-gray-500 justify-center items-center w-80'>
                    <input className='border border-gray-500 appearance-none outline-none rounded-md p-3 w-80 tracking-widest' type="email" name='email' value={data.email} onChange={inputEvent} placeholder='email address' />
                    <input className='border border-gray-500 appearance-none outline-none rounded-md p-3 w-80 mt-4 tracking-widest' type="password" name='password' value={data.password} onChange={inputEvent} placeholder='password' />
                    <button type='Submit' className='border border-amber-200 mt-4 rounded-md py-1 w-8/12 hover:bg-amber-200 
                    hover:text-amber-800 shadow-md' >Log in</button>
                </form>
            </div>

        </div>
    </Cointainer>
    <ToastContainer className="z-10"/>
    </>
  )
}

export default login;

const Cointainer = styled.div`

`