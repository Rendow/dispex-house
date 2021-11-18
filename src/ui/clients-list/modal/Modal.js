import React, {useEffect, useState} from "react";
import {Box, Button, Modal, Stack, Typography} from "@mui/material";
import Form from "../form/Form";
import {deleteFlatClientsTC} from "../../../bll/houses-reducer";
import {useDispatch} from "react-redux";

export function BasicModal({currentAddress, title,disabled = false,isOpen=false,
                               display,setIsOpen,id,name, phone,email,bindId,formButtonTitle,displayDelButton = 'block'
}) {

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

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
    const [open, setOpen] = useState(isOpen);
    console.log(open,'modal')
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        if(setIsOpen) setIsOpen(false);
    };
    const dispatch = useDispatch()

    const deleteData = () => {
        dispatch(deleteFlatClientsTC(id))
        handleClose()
    }
    return (
        <div>
            <Button style={{display:display}} disabled={disabled}  variant={"contained"}  onClick={handleOpen}>{title}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box  sx={style}>
                    <Stack direction="row" justifyContent={"space-between"} spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Добавить жильца
                    </Typography>
                        <div>
                            <Button style={{display:displayDelButton}} onClick={deleteData}>Удалить</Button>
                        </div>
                    </Stack>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {currentAddress}
                    </Typography>
                    <Form
                        bindId={bindId}
                        name={name}
                        email={email}
                        phone={phone}
                        id={id}
                        formButtonTitle={formButtonTitle}
                        handleClose={handleClose}/>

                </Box>
            </Modal>
        </div>
    );
}
