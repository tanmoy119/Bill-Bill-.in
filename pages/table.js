import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

 const TAX_RATE = 0.07;

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }





// const invoiceSubtotal = subtotal(row);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
    const [data,setData] = React.useState({
        title:'',
        qty:'',
        price:''
      });


    const [row,setRow] = React.useState([]);
  

    const addArr = ()=>{
        setRow((p)=>{
            return [
                ...p,{title:'',qty:'',price:''}
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
           return {
            ...prevalue,
            [name]:value
          }
        });


      


      }
  return (
    <TableContainer component={Paper}>
        <button onClick={addArr}>btn</button>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row,n) => (
            <TableRow key={n}>
              <TableCell><input type="string" name='title' value={row.title} onChange={(e)=> inputEvent(e,n)}  /></TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right"><input type="string" name='qty' value={row.qty} onChange={(e)=> inputEvent(e,n)}  /></TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">sdfsd</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">dfsd</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">sdfd</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
