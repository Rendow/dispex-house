import React from 'react';
import s from './Form.module.css';
import {Button, CircularProgress, FormControl, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getFlatClientsTC, postClientDataTC} from "../../../bll/houses-reducer";


function Form({handleClose,formButtonTitle,id,name, phone,email,bindId}) {
    const dispatch = useDispatch()
    const  isLoading = useSelector((state) => state.houses.isLoading)
    const  address = useSelector((state) => state.address.currentAddressID)

    const generateId = (min = 1000, max = 9999) => {
   return Math.floor(Math.random() * (max - min) + min); }

    const formik = useFormik({
        initialValues: {
            email: email ? email : '',
            name: name ? name : '',
            phone: phone ? phone : '',
        },
        onSubmit: (values,formikHelpers) => {
            dispatch(postClientDataTC({id: id ? id : generateId(),name:values.name,phone:values.phone,email:values.email,address: bindId ? bindId : address}))
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
                    <Button variant={"contained"} disabled={isLoading} type={'submit'} > {formButtonTitle} </Button>
                    {isLoading ? <CircularProgress style={{margin:'5px 0 0 5px'}} color="inherit" size={20}/> : null}
                </div>
            </FormControl>
        </form>
    );
}


export default Form;