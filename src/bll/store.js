import {applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";

const {createStore, combineReducers} = require("redux");


const rootReducer = combineReducers({
    app: appReducer,
})

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

 window.store = store

