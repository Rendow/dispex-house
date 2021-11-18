import {useDispatch, useSelector} from "react-redux";
import {BasicModal} from "./modal/Modal";
import {Button, IconButton, Paper, Stack} from "@mui/material";
import React, {useState} from "react";
import {SnackBar} from "../common/SnackBar";
import {deleteFlatClientsTC, getFlatClientsTC} from "../../bll/houses-reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import s from './ClientsList.module.css';
import {Delete} from "@mui/icons-material";


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

    const getFlatClient  = () => {dispatch(getFlatClientsTC())}

    return (
        <Stack  direction="column" spacing={4}>
            <SnackBar />
            <Stack  direction="row" justifyContent={"space-between"} spacing={15}>
            <div style={{padding:'10px'}} >
                {currentAddress &&
                <>
                    <span> Адрес: </span>
                    <span style={{marginLeft: '10px'}}>{mappedAddress}</span>
                </>}
            </div>
                 <Stack direction="row"  spacing={2}>
                    <Button onClick={getFlatClient}> Загрузить данные</Button>
                    <BasicModal  displayDelButton={'none'} formButtonTitle={'Добавить'} title={'Добавить жильца'} currentAddress={mappedAddress}/>
                </Stack>
        </Stack>

            <Stack direction="row"  spacing={2}>
                <div className={s.clientsList}>
                    { flatClients && flatClients.map(el => {
                    return  <Client currentAddress={mappedAddress} key={el.id} id={el.id} name={el.name}  email={el.email} phone={el.phone} bindId={el.bindId}/>
                })}
                </div>

            </Stack>
        </Stack>
    )
}
export  default ClientsList

function Client({name, phone,email,id,currentAddress, bindId}) {
    const [open, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    let cheсkedName = name.length > 0 ? name : 'Имя не указано'
    let cheсkedEmail = email.length > 0 ? name : 'Email не указан'

    const deleteClientData = () => {
        dispatch(deleteFlatClientsTC(id))
    }
    const editClientData = () => {
        setIsOpen(!open)
        console.log(open)
    }
    return (
            <Paper style={{margin: '10px 0 0 20px'}} elevation={5}>
                <BasicModal
                    bindId={bindId}
                    name={name}
                    email={email}
                    phone={phone}
                    id={id}
                    setIsOpen={setIsOpen}
                    isOpen={open}
                    currentAddress={currentAddress}
                    disabled={true}
                    display={'none'}
                    formButtonTitle={'Редактировать'}
                />
            <Stack style={{padding: '20px'}} direction="column" justifyContent={"space-between"} spacing={2}>
                <span>Имя: <span style={{fontStyle: email.length > 0 ? '' : 'Italic'}}>{cheсkedName} </span></span>
                <span>Телефон: {phone}</span>
                <span>E-mail: <span style={{fontStyle: name.length > 0 ? '' : 'Italic'}}>{cheсkedEmail} </span></span>
            </Stack>
            <Stack style={{backgroundColor:'rgb(231 231 231)',padding: '20px'}} direction="row" justifyContent={"space-between"} spacing={2}>
                <IconButton onClick={deleteClientData}>
                    <Delete />
                </IconButton>
                <IconButton  onClick={editClientData}>
                    <EditIcon/>
                </IconButton>
            </Stack>
        </Paper>
    )
}
