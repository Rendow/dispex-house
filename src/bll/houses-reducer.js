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
            id: 0,
            name: 'Иван',
            phone: "+7 932 324 12",
            email: "test@mail.com",
            bindId: 0
        },
        {
            id: 2,
            name: 'Борис',
            phone: "+7 932 324 12",
            email: "test@mail.com",
            bindId: 3
        },
        {
            id: 4,
            name: 'Борис',
            phone: "+7 932 324 12",
            email: "test@mail.com",
            bindId: 3
        },
        {
            id: 5,
            name: 'Илья',
            phone: "+7 922 789 78",
            email: "test@mail.com",
            bindId: 3
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
        case DELETE_FLAT_CLIENTS:
            return {
                ...state,
                flatClients: state.flatClients.filter(client => client.id !== action.payload)
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
export const deleteFlatClientsAC = (id) => ({
    type: DELETE_FLAT_CLIENTS,
    payload: id
})

//thunk
export const postClientDataTC = (data) => async (dispatch, getState) => {

    dispatch(setLoadingAC(true))
    dispatch(setStatusAC('loading'))
    try {
        let response = await housingStockAPI.postClientData_(data.id,data.name,data.phone, data.email,data.address)
        if(response.data.result === 'Ok'){
            dispatch(setClientIDAC(data.id))
            await housingStockAPI.bindClient({AddressId: data.address, ClientId: data.id})
            dispatch(getFlatClientsTC())
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
    let AddressId = getState().address.currentAddressID
    let ClientId = getState().houses.clientID
    try {
         housingStockAPI.bindClient({AddressId,ClientId})
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
export const deleteFlatClientsTC = (id) => async (dispatch) => {

    try {
         await housingStockAPI.deleteClient(id)
        dispatch(deleteFlatClientsAC(id))
    } catch (e) {
        console.log(e)
    }
}