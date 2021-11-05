import {applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import {addressReducer} from "./address-reducer";
import {housesReducer} from "./houses-reducer";

const {createStore, combineReducers} = require("redux");


const rootReducer = combineReducers({
    address: addressReducer,
    houses:housesReducer,
})

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

 window.store = store

