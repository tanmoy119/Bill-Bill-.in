// const Bills = () => {
//   return (
//     <div>Bills</div>
//   )
// }

// export default Bills;

import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';

function createData(name, mobileNumber, dueAmount, date, protein) {
  return {
    name,
    mobileNumber,
    dueAmount,
    date,
    protein,
  };
}

const rows = [
  createData('Cupcake', 9330629437, 3.7, '9/14/2023', 4.3),
  createData('Donut', 452, 25.0, '8/15/2024', 4.9),
  createData('Eclair', 262, 16.0, '8/15/2022', 6.0),
  createData('Frozen yoghurt', 159, 6.0, '8/18/2024', 4.0),
  createData('Gingerbread', 356, 16.0, '10/15/2024', 3.9),
  createData('Honeycomb', 9330629437, 3.2,'8/17/2024', 6.5),
  createData('Ice cream sandwich', 237, 9.0, '8/25/2024', 4.3),
  createData('Jelly Bean', 375, 0.0, '8/15/2027', 0.0),
  createData('Oreo1', 437, 18.0, '8/27/2028', 4.0),
  createData('KitKat', 518, 26.0, '9/10/2024', 7.0),
  createData('Lollipop', 392, 0.2, '11/21/2024', 0.0),
  createData('Oreo2', 437, 18.0, '12/15/2018', 4.0),
  createData('Marshmallow', 9330629437, 0, '8/16/2029', 2.0),
  createData('Oreo3', 437, 18.0, '5/11/2024', 4.0),
  createData('Nougat', 360, 19.0, '7/19/2024', 37.0),
  createData('Oreo4', 437, 18.0, '7/13/2024', 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
 // console.log("touch2");
 //let array1=[];
 array.map((cl)=>{
    
  const n = new Date(cl.date);
  cl.date=n;
  //array1.push(n);
  console.log(cl)
 })
  const stabilizedThis = array.map((el, index) => [el, index]);
 // console.log(stabilizedThis);
 // console.log(array);
  stabilizedThis.sort((a, b) => {
   // console.log("lol");
    const order = comparator(a[0], b[0]);
    //console.log(order);
    if (order !== 0) {
      return order;
    }
   console.log("err"); 
    return a[1] - b[1];
  });

  stabilizedThis.map((cl)=>{
    cl[0].date= new Date(cl[0].date).toUTCString();
    console.log(cl);
  })
  
  return stabilizedThis.map((el) => el[0]);
}

//Date  Sort..

const dateSort = ()=>{

  rows.date.map((cl)=>{
    
     const n = new Date(cl.date);
     arr.push(n);
    // console.log(arr)
    })
    
    arr.sort(function(a, b){
        return a - b 
    });
    
    arr.map((cl)=>{
    const nn = cl.toLocaleDateString('en-GB')
    narr.push(nn)
    })
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Customer Name',
  },
  {
    id: 'mobileNumber',
    numeric: true,
    disablePadding: false,
    label: 'Mobile Number',
  },
  {
    id: 'dueAmount',
    numeric: true,
    disablePadding: false,
    label: 'Due Amount',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    console.log("touch");
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className=''>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className="text-lg text-white"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={headCell.id==="mobileNumber"?null:headCell.id==="address"?null:createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          className="text-[#52ffd4]"
        >
          Due's
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('mobileNumber');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const url="https://billbil-api.herokuapp.com/app/v1/bills/due"
  const [rowdata,setRowData] = React.useState([]);
  
  React.useEffect(()=>{
    async function fetchData(){
        const request = await axios.get(url);
        console.log(request.data);
        setRowData(request.data);
        return request;
    }

    fetchData();
}, [url]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowdata.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '1500px', height:"100%" }} className="">
      <Paper sx={{ width: '100%', mb: 2 }} className="bg-[#666b8c] p-2">
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowdata.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rowdata, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      className=""
                    >
                      <TableCell className='text-[14px] text-white'>
                        {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        /> */}
                        {(index + 1)+page*rowsPerPage}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className='text-[#b2fc31] text-base'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right" className='text-[14px] text-[#ff8340]'>{row.number}</TableCell>
                      <TableCell align="right" className='text-[14px] text-[#ff8340]'>{(row.total-((row.paidAmount==null)?0:row.paidAmount)).toFixed(2)}</TableCell>
                      <TableCell align="right" className='text-[14px] text-[#ff8340]'>{row.date}</TableCell>
                      <TableCell align="right" className='text-[14px] text-[#ff8340]'>{row.address}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={10}
          component="div"
          count={rowdata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
