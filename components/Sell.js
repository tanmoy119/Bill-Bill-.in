import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

var i ;
const TAX_RATE = 0.07;

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];




const Sell = () => {
  const [value, setValue] = useState(null);
  const [row, setRow] = useState([]);
  const [data,setData] = React.useState({
    title:'',qty:'',price:'',discount:'',amount:''
  });
  const [total, setTotal] = useState({
    stotal:'',
    tax:'',
    mtotal:''
  })
    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.title,
      };
    
      const flatProps = {
        options: top100Films.map((option) => option.title),
      };
    
      const addArr = ()=>{
        setRow((p)=>{
            return [
                ...p,{title:'',qty:'',price:'',discount:'',amount:''}
            ]
        });
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
          console.log(row[n].amount);
         return {
          ...prevalue,
          [name]:value
        }
      });
     

          setTotal(()=>{
            function ccyFormat(num) {
              return `${num.toFixed(2)}`;
            }
            
                function subtotal(items) {
                  return items.map((c) => c.amount).reduce((sum, i) => sum + i, 0);
                  
                }
              const invoiceSubtotal = subtotal(row);
              const invoiceTaxes = TAX_RATE * invoiceSubtotal;
              const invoiceTotal = invoiceTaxes + invoiceSubtotal;
              const stotal= ccyFormat(invoiceSubtotal);
              const tax =   ccyFormat(invoiceTaxes);
              const mtotal= ccyFormat(invoiceTotal);
              console.log(invoiceSubtotal);
            return{
            stotal:stotal,
            tax:tax,
            mtotal:mtotal
          }
            });
    }
  
  return (
    <Tablecontainer component={Paper}>
      <button onClick={addArr} >add</button>
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
          setValue(newValue);
          setValue((prevalue)=>{
            console.log(row);
            console.log(newValue);
            row.title = (newValue)? newValue.title:""
            row.price = (newValue)? newValue.year:""
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


      <TableCell ><input style={{color:'rgb(39 167 166 / 90%)'}}  className='qtyInput' type='number' name='qty' value={row.qty} onChange={(e)=> inputEvent(e,n)}/></TableCell>
      <TableCell ><span className='Rprice'>{row.price}</span></TableCell>
      <TableCell ><input style={{color:'#7e0505'}} maxlength="100" className='qtyInput' type='number' name='discount' value={row.discount} onChange={(e)=> inputEvent(e,n)}/>%</TableCell>
      <TableCell >{row.amount}</TableCell>

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
  )
}

export default Sell;

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