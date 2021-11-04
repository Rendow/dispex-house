import {addressAPI} from "../dal/api";

const SET_HOUSES = 'SET_HOUSES';
const SET_STREETS = 'SET_STREETS'
const SET_HOUSE_FLAT = 'SET_HOUSE_FLAT'

const initialState = {
    houses: [],
    streets: [],
    houseFlat:[],
}

export const appReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_HOUSES:
            return {
                ...state,
                houses: action.payload
            }
        case SET_STREETS:
            return {
                ...state,
                streets: action.payload
            }
            case SET_HOUSE_FLAT:
            return {
                ...state,
                houseFlat: action.payload
            }
        default:
            return state
    }
}

//actions

export const setStreetsAC = (streets) => ({
    type: SET_STREETS,
    payload: streets
})
export const setHousesAC = (houses) => ({
    type: SET_HOUSES,
    payload: houses
})
export const setHousesFlatsAC = (houseFlat) => ({
    type: SET_HOUSE_FLAT,
    payload: houseFlat
})

//thunk

export const getStreetsTC = () => async (dispatch) => {
    try {
        let response = await addressAPI.getStreets()
        dispatch(setStreetsAC(response.data))
    } catch (e) {
        console.log(e)
    }
}

export const getHousesTC = (id) => async (dispatch) => {
    try {
        let response = await addressAPI.getHouses(id)
        dispatch(setHousesAC(response.data))
    } catch (e) {
        console.log(e)
    }
}
export const getHousesFlatTC = (id) => async (dispatch) => {
    try {
        let response = await addressAPI.getHousesFlats(id)
        dispatch(setHousesFlatsAC(response.data))
    } catch (e) {
        console.log(e)
    }
}