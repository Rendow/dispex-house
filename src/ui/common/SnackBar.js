import {Alert, Snackbar} from "@mui/material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setStatusAC} from "../../bll/houses-reducer";



export function SnackBar (){
    const  status = useSelector((state) => state.houses.status)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            dispatch(setStatusAC('idle'))
        }
        dispatch(setStatusAC('idle'))
    }
  return (
      <Snackbar anchorOrigin={{  vertical: 'top', horizontal: 'center' }}
                open={status === 'success'}  onClose={handleClose} autoHideDuration={2000} >
          <Alert   elevation={6} variant="filled" onClose={handleClose}  severity="success">
              {'Данные успешно отправлены.'}
          </Alert>
      </Snackbar>
  )
}