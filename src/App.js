import './App.css';
import {
    AppBar,
    Autocomplete,
    Button,
    CircularProgress,
    IconButton,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getHousesFlatTC,
    getHousesTC,
    getStreetsTC,
    setHousesAC,
    setHousesFlatsAC,
    setStreetsAC
} from "./bll/app-reducer";

function App() {
    return (
        <div className="App">
            <Stack className={'stackApp'} alignItems={"center"} spacing={21}>
                <Header/>
                <Address/>
            </Stack>
        </div>
    );
}
export default App;

function Header(){
  return(
      <AppBar position="static">
      <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" >
          </IconButton>
          <Typography variant="h6" color="inherit">
              House
          </Typography>
      </Toolbar>
  </AppBar>)
}

function Address (){

    const  streets = useSelector((state) => state.app.streets)
    const  houses = useSelector((state) => state.app.houses)
    const  houseFlat = useSelector((state) => state.app.houseFlat)
    const dispatch = useDispatch()



    const [streetTerm, setStreetTerm] = useState(null)
    const [houseTerm, setHouseTerm] = useState(null)
    const [flatTerm, setFlatTerm] = useState(null)


  const onClickHandler = () => {
      setStreetTerm('')
      setHouseTerm('')
      setFlatTerm('')
      dispatch(setHousesAC([]))
      dispatch(setHousesFlatsAC([]))
      dispatch(setStreetsAC([]))
    }

    return (

            <Stack direction="row" spacing={2}>
                <Streets streetTerm={streetTerm} setSearchTerm={setStreetTerm} dispatch={dispatch} streets={streets}/>
                <Houses houseTerm={houseTerm} streetID={streetTerm} setSearchTerm={setHouseTerm} dispatch={dispatch}
                        houses={houses}/>
                <HousesFlat flatTerm={flatTerm} houseID={houseTerm} setSearchTerm={setFlatTerm}  houseFlat={houseFlat}
                            dispatch={dispatch} />
                <Button onClick={onClickHandler}> clear</Button>
            </Stack>
)}

function Streets({setSearchTerm,streets,streetTerm, dispatch}) {

    const [open, setOpen] = useState(false);
    const loading =  open && streets.length === 0;

    useEffect(() => {
        loading && dispatch(getStreetsTC())
    }, [loading]);

    return (

            <Autocomplete
            id="streets"
            sx={{width: 300}}
            open={open}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}

            onChange={(event, value) => value && setSearchTerm(value)}


            options={streets}
            loading={loading}

            getOptionLabel={(option) => {
              //  console.log(option,'option.name')
               return  option && option.name
            }}
            isOptionEqualToValue={(option, value) => {
                // console.log(option.name,'option.name')
                // console.log(value.name,'value.name')
               return  option.name === value.name
            }}

            // value={streetTerm && streetTerm.name}
                // inputValue={streetTerm && streetTerm.name}
            renderOption={(props, option) => {
                return (
                    <li  {...props} key={option.id}>
                        {option.name}
                    </li>
                );
            }}
            renderInput={(params) => (

                <TextField
                    {...params}
                    label="Улица"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />

    );
}

function Houses({setSearchTerm,streetID,houses,houseTerm, dispatch}) {

    const [open, setOpen] = useState(false);

    const loading =  open && houses.length === 0;

    useEffect(() => {
        streetID &&  dispatch(getHousesTC(streetID.id))
    }, [streetID]);


    return (

        <Autocomplete
            id="houses"
            sx={{width: 300}}
            open={open}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}

            onChange={(event, value) => value && setSearchTerm(value) }

            options={houses}
            loading={loading}

            getOptionLabel={(option) => {
               // console.log(option,'option.name')
                return  option && option.name
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
        //    value={houseTerm && houseTerm.name}

            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                );
            }}
            renderInput={(params) => (

                <TextField
                    {...params}
                    label="Дом"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />

    );
}

function HousesFlat({flatTerm, setSearchTerm,houseID,houseFlat, dispatch}) {

    const [open, setOpen] = useState(false);

    const loading = open && houseFlat.length === 0;

    useEffect(() => {
        houseID &&  dispatch(getHousesFlatTC(houseID.id))
    }, [houseID]);


    function onChangeHandler(event, value) {
         value && setSearchTerm(value)

    }

    return (
        <Autocomplete
            id="houses_flat"
            sx={{width: 300}}
            open={open}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}

            onChange={onChangeHandler }

         // onInputChange={onInputChange}
         // value={flatTerm && flatTerm.name}
         //  inputValue={value.name}
           //  searchText={value}
           //  onUpdateInput={onInputChange}

            options={houseFlat}
            loading={loading}

         getOptionLabel={(option) => option && option.name}
          isOptionEqualToValue={(option, value) => {
              console.log(option,'option.name')
              console.log(value,'value')
            return   option && option === value
          }}

            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                );
            }}
            renderInput={(params) => (

                <TextField
                    {...params}
                    label="Кв./офис"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}/>
    );


}



// <Autocomplete
//     {...defaultProps}
//     id="controlled-demo"
//     value={value}
//     onChange={(event: any, newValue: FilmOptionType | null) => {
//         setValue(newValue);
//     }}
//     renderInput={(params) => (
//         <TextField {...params} label="controlled" variant="standard" />
//     )}
// />