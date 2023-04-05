import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
  };

  
export default function ConfirmModal({open, setOpen, children, performerDelete, estimateId}) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <>
           
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='rounded-lg bg-white'sx={style}>
                    {children}
                    <Button onClick={(e) => setOpen(false)}>Cancelar</Button>
                    <Button onClick={(e) => {performerDelete(estimateId); setOpen(false)}}>Deletar</Button>
                </Box>
            </Modal>
        </>
    )

}