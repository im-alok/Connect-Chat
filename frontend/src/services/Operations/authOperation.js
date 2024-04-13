import { apiConnector } from "../apiConnector";
import {Auth} from "../apis";
import {toast} from 'react-hot-toast';
import {setLoading, setSignUpFormData, setToken} from '../../slices/authSlice'
import { setUser } from "../../slices/profileSlice";

export function sendOTP(email,username,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST',Auth.sendOtp,{
                email:email,
                username:username
            });
            
            if(!response.data.success)
                throw new Error(response?.data?.message);
            navigate('/verify-email');
            toast.success('Kindly Enter OTP');
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function userRegistration({name,username,email,password},otpValue,navigate){
    return async (dispatch) =>{
        dispatch(setLoading(true))
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST',Auth.signup,{
                name:name,
                email:email,
                username:username,
                password:password,
                otpValue:otpValue
            });

            if(!response?.data?.success)
                throw new Error(response?.data?.message);

            toast.success('User registered successfully, Kindly Login again');
            dispatch(setSignUpFormData(null));
            navigate('/login');

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function userLogin({username,password},navigate){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        
        try {
            const response = await apiConnector('POST',Auth.login,{
                username:username,
                password:password
            });
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            if(response.data){
                dispatch(setToken(response?.data?.token));
                dispatch(setUser(response.data.userDetails));
                localStorage.setItem("token", JSON.stringify(response?.data?.token));
                localStorage.setItem("user", JSON.stringify(response?.data?.userDetails));
                navigate('/dashboard'); 
                toast.success(response?.data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));

    }
}

export function sendForgotPasswordToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector("POST",Auth.forgetPasswordToken,{
                email:email
            })
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setEmailSent(true);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword({password,confirmPassword},token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            
            const response = await apiConnector("PUT",Auth.resetPassword,{
                newPassword:password,
                confirmNewPassword:confirmPassword,
                token:token
            })
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            navigate('/login');

        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }

}