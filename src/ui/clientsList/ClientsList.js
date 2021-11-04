import {useSelector} from "react-redux";
import {useState} from "react";
import {Box, Button, Modal, Typography} from "@mui/material";
import Form from "./Form";


function ClientsList (){
    const  currentAddress = useSelector((state) => state.app.currentAddress)

    return (
        <div>
            {currentAddress &&  currentAddress.map((el,index) => {
              if(currentAddress[currentAddress.length -1] === el) {
                  return <span key={index}> {el} </span>
              }
                return <span key={index}> {el} ,</span>
            })}
            <BasicModal/>
        </div>
    )
}
export  default ClientsList



export function BasicModal() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <Form handleClose={handleClose}/>


                </Box>
            </Modal>
        </div>
    );
}
