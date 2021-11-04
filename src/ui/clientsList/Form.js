import React, {useState} from 'react';
// @ts-ignore
import s from './Form.module.css';
import {Button, FormControl, TextField} from "@mui/material";
import {useFormik} from "formik";


function Form({handleClose}) {
    const [disableBtn, setDisableBtn] = useState(false)


    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            phone: '',
        },
        onSubmit: (values,formikHelpers) => {

            //setDisableBtn(true)
            console.log(values )
            formikHelpers.resetForm()
        },
        validate: (values) => {
            const errors= {}
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
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
                    </div>
                    <TextField color={"secondary"}   required placeholder='Телефон' name='phone'  {...formik.getFieldProps('phone')}/>
                    {formik.touched.phone && formik.errors.phone ? <div style={{color: 'red'}}>{formik.errors.phone}</div> : null}

                </div>
                <hr style={{width: '100%'}}/>
                <div style={{display:'flex', justifyContent:'flex-end', marginRop:'40px'}}>

                    <Button onClick={handleClose}> Отмена </Button>
                    <Button disabled={disableBtn} type={'submit'} > Добавить </Button>
                </div>
            </FormControl>
        </form>
    );
}


export default Form;