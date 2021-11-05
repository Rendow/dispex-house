import {useDispatch, useSelector} from "react-redux";
import {BasicModal} from "./modal/Modal";
import {Alert, Button, Paper, Snackbar, Stack} from "@mui/material";
import React from "react";
import {SnackBar} from "../common/SnackBar";
import {deleteFlatClientsTC, getFlatClientsTC} from "../../bll/houses-reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function ClientsList (){
    const  currentAddress = useSelector((state) => state.address.currentAddress)
    const  flatClients = useSelector((state) => state.houses.flatClients)
    const dispatch = useDispatch()

    let mappedAddress = currentAddress &&  currentAddress.map((el,index) => {
        if(currentAddress[currentAddress.length -1] === el) {
            return <span key={index}> {el} </span>
        }
        return <span key={index}> {el} ,</span>
    })

    const onClickHandler = () => {
        dispatch(getFlatClientsTC())
    }
    return (
        <Stack  direction="column" spacing={4}>

            <SnackBar />
            <div style={{textAlign:'center'}}>
                {currentAddress && mappedAddress}
            </div>
            <Stack direction="row" justifyContent={"space-between"} spacing={2}>

                <Button onClick={onClickHandler}> Загрузить данные</Button>
                <Button onClick={() => {dispatch(deleteFlatClientsTC())}}> Удалить данные</Button>
                <BasicModal title={'Редактировать данные'} currentAddress={mappedAddress}/>
                <BasicModal title={'Добавить жильца'} currentAddress={mappedAddress}/>
        </Stack>

            <Stack direction="row"  spacing={2}>
                { flatClients && flatClients.map(el => {
                  return  <Client key ={el.Id} name={el.Name}  email={el.Email} phone={el.Phone}/>
                })}
            </Stack>
        </Stack>
    )
}
export  default ClientsList

function Client({name, phone,email,key}) {
    return (
            <Paper key={key} elevation={5}>
            <Stack style={{padding: '20px'}} direction="column" justifyContent={"space-between"} spacing={2}>
                <span>Имя: {name}</span>
                <span>Телефон: {phone}</span>
                <span>E-mail: {email} </span>
            </Stack>
            <Stack style={{backgroundColor:'rgb(231 231 231)',padding: '20px'}} direction="row" justifyContent={"space-between"} spacing={2}>
               <DeleteIcon/> <EditIcon/>
            </Stack>
        </Paper>
    )
}
