
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Modal, Fab} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
    <Fab style={{ backgroundColor:"grey", color:"black", width:500, height:75, borderRadius:5}} onClick={handleOpen}>View "Usernames" post</Fab>
<Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
>
    <Box sx={style}>
        {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
      <Box
            component="form"
         sx={{
              '& > :not(style)': { m: 1, width: '45ch', height: '10ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                "Username" posted:
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                STUFF THEY TYPED HERE
            </Typography>
            <Button>View Replies!</Button>
            <Button>Reply!</Button>
            <Button onClick={handleClose}>Exit!</Button>
        </Box>
    </Box>
</Modal>
</div>
  );
}
