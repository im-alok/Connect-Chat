import { createSlice } from '@reduxjs/toolkit'

const initialState={
    user:localStorage.getItem('user') ?JSON.parse(localStorage.getItem('user')):null,
    profileLoading:false,
}

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload
        },
        setProfileLoading(state,value){
            state.profileLoading = value.payload
        }
    }
});

export const {setUser,setProfileLoading} = profileSlice.actions;
export default profileSlice.reducer;