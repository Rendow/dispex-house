import { housingStockAPI} from "../dal/api";


const POST_CLIENT_DATA = 'POST_CLIENT_DATA'
const SET_LOADING = 'SET_LOADING'
const SET_STATUS = 'SET_STATUS'
const SET_FLAT_CLIENTS = 'SET_FLAT_CLIENTS'
const DELETE_FLAT_CLIENTS = 'DELETE_FLAT_CLIENTS'

const initialState = {
    clientID:null,
    isLoading:false,
    status:'idle',
    flatClients:[
        {
            Id: 0,
            Name: 'Иван',
            Phone: "+7 932 324 12",
            Email: "test@mail.com",
            BindId: 0
        },
        {
            Id: 2,
            Name: 'Борис',
            Phone: "+7 932 324 12",
            Email: "test@mail.com",
            BindId: 3
        },
        {
            Id: 4,
            Name: 'Борис',
            Phone: "+7 932 324 12",
            Email: "test@mail.com",
            BindId: 3
        },
        {
            Id: 5,
            Name: 'Илья',
            Phone: "+7 922 789 78",
            Email: "test@mail.com",
            BindId: 3
        },
    ],
}

export const housesReducer = (state = initialState, action) => {

    switch (action.type) {

        case POST_CLIENT_DATA:
            return {
                ...state,
                clientID: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case SET_FLAT_CLIENTS:
            return {
                ...state,
                flatClients: action.payload
            }

        default:
            return state
    }
}

//actions
export const setClientIDAC = (data) => ({
    type: POST_CLIENT_DATA,
    payload: data
})
export const setLoadingAC = (data) => ({
    type: SET_LOADING,
    payload: data
})
export const setStatusAC = (data) => ({
    type: SET_STATUS,
    payload: data
})
export const setFlatClientsAC = (data) => ({
    type: SET_FLAT_CLIENTS,
    payload: data
})
export const deleteFlatClientsAC = () => ({
    type: DELETE_FLAT_CLIENTS
})

//thunk
export const postClientDataTC = (data) => async (dispatch, getState) => {
    let address = getState().address.currentAddressID

    dispatch(setLoadingAC(true))
    dispatch(setStatusAC('loading'))
    try {
        let response = await housingStockAPI.postClientData(data)
        if(response.data.result === 'Ok'){
            dispatch(setClientIDAC(response.data.id))
            housingStockAPI.bindClient({address, clientID: response.data.id})
        }
        dispatch(setStatusAC('success'))
    } catch (e) {
        console.log(e)
    }
    finally {
        dispatch(setLoadingAC(false))
    }
}

export const putClientDataTC = () => async (getState) => {
    let address = getState().address.currentAddressID
    let clientID = getState().houses.clientID
    try {
         housingStockAPI.bindClient({address, clientID})
    } catch (e) {
        console.log(e)
    }
}
export const getFlatClientsTC = () => async (dispatch,getState) => {
    let address = getState().address.currentAddressID
    try {
       let response = await housingStockAPI.getFlatClients(address)
        dispatch(setFlatClientsAC(response.data))
    } catch (e) {
        console.log(e)
    }
}
export const deleteFlatClientsTC = () => async (dispatch,getState) => {
    let clientID = getState().houses.clientID
    try {
         await housingStockAPI.deleteClient(clientID)
        dispatch(deleteFlatClientsAC())
    } catch (e) {
        console.log(e)
    }
}