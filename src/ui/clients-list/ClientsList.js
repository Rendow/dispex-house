import {useDispatch, useSelector} from "react-redux";
import {BasicModal} from "./modal/Modal";
import {Button, Paper, Stack} from "@mui/material";
import React from "react";
import {SnackBar} from "../common/SnackBar";
import {getFlatClientsTC} from "../../bll/houses-reducer";
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

    const getFlatClient  = () => {dispatch(getFlatClientsTC())}

    return (
        <Stack  direction="column" spacing={4}>
            <SnackBar />
            <Stack  direction="row" justifyContent={"space-between"} spacing={15}>
            <div style={{paddingTop:'10px'}} >
                {currentAddress &&
                <>
                    <span> Адрес: </span>
                    <span style={{marginLeft: '10px'}}>{mappedAddress}</span>
                </>}
            </div>
                 <Stack direction="row"  spacing={2}>
                    <Button onClick={getFlatClient}> Загрузить данные</Button>
                    <BasicModal title={'Добавить жильца'} currentAddress={mappedAddress}/>
                </Stack>
        </Stack>

            <Stack direction="row"  spacing={2}>
                { flatClients && flatClients.map(el => {
                  return  <Client key={el.Id} name={el.Name}  email={el.Email} phone={el.Phone}/>
                })}
            </Stack>
        </Stack>
    )
}
export  default ClientsList

function Client({name, phone,email}) {
    return (
            <Paper  elevation={5}>
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
