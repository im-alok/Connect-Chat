import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import conversationReducer from '../slices/conversationSlice'
import profileReducer from '../slices/profileSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    conversation:conversationReducer
})

export default rootReducer;