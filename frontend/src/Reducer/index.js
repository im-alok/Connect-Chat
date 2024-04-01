import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import conversationReducer from '../slices/conversationSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    conversation:conversationReducer
})

export default rootReducer;