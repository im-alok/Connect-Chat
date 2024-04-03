import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showCreateGroupField :false,
}

const conversationSlice = createSlice({
    name:"conversation",
    initialState:initialState,
    reducers:{
        setShowCreateGroupField(state,value){
            state.showCreateGroupField = value.payload
        },
    }
})

export const {setShowCreateGroupField,setMessageDetails} = conversationSlice.actions;
export default conversationSlice.reducer;