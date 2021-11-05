import React, {useState} from "react";
import {Box, Button, Modal, Stack, Typography} from "@mui/material";
import Form from "../form/Form";
import {deleteFlatClientsTC, getFlatClientsTC, postClientDataTC} from "../../../bll/houses-reducer";
import {useDispatch} from "react-redux";

export function BasicModal({currentAddress, title,disabled = false}) {

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
    const dispatch = useDispatch()

    const postClientData = () => {
        dispatch(postClientDataTC())
    }
    const deleteData = () => {
        dispatch(deleteFlatClientsTC())
    }
    return (
        <div>
            <Button disabled={disabled}  variant={"contained"}  onClick={handleOpen}>{title}</Button>
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
                            <Button
                            onClick={deleteData}
                        >Удалить</Button>
                            <Button
                                disabled={true}
                                onClick={postClientData}
                            >Редактировать</Button>
                        </div>
                    </Stack>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {currentAddress}
                    </Typography>
                    <Form  handleClose={handleClose}/>

                </Box>
            </Modal>
        </div>
    );
}
