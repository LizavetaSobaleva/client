import { applyMiddleware, combineReducers } from "redux";
import { configureStore} from "@reduxjs/toolkit"
import { thunk } from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import uploadReducer from "./uploadReducer";
import appReducer from "./appReducer";
import { composeWithDevTools } from '@redux-devtools/extension';


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    app: appReducer
})

export const store = configureStore({reducer: rootReducer, devTools: composeWithDevTools(applyMiddleware(thunk))})