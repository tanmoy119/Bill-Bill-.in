import styled from 'styled-components';
import React from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar';

const login = () => {
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

    const submit = (e)=>{
            e.preventDefault();

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
    </>
  )
}

export default login;

const Cointainer = styled.div`

`