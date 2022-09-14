import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup(props) {
    const { children, openPopup, setOpenPopup} = props ;
  return (
    <Dialog
    fullScreen open={openPopup}
    TransitionComponent={Transition}
    >
    
      
        <DialogC>
          
          {children}
          {/* <button className="btn" onClick={()=>{setOpenPopup(false)}}>CANCEL</button> */}
          
        </DialogC>
        
    </Dialog>
   
  )
}

export default Popup;


const DialogC=styled(DialogContent)`


.btn{
  background-color: white;
  border: 1px solid #2ca4d8;
  font-size: 16px;
  color: #2ca4d8;
  border-radius: 10px;
  padding: 11px;
  position: absolute;
  left:280px;
  bottom: 45px;
  //cursor: pointer;
}

`



