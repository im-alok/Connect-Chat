import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem('token') ?JSON.parse(localStorage.getItem('token')):null,
    loading:false,
    signUpFormData:null,
    render:false,
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
        setRender:(state)=>{
            state.render = !state.render
        }
    }
})

export const {setToken,setSignUpFormData,setLoading,setRender} = authSlice.actions;
export default authSlice.reducer;