import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var i ;
const TAX_RATE = 0.0;

const top100Films = [
    { title: 'Bulb-9wat(Anchore)', year: 90 },
    { title: 'Bulb-5wat(Anchore)', year: 80 },
    { title: 'Bulb-12wat(Anchore)', year: 120 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: 'Bulb-40wat(Anchore)', year: 450 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Nat-12', year: 1957 } 
  ];




const Sell = (props) => {
  const {openPopup,setOpenPopup,user }= props;
  const [value, setValue] = useState(null);
  const [row, setRow] = useState([]);
  const [data,setData] = React.useState({
    title:'',qty:'',price:'',discount:'',amount:''
  });
  const [total, setTotal] = useState({})

  const [rowdata,setRowData] = React.useState([]);


  //.....................................................Requests.................................................
  const url=`https://billbil-api.herokuapp.com/app/v1/get/item?id=${user._id}`
  const url2="https://billbil-api.herokuapp.com/app/v1/sell/item"
 // const url=`http://localhost:5000/app/v1/get/item?id=${user._id}`
 // const url2="http://localhost:5000/app/v1/sell/item"
  useEffect(()=>{
    async function fetchData(){
        const request = await axios.get(url);
        //console.log(request.data);
        setRowData(request.data);
        return request;
    }

    fetchData();
}, [url]);



  const [userData,setUserData] = useState({
    name:"",
    email:"",
    number:"",
    address:"",
    referral:"",
    paidamount:0,
    status:""
  })
    const defaultProps = {
        options: rowdata,
        getOptionLabel: (option) => option.name,
      };
    
      const flatProps = {
        options: top100Films.map((option) => option.name),
      };
    
      const addArr = (e)=>{
        e.preventDefault();
        setRow((p)=>{
            return [
                ...p,{title:'',qty:'',price:'',discount:'',amount:'',unit:""}
            ]
        });
    }

    const removeRow = (e)=>{
      e.preventDefault();
     // //console.log(n);
      //console.log(row);
      //const array = row;
      row.pop();
      setRow(()=>{
        
        return[...row];
      })
       //console.log(...row);
      
    }

    const inputEvent = (e,n)=>{
      const {name,value} = e.target;
      setData((prevalue)=>{
         return {
          ...prevalue,
          [name]:value
        }
      });
      setData((prevalue)=>{
          row[n][name] = prevalue[name]
          row[n].amount =(row[n].price*row[n].qty)-(row[n].price*row[n].qty)*row[n].discount/100
         // //console.log(row[n].amount);
         return {
          ...prevalue,
          [name]:value
        }
      });
     

          setTotal(()=>{
            function ccyFormat(num) {
        
              ////console.log(num);
              if (num!=0) {
               var value= num.toFixed(2);
                return value;
              }
              return num;
            }
            
                function subtotal(items) {
                  return items.map((c) => c.amount).reduce((sum, i) => sum + i, 0);
                  
                }
               // //console.log(row);
              const invoiceSubtotal = subtotal(row);
              const invoiceTaxes = TAX_RATE * invoiceSubtotal;
              const invoiceTotal = invoiceTaxes + invoiceSubtotal;
             // //console.log(invoiceSubtotal);
              const stotal= ccyFormat(invoiceSubtotal);
              const tax =   ccyFormat(invoiceTaxes);
              const mtotal= ccyFormat(invoiceTotal);
             // //console.log(stotal);
            return{
            stotal:stotal,
            tax:tax,
            mtotal:mtotal
          }
            });
    }

    const inputEvent2 = (R)=>{
    
      const {name,value} = R.target;
    
      setUserData((prevalue)=>{
        
        ////console.log(prevalue);
        return {
            ...prevalue,
            [name]: value
  
        };
      })
  
      setUserData((pv)=>{
       console.log(pv);
       console.log(total);
        let status="-"
      
        
        if ((pv.paidamount-total.mtotal)>=0) {
          status="Paid";
           
  
        }else if (pv.paidamount<=0) {
          status="Due";
           
  
        } else {
          status="Pending";
        }
  
        return {
          ...pv,
          [name]: value,
          status:status
  
      };
      })
    }



   // //console.log(total);

   const submit = async (e)=>{
    e.preventDefault();
    //console.log(row);
     const res = await axios({
          method: 'post',
          url: url2,
          headers: {}, 
          data: {
              name:userData.name,
              email:userData.email,
              number:userData.number,
              address:userData.address,
              referral:userData.referral,
              paidAmount:userData.paidamount,
              status:userData.status,
              items:row,
              subtotal:total.stotal,
              tax:TAX_RATE,
              total:total.mtotal,
              userId: user._id,
              date:new Date().toString()

          }
        });
        if(res.status===201){
         
          notifySuccess();
         // setOpenPopup(false);
        }else{
          notifyError(res.data.message);
        }
        console.log(res);
        
  }
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
    <Form onSubmit={submit}>
    <div className='flex m-4'>
      <div className="mr-3">
      <div className="">
        <label className=''>
          Name
        </label>
        <input type="text"  name='name' value={userData.name} onChange={inputEvent2}  placeholder='Name' className='rounded-md px-4 py-2 mt-2 outline-none w-full border-2 border-gray-400' />
      </div>
      <div className="">
        <label className=''>
          Email
        </label>
        <input type="email"  name='email' value={userData.email} onChange={inputEvent2}  placeholder='Email' className='rounded-md px-4 py-2 mt-2 outline-none w-full border-2 border-gray-400' />
      </div>
      <div className="">
        <label className=''>
          Phone Number
        </label>
        <input type="number"  name='number' value={userData.number} onChange={inputEvent2}  placeholder='Phone Number' className='num rounded-md px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none' />
      </div>
      </div>
      <div className="w-[400px] ">
        <div className="">
        <label className=''>
          Address
        </label>
        <textarea type="text"  name='address' value={userData.address} onChange={inputEvent2}  placeholder='Address' className='rounded-md px-4 py-2 mt-2 outline-none  w-full h-[120px] border-2 border-gray-400 appearance-none' />
        </div>
        <div className="">
        <label className=''>
        Referral
        </label>
        <input type="text"  name='referral' value={userData.referral} onChange={inputEvent2}  placeholder='Referral Name or Number' className='rounded-md px-4 py-2 mt-2 outline-none  w-full border-2 border-gray-400 appearance-none' />
          
        </div>
      </div>
    </div>
    <Tablecontainer component={Paper}>
    <PlaylistAddIcon onClick={addArr} className="cursor-pointer "/>
    <DeleteSweepIcon onClick={(e)=> removeRow(e)} className='text-green-400 cursor-pointer'/>
    <Table sx={{ minWidth: 700 }} aria-label="simple">
        <TableHead >
            <TableRow style={{backgroundColor:"#f1f4f8" }} >
                <Tablecell> No.</Tablecell>
                <Tablecell>ITEMS/PRODUCTS</Tablecell>
                <Tablecell>QTY</Tablecell>
                <Tablecell>PRICE(₹)</Tablecell>
                <Tablecell>DISCOUNT</Tablecell>
                <Tablecell>AMOUNT</Tablecell>
            </TableRow>
        </TableHead>

        <TableBody>
            {row.map((row,n) => (
            <TableRow className='TR'
                // key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                {n+1}
                </TableCell>
                <TableCell >
                <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        clearOnEscape
        onChange={(event, newValue) => {
         // console.log(newValue);
          setValue(newValue);
          //console.log(value);
          setValue((prevalue)=>{
            
            row.title = (newValue)? newValue.name:""
            row.price = (newValue)? newValue.sellingPrice:""
            row.unit = (newValue)? newValue.unit:""
           return {
            ...prevalue
           }
          });
        }}
        renderInput={(params) => (
          <TextField style={{cursor:'pointer'}} {...params} label="Select Product" variant="standard" />
        )}
      />
      </Stack>
                </TableCell>


      <TableCell ><input style={{color:'rgb(39 167 166 / 90%)'}}  className='qtyInput' type='number' name='qty' value={row.qty} onChange={(e)=> inputEvent(e,n)}/><span>{(row.unit)}</span></TableCell>
      <TableCell ><span className='Rprice'>{row.price}</span></TableCell>
      <TableCell ><input style={{color:'#7e0505'}} maxlength="100" className='qtyInput' type='number' name='discount' value={row.discount} onChange={(e)=> inputEvent(e,n)}/>%</TableCell>
      <TableCell >{row.amount}</TableCell>
      <div className="icon">
      {/* <button style={{border:"none",backgroundColor:"transparent"}} onClick={(e)=> removeRow(e,n)} ><DeleteSweepIcon className='D'/></button> */}
      </div>
            </TableRow>
             ))}

        <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{total.stotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{total.tax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{total.mtotal}</TableCell>
          </TableRow>
        </TableBody>
        

    </Table>
</Tablecontainer>
<button className="btn" onClick={(e)=>{e.preventDefault(), setOpenPopup(false)}}>CANCEL</button>
<div className='flex m-4 pl-[1000px]'>
      <div className="mr-3">
      <div className="">
        <label className=''>
        Paid amount
        </label>
        <input type="number" name='paidamount' value={userData.paidamount} onChange={inputEvent2} placeholder='Paid amount'  max={total.mtotal} className='num rounded-md px-4 py-2 mt-2 outline-none w-full border-2 border-gray-400' />
      </div>
      {/* <div className="">
        <label className=''>
          Email
        </label>
        <input type="email" placeholder='Email' className='rounded-md px-4 py-2 mt-2 outline-none w-full border-2 border-gray-400' />
      </div> */}
      <div className="m-4 ">
        <label className='bg-[#60eb88] p-2 rounded-xl text-[#ac2c2c] '>
          {userData.status}
        </label>
        </div>
      </div>
  
    </div>
    <button type='submit' className='ml-[1400px] border-solid border-[2px] border-green-500 rounded-lg p-2 hover:bg-green-600 hover:text-white transition-all ease-in '>Submit</button>
    <ToastContainer className="z-10"/>
</Form>
</>
  )
}

export default Sell;

const Form = styled.form`
.num::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

`

const Tablecontainer = styled(TableContainer)`

.TR:hover{
   background-color:#eaedf1;
   .C{
    opacity: 1;
   }
   .D{
    opacity: 1;
   }
}
.icon{
    position: absolute;
    right:150px;
    //top: 500px;
    .C{
        margin: 10px 7px 0 0 ;
        cursor: pointer;
        color:#2a9dce;
        opacity: 0;
    }
    .C:hover{
        color: #9fd62a;
    }
    .D{
        margin: 10px 7px 0 0 ;
        cursor: pointer;
        color:#2a9dce;
        opacity: 0;
    }
    .D:hover{
        color: #9fd62a;

    }
}

.Pvalue{
    margin: 10px 0;
    width: 50px;
    background-color: #2cbf6e;
    padding: 2px 10px;
    border-radius: 15px;
    color: white;
  }
  .Fvalue{
    margin: 10px 0;
    width: 50px;
    background-color: #bf2c2c;
    padding: 2px 10px;
    border-radius: 15px;
    color: white;
  }
  .Rprice{
    margin: 10px 0;
    width: 50px;
    background-color: #3fd0298a;
    padding: 2px 10px;
    border-radius: 15px;
    color: white;
    font-size: 17px;
    color: black;
  }

  .qtyInput{
    width: 80px;
    border:none;
    border-bottom: 2px solid silver;
    outline: none;
    background-color:transparent;
    font-size: 17px;

    
  }
  .qtyInput::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  `

  const Tablecell = styled(TableCell)`
    font-size: 20px;

   
  `