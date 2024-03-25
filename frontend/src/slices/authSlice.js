import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem('token') ?JSON.parse(localStorage.getItem('token')):null,
    loading:false,
    signUpFormData:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload
        },
        setSignUpFormData(state,value){
            state.signUpFormData = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        },
    }
})

export const {setToken,setSignUpFormData,setLoading} = authSlice.actions;
export default authSlice.reducer;