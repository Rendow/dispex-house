import React from 'react';
import s from './Form.module.css';
import {Alert, Button, CircularProgress, FormControl, Snackbar, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {postClientDataTC} from "../../../bll/houses-reducer";


function Form({handleClose}) {
    const dispatch = useDispatch()
    const  isLoading = useSelector((state) => state.houses.isLoading)


    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            phone: '',
        },
        onSubmit: (values,formikHelpers) => {

            dispatch(postClientDataTC(values))

        },
        validate: (values) => {
            const errors= {}
            if (!values.phone) {
                errors.phone = 'Required'
            }
            return errors
        },
    })

    return (
        <form className={s.formWrap} onSubmit={formik.handleSubmit}>

            <FormControl>
                <div className={s.form}>
                    <div>
                        <TextField style={{width:'50%'}}  placeholder='Ф.И.О.' name='name'  {...formik.getFieldProps('name')}/>
                        <TextField  style={{width:'50%'}} placeholder='e-mail' name='email'  {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}

                    </div>
                    <TextField color={"secondary"}   required placeholder='Телефон' name='phone'  {...formik.getFieldProps('phone')}/>
                    {formik.touched.phone && formik.errors.phone ? <div style={{color: 'red'}}>{formik.errors.phone}</div> : null}

                </div>
                <hr style={{width: '100%'}}/>
                <div style={{display:'flex', justifyContent:'flex-end', marginRop:'40px'}}>

                    <Button style={{marginRight:'5px'}} onClick={handleClose}> Отмена </Button>
                    <Button variant={"contained"} disabled={isLoading} type={'submit'} > Добавить </Button>
                    {isLoading ? <CircularProgress style={{margin:'5px 0 0 5px'}} color="inherit" size={20}/> : null}
                </div>
            </FormControl>
        </form>
    );
}


export default Form;