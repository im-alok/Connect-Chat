import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showCreateGroupField :false,
    conversationLoading:false,
    socketConnected:false,
    notificationDetails:[]

}

const conversationSlice = createSlice({
    name:"conversation",
    initialState:initialState,
    reducers:{
        setShowCreateGroupField(state,value){
            state.showCreateGroupField = value.payload
        },
        setConversationLoading(state,value){
            state.conversationLoading = value.payload
        },
        setSocketConnected(state,value){
            state.socketConnected = value.payload
        },
        setNotificationDetails(state,value){
            state.notificationDetails.push(value.payload)
        }
    }
})

export const {setShowCreateGroupField,setConversationLoading,setSocketConnected,setNotificationDetails} = conversationSlice.actions;
export default conversationSlice.reducer;