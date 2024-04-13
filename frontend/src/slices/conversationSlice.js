import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showCreateGroupField :false,
    conversationLoading:false,
    socketConnected:false,
    notificationDetails:[],
    showChat:true,

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
        },
        setShowChat(state,value){
            state.showChat = value.payload
        }
    }
})

export const {setShowCreateGroupField,setConversationLoading,setSocketConnected,setNotificationDetails,setShowChat} = conversationSlice.actions;
export default conversationSlice.reducer;