import {useState} from "react";
import {Box, Button, Modal, Typography} from "@mui/material";
import Form from "../form/Form";

export function BasicModal({currentAddress, title}) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button  variant={"contained"}  onClick={handleOpen}>{title}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box  sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Добавить жильца
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {currentAddress}
                    </Typography>
                    <Form handleClose={handleClose}/>

                </Box>
            </Modal>
        </div>
    );
}
