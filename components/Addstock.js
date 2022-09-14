import styled from "styled-components";
import axios from "axios";
import {useState} from "react";

const Addstock = () => {

  const [data, setData] = useState({
    name:"",
    qty:"",
    sprice:"",
    bprice:""
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

  return (
    <Main className=" h-full  min-w-[543.172px] bg-[#272c4a] flex flex-row justify-center items-center p-6 rounded-lg">
      <form className="flex">
        <div>
        <div className="flex flex-col m-2">
          <label className="text-[#ea580c] text-xl" >Name</label>
          <input onChange={inputEvent} name="name" value={data.name} type="text" className="rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Item Name" />
        </div>

        <div className="flex flex-col m-2">
          <label className=" text-[#ea580c] text-xl" >Quantity</label>
          <input onChange={inputEvent} name="qty" value={data.qty} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Quantity" />
        </div>
        </div>
        
        <div>
        <div className="flex flex-col m-2">
          <label className="text-[#ea580c] text-xl" >Buying price</label>
          <input onChange={inputEvent} name="bprice" value={data.bprice} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Buying price" />
        </div>
        
        <div className="flex flex-col m-2">
          <label className="text-[#ea580c] text-xl" >Selling price</label>
          <input onChange={inputEvent} name="sprice" value={data.sprice} type="Number" className="num rounded-md text-gray-500  px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none" placeholder="Selling price" />
        </div>
        </div>
        <div>
        <button className="bg-green-700 hover:bg-green-600 rounded-md m-4 p-2 text-gray-300">Add</button>
        </div>
        
      </form>
    </Main>
  )
}

export default Addstock;

const Main = styled.div`
.num::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

`