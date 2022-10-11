import styled from "styled-components";
import axios from "axios";
import {useState} from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Addstock = ({setComponent}) => {
  const url = "https://billbil-api.herokuapp.com/app/v1/add/item"
  const [data, setData] = useState({
    name:"",
    qty:"",
    sprice:"",
    bprice:"",
    unit:""
    
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
              unit:data.unit
            
          }
        });
        if(res.status===201){
         
          notifySuccess();
        //  setTimeout(setComponent("In Stock"), 10000);
          
        }else{
          notifyError(res.data.message);
        }
        

        console.log(res);
  }

  const rowdata=["kg","Liter","Pice","Meter"]

  const defaultProps = {
    options: rowdata,
    getOptionLabel: (option) => option,
  };


  const notifySuccess = () =>{
    toast.success('Iten added Successfully', {
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
    <Main className=" h-full  min-w-[543.172px] bg-[#272c4a] flex flex-row justify-center items-center p-6 rounded-lg">
      <form className="grid grid-cols-3" onSubmit={submit}>
       
        <div className="flex flex-col m-2 col-span-2">
          <label className="text-[#ea580c] text-xl" >Name</label>
          <input onChange={inputEvent} name="name" value={data.name} type="text" className="rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Item Name" />
        </div>

        <div className="flex flex-col m-2">
          <label className=" text-[#ea580c] text-xl" >Quantity</label>
          <input onChange={inputEvent} name="qty" value={data.qty} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Quantity" />
         
        </div>
        <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        clearOnEscape
        onChange={(event, newValue) => {
          
          setData((prevalue)=>{
            
            data.unit = (newValue)? newValue:""
           return {
            ...prevalue
           }
          });
        }}
        renderInput={(params) => (
          <TextField style={{cursor:'pointer'}} {...params} label="Select Unit" variant="standard" />
        )}
        className="text-white rounded-md bg-white p-2 m-2 mt-3"
      />
        
        
       
        <div className="flex flex-col m-2">
          <label className="text-[#ea580c] text-xl" >Buying price</label>
          <input onChange={inputEvent} name="bprice" value={data.bprice} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Buying price" />
        </div>
        
        <div className="flex flex-col m-2">
          <label className="text-[#ea580c] text-xl" >Selling price</label>
          <input onChange={inputEvent} name="sprice" value={data.sprice} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Selling price" />
        </div>
        
        <div>
        <button type="submit" className="bg-green-700 hover:bg-green-600 rounded-md m-4 p-2 text-gray-300">Add</button>
        </div>
        
      </form>
      
    </Main>
    <ToastContainer className="z-10"/>
    </>
  )
}

export default Addstock;

const Main = styled.div`
.num::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

`